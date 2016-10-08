// /js/collections/comments.js

var app = app || {};

app.CommentsCollection = Backbone.Collection.extend({
	localStorage	: new Backbone.LocalStorage("CommentsCollection"),
    model			: app.CommentModel
});