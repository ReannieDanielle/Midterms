var router = require('express').Router();



router.use('/categories', require('./categories/routes'));
router.use('/home', require('./home/routes'));
router.use('/post', require('./post/routes'));
router.use('/post/updatepost', require('./post/routes'));
exports.user = router;