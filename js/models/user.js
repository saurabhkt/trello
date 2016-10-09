// /js/models/user.js

var app = app || {};

app.UserModel = Backbone.Model.extend({
	localStorage	: new Backbone.LocalStorage("UserModel"),
    defaults    : {
            		id: "",
            		name: ""
                  }
});