// /js/collections/comments.js

var app = app || {};

app.CommentsCollection = Backbone.Collection.extend({
    model			: app.CommentModel
});