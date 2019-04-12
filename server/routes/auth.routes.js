const Router = require('express-promise-router');
const { auth } = require('../services');

const router = new Router();

router.get('/bnet', auth.bnet);
router.get('/bnet/callback', auth.bnetCallback, auth.signIn);

module.exports = router;
