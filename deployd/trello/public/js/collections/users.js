// /js/collections/users.js

var app = app || {};

app.UsersCollection = Backbone.Collection.extend({
	url				: '/users',
    model			: app.UserModel
});

var AllUsers = new app.UsersCollection();