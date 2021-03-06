const Router = require('express-promise-router');
const { users } = require('../controllers');
const { auth } = require('../services');

const router = new Router();

router.get('/', users.get);
router.get('/:id', auth.authenticate, users.get);

module.exports = router;
