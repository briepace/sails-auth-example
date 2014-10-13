# Sails Auth Example

This is an example application providing local and LDAP authentication. It uses
[PassportJS](https://github.com/jaredhanson/passport), [passport-local](https://github.com/jaredhanson/passport-local), and [passport-ldapauth](https://github.com/vesse/passport-ldapauth).

To get LDAP authentication working, open config/passport.js and change 
```javascript
server: {
    url: "SERVER_URL",
    adminDn: "ADMIN_DN",
    adminPassword: "ADMIN_PASSWORD",
    searchBase: "SEARCH_BASE",
    searchFilter: "SEARCH_FILTER",
}
```
to match your LDAP server information.
