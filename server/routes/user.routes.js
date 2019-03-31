const Router = require('express-promise-router');
const { users } = require('../controllers');

const router = new Router();

router.get('/', users.get);
router.get('/:id', users.get);

module.exports = router;
