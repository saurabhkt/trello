// /js/collections/users.js

var app = app || {};

app.UsersCollection = Backbone.Collection.extend({
	localStorage	: new Backbone.LocalStorage("UsersCollection"),
    model			: app.UserModel
});