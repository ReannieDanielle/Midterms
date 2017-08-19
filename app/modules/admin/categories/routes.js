var router = require('express').Router();
var db = require('../../../lib/database')();
var authMiddleware = require('../../auth/middlewares/auth');
router.use(authMiddleware.hasAuthadmin);

router.get('/',authMiddleware.hasAuthadmin, (req, res) => {
    db.query('SELECT * FROM categories', (err, results, fields) => {
        return res.render('admin/categories/views/index', { categories: results });
    });
});
router.post('/', (req, res) => {
    var queryString = `INSERT INTO \`categories\` (\`categoryName\`)
    VALUES("${req.body.name}");`;

    db.query(queryString, (err, results, fields) => {
        if (err) throw err;
        return res.redirect('/admin/categories');
    });
});
router.get('/new',authMiddleware.hasAuthadmin, (req, res) => {
    res.render('admin/categories/views/category');
});

router.get('/:id', authMiddleware.hasAuthadmin,(req, res) => {
        db.query(`SELECT * FROM categories WHERE postCategoryId="${req.params.id}"`, (err, results, fields) => {
            if (err) throw err;
            res.render('admin/categories/views/category', { category: results[0] });
        });
    })
router.put('/:id',authMiddleware.hasAuthadmin,(req, res) => {
        const queryString = `UPDATE categories SET categoryName = "${req.body.name}" WHERE postCategoryId= "${req.body.id}";`;
        db.query(queryString, (err, results, fields) => {
            if (err) throw err;
            res.redirect('/admin/categories');
        });
    });

module.exports = router;