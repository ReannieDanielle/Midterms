var router = require('express').Router();
var db = require('../../../lib/database')();
var authMiddleware = require('../../auth/middlewares/auth');
router.use(authMiddleware.hasAuth);

router.get('/', (req, res) => {
    db.query('SELECT categories.categoryName,users.userName,posts.postTitle,posts.postContent,posts.postId FROM posts JOIN categories ON categories.postCategoryId = posts.postCategory JOIN users ON posts.postAuthor = users.userId', (err, results, fields) => {
        return res.render('user/post/views/post', { biyu: results, user : req.session.user });
    });
});


router.get('/:postId/remove', (req, res) => {
    db.query(`DELETE FROM posts WHERE postId=${req.params.postId}`, (err, results, fields) => {
        if (err) throw err;
        res.redirect('/user/post');
    });
});
router.route('/:id')
    .get((req, res) => {
        db.query(`SELECT * FROM posts WHERE postId=${req.params.postId}`, (err, results, fields) => {
            if (err) throw err;
            res.render('user/post/views/updatepost', { category: results[0] });
        });
    })
        
    .post((req, res) => {
            const queryString = `UPDATE posts SET        
            postTitle = "${req.body.title}",
            postContent = "${req.body.textarea}"
            WHERE postId=${req.params.postId};`;
            db.query(queryString, (err, results, fields) => {        
                if (err) throw err;
                res.redirect('/user/post');
            });
        });


module.exports= router;
  