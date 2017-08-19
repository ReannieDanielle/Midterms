exports.hasAuth = (req, res, next) => {
    if (req.session && req.session.user && Object.keys(req.session.user).length > 0) return next();
    return res.redirect('/login?unauthorized');
}

exports.noAuthed = (req, res, next) => {
    if (req.session && req.session.user && Object.keys(req.session.user).length > 0) return res.redirect('/user/post');
    return next();
}

exports.hasAuthadmin = (req, res, next) => {
    if (req.session && req.session.admin && Object.keys(req.session.admin).length > 0) return next();
    return res.redirect('/login?unauthorized');
}

exports.noAuthedadmin = (req, res, next) => {
    if (req.session && req.session.admin && Object.keys(req.session.admin).length > 0) return res.redirect('/admin/post');
    return next();
}

// exports.noAuthlogout = (req, res, next) => {
//     if (req.session && req.session.user && Object.keys(req.session.user).length > 0) return res.redirect('/log');
//     return next();
// }