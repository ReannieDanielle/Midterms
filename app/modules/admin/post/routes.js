var router = require('express').Router();
var db = require('../../../lib/database')();
var authMiddleware = require('../../auth/middlewares/auth');
//router.use(authMiddleware.hasAuthadmin);

router.get('/', authMiddleware.hasAuthadmin, (req, res) => {
    db.query('SELECT * FROM posts', (err, results, fields) => {
        return res.render('admin/post/views/post', { posts: results, users : results });
    });
});


router.get('/:postId/remove', (req, res) => {
    db.query(`DELETE FROM posts WHERE postId="${req.params.postId}"`, (err, results, fields) => {
        if (err) throw err;
        res.redirect('/admin/post');
    });
});
router.route('/:id')
    .get((req, res) => {
        db.query(`SELECT * FROM posts WHERE postId="${req.params.postId}"`, (err, results, fields) => {
            if (err) throw err;
            res.render('admin/post/views/updatepost', { category: results[0] });
        });
    })
        
    .post((req, res) => {
            const queryString = `UPDATE posts SET        
            postTitle = "${req.body.title}",
            postContent = "${req.body.textarea}"
            WHERE postId=${req.params.postId};`;
            db.query(queryString, (err, results, fields) => {        
                if (err) throw err;
                res.redirect('/admin/post');
            });
        });


module.exports= router;