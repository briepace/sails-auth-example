var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var LdapStrategy = require('passport-ldapauth').Strategy;
var bcrypt = require('bcrypt');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findOne({id:id}).exec(function(err, user) {
        done(err, user);
    });
});

passport.use(
    new LdapStrategy({
        server: {
            url: "SERVER_URL",
            adminDn: "ADMIN_DN",
            adminPassword: "ADMIN_PASSWORD",
            searchBase: "SEARCH_BASE",
            searchFilter: "SEARCH_FILTER",
        }},
        function(user, done) {
            if(!user) {
                return done(null, false, {message: 'Unknown user'});
            }
            User.findOne({username:user.uid}).exec(function(err,user) {
                if(err) {
                    return done(err);
                }
                return done(null, user);
            });
        }
    )
);

passport.use(
    new LocalStrategy(
        function(username, password, done) {
            User.findOne({username:username}).exec(function(err,user) {
                if(err) {
                    return done(err);
                }
                if(!user) {
                    return done(null, false, {message: 'Unknown user ' + username});
                }
                bcrypt.compare(password,user.password, function(err, res) {
                    if(!res) {
                        return done(null, false, {message: 'Invalid password' });
                    }
                });
                return done(null, user);
            });
        }
    )
);

module.exports.http = {
    customMiddleware: function(app) {
        app.use(passport.initialize());
        app.use(passport.session());
    }
};
