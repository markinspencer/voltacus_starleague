const passport = require('passport');
const BattleNetStrategy = require('passport-bnet').Strategy;
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const userService = require('./user.service');

const { BNET_CLIENT_ID, BNET_CLIENT_SECRET, BNET_REGION } = process.env;

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((obj, done) => done(null, obj));

passport.use(
  new BattleNetStrategy(
    {
      clientID: BNET_CLIENT_ID,
      clientSecret: BNET_CLIENT_SECRET,
      region: BNET_REGION,
      scope: 'sc2profile',
      callbackURL: 'http://localhost:4000/auth/bnet/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      const userInfo = {
        id: profile.id,
        battleTag: profile.battletag,
        provider: profile.provider,
        token: profile.token
      };

      const user = await userService.insertOrUpdateUser(userInfo);

      return done(null, user);
    }
  )
);

const createToken = function(user) {
  return jwt.sign(
    {
      ...user
    },
    'my-secret',
    {
      expiresIn: '24h'
    }
  );
};

const authenticate = expressJwt({
  secret: 'my-secret',
  requestProperty: 'auth',
  getToken: req => {
    if (req.headers['vsl-auth-token']) {
      return req.headers['vsl-auth-token'];
    }
    return null;
  }
});

const signIn = (req, res) => {
  const { user } = req;

  if (!user) {
    res.redirect(`http://localhost:3000/login`);
  }
  const token = createToken(user);
  res.redirect(`http://localhost:3000/login?token=${token}`);
};

module.exports = {
  authenticate,
  signIn,
  bnet: passport.authenticate('bnet'),
  bnetCallback: passport.authenticate('bnet', { session: false }),
  addPassport: app => {
    app.use(passport.initialize());
    app.use(passport.session());
  }
};
