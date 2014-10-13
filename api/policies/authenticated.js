module.exports = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else{
        // User is not allowed
        // (default res.forbidden() behavior can be overridden in `config/403.js`)
        req.session.redirect_to = req.originalUrl;
        return res.redirect('/login');
    }
};

