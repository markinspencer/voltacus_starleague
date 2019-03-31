const db = require('../persistence');
const User = require('../models/user');

async function get(req, res) {
  const { id } = req.params;
  try {
    const users = id ? await User.findByPk(id) : await User.findAll();
    console.log(users);
    res.send(users);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  get
};
