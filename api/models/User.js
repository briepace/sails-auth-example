/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
      firstName: {
          type: 'string',
      },
      lastName: {
          type: 'string',
      },
      username: {
          type: 'string',
          unique: true,
          required: true,
      },
      email: {
          type: 'email',
      },
      password: {
          type: 'string',
      },
      ldap: {
          type: 'boolean',
          defaultsTo: false,
      },
      admin: {
          type: 'boolean',
          defaultsTo: false,
      },
      toJSON: function() {
          var obj = this.toObject();
          delete obj.password;
          return obj;
      }

  },
  beforeCreate: function(user, cb) {
      bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(user.password, salt, function(err, hash) {
              if(err) {
                  console.log(err);
                  cb();
              } else {
                  user.password = hash;
                  cb(null, user);
              }
          });
      });
  }
};

