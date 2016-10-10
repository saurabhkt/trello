// /js/models/comment.js

var app = app || {};

app.CommentModel = Backbone.Model.extend({
    defaults    : {
            		text: "",
            		order: "",
            		createdBy: "",
            		createdAt: ""
                  }
});