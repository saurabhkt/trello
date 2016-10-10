// /js/collections/users.js

var app = app || {};

app.UsersCollection = Backbone.Collection.extend({
	url				: 'http://localhost:2403/users',
    model			: app.UserModel
});

var AllUsers = new app.UsersCollection();