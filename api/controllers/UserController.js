/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var passport = require('passport');
module.exports = {
    login: function (req,res)
    {
        res.view();
    },

    process: function(req, res) {
        User.findOne({username:req.param('username')}).exec(function(err, user) {
            if(user && (user.ldap === true)) {
                passport.authenticate('ldapauth', function(err, user, info) {
                    if(err || !user) {
                        return res.redirect('/user/login');
                    }

                    req.logIn(user, function(err)
                    {
                        if (err)
                        {
                            res.redirect('/user/login');
                            return;
                        }

                        var redirect_to = req.session.redirect_to ? req.session.redirect_to : '/';
                        delete req.session.redirect_to;

                        res.redirect(redirect_to);
                        return;
                    });
                })(req, res);
            } else {
                passport.authenticate('local', function(err, user, info)
                {
                    if ((err) || (!user))
                    {
                        res.redirect('/user/login');
                        return;
                    }

                    req.logIn(user, function(err)
                    {
                        if (err)
                        {
                            res.redirect('/user/login');
                            return;
                        }
                        
                        var redirect_to = req.session.redirect_to ? req.session.redirect_to : '/';
                        delete req.session.redirect_to;

                        res.redirect(redirect_to);
                        return;
                    });
                })(req, res);
            }
        });

    },

    whoami: function(req,res) {
        res.json(req.user);
    },

    logout: function (req,res)
    {
        req.logout();
        res.redirect('/');
    },

    create: function(req, res) {
        res.view();
    },

    process_create: function(req, res) {
        var username = req.param('username');
        var firstName = req.param('firstName');
        var lastName = req.param('lastName');
        var email = req.param('email');
        var password = req.param('password');
        var ldap = req.param('ldap') == 1 ? true : false;
        var admin = req.param('admin') == 1 ? true : false;
        User.create({
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            ldap: ldap,
            admin: admin,
        }).exec(function(err, user) {
            if(err) {
                res.json({error: err});
            }
            res.json(user);
        });
        //res.json({status:'authorized'});
    },



  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  _config: {}


};
