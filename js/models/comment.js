// /js/models/comment.js

var app = app || {};

app.CommentModel = Backbone.Model.extend({
    url         : '',
    defaults    : {
            		text: "",
            		order: "",
            		createdBy: "",
            		createdAt: ""
                  }
});