var router = require('express').Router();
var db = require('../../../lib/database')();
var authMiddleware = require('../../auth/middlewares/auth');
router.use(authMiddleware.hasAuthadmin);

router.get('/', authMiddleware.hasAuthadmin, (req, res) => {
    db.query('SELECT * FROM categories, users' , (err, results, fields) => {
        return res.render('admin/home/views/home', { categories: results, users: results });
    });
});
router.post('/', (req, res) => {
    var queryString = `INSERT INTO \`posts\` (\`postAuthor\`, \`postCategory\`, \`postTitle\`, \`postContent\`)
    VALUES ("${req.body.postAuthor}", "${req.body.category}", "${req.body.title}", "${req.body.textarea}");`;

    db.query(queryString, (err, results, fields) => {
        if (err) throw err;
        return res.redirect('/admin/post');
    });
});

module.exports= router;