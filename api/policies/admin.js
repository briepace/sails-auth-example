module.exports = function(req, res, next) {
    if (req.user.admin === true) {
        return next();
    }
    else{
        // User is not allowed
        // (default res.forbidden() behavior can be overridden in `config/403.js`)
        res.send(403, {message: 'Not Authorized'});
    }
};

