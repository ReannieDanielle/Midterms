var router = require('express').Router();
var db = require('../../../lib/database')();
var authMiddleware = require('../../auth/middlewares/auth');
router.use(authMiddleware.hasAuth);

router.get('/', authMiddleware.hasAuth, (req, res) => {
    db.query('SELECT * FROM categories', (err, results, fields) => {
        return res.render('user/categories/views/index', { categories: results });
    });
});
module.exports = router;
