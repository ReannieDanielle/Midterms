var router = require('express').Router();
var db = require('../../../lib/database')();
var authMiddleware = require('../../auth/middlewares/auth');
router.use(authMiddleware.hasAuthadmin);

router.get('/', authMiddleware.hasAuthadmin, (req, res) => {
    db.query('SELECT * FROM users', (err, results, fields) => {
        return res.render('admin/users/views/index', { users: results });
    });
});

router.post('/', (req, res) => {
    var queryString = `INSERT INTO \`users\` (\`userName\`, \`email\`, \`birthDate\`, \`userType\`, \`userPassword\`)
    VALUES("${req.body.name}", "${req.body.email}", ${req.body.date}, "User", "${req.body.password}");`;

    db.query(queryString, (err, results, fields) => {
        if (err) throw err;
        if(typeof req.query.signup === 'undefined') return res.redirect('/admin/users');
        else return res.redirect('/login?signUpSuccess');
    });
});

router.get('/new', authMiddleware.hasAuthadmin, (req, res) => {
    res.render('admin/users/views/form');
}); 
router.get('/:userId',(req, res) => {
db.query(`SELECT * FROM users WHERE userId="${req.params.userId}"`, (err, results, fields) => {
        if (err) throw err;
        res.render('admin/users/views/form', { user: results[0] });
    });
});
router.post('/:userId',(req, res) => {
    const queryString = `UPDATE users SET userName = "${req.body.userName}", birthDate = ${req.body.birthDate},email = "${req.body.email}" WHERE userId="${req.params.userId}";`;

db.query(queryString, (err, results, fields) => {
    if (err) throw err;
    res.redirect('/admin/users');
});
});

router.get('/:userId/remove', authMiddleware.hasAuthadmin, (req, res) => {
    db.query(`DELETE FROM users WHERE userId="${req.params.userId}"`, (err, results, fields) => {
        if (err) throw err;
        res.redirect('/admin/users');
    });
});

module.exports = router;