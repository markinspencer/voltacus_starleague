const User = require('../models/user');

const insertOrUpdateUser = async userInfo => {
  const [user, created] = await User.findOrCreate({
    where: { id: userInfo.id },
    defaults: { ...userInfo }
  });

  if (!created) await user.update(userInfo, { where: { id: userInfo.id } });

  return user.get({ plain: true });
};

module.exports = {
  insertOrUpdateUser
};
