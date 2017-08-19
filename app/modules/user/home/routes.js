var router = require('express').Router();
var db = require('../../../lib/database')();
var authMiddleware = require('../../auth/middlewares/auth');
router.use(authMiddleware.hasAuth);

router.get('/', (req, res) => {
    db.query('SELECT * FROM categories', (err, results, fields) => {
        return res.render('user/home/views/home', { categories: results});
    });
});


router.post('/', (req, res) => {
    var queryString = `INSERT INTO \`posts\` (\`postContent\`, \`postTitle\`, \`postCategory\`, \`postAuthor\`)
    VALUES("${req.body.textarea}", "${req.body.title}",${req.body.category}, ${req.session.user});`;

    db.query(queryString, (err, results, fields) => {
        if (err) throw err;
        return res.redirect('/user/post');
    });
});

module.exports= router;

