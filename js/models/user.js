// /js/models/user.js

var app = app || {};

app.UserModel = Backbone.Model.extend({
    url         : '',
    defaults    : {
            		name: "",
            		username: ""
                  }
});