var router = require('express').Router();


router.use('/users', require('./users/routes'));
router.use('/categories', require('./categories/routes'));
router.use('/home', require('./home/routes'));
router.use('/post', require('./post/routes'));
exports.admin = router;