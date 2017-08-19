var express = require('express');
var loginRouter = express.Router();
var logoutRouter = express.Router();
var signUpRouter = express.Router();

var authMiddleware = require('./middlewares/auth');

loginRouter.route('/')
    .get(authMiddleware.noAuthed, (req, res) => {
        res.render('auth/views/login', req.query);
    })
    .post((req, res) => {
        var db = require('../../lib/database')();
        db.query(`SELECT * FROM users WHERE email="${req.body.email}"`, (err, results, fields) => {
            if (err) throw err;
            if (results.length === 0) return res.redirect('/login?incorrect');

            var user = results[0];
            
            if (user.userPassword !== req.body.password) return res.redirect('/login?incorrect');
            
            if(user.userType == "Admin"){
                delete user.userPassword;
                req.session.admin = req.body.email;
                return res.redirect('/admin/post');
            }
            else{                
                delete user.userPassword;
                req.session.user = req.body.email;
                return res.redirect('/user/post');
            }
        });
    });

logoutRouter.get('/', (req, res) => {
    
    req.session.destroy(err => {
        if (err) throw err;
        res.redirect('/login');
    });
});

signUpRouter.get('/', (req, res) => {
    res.render('auth/views/signup')
});
signUpRouter.post('/', (req, res) => {
    var queryString = `INSERT INTO \`users\` (\`userName\`,\`email\`,\`birthDate\`,\`userPassword\` )
    VALUES("${req.body.name}","${req.body.email}","${req.body.date}","${req.body.password}");`;

    db.query(queryString, (err, results, fields) => {
        if (err) throw err;
        return res.redirect('/admin/categories');
});

exports.login = loginRouter;
exports.logout = logoutRouter;
exports.signup = signUpRouter;