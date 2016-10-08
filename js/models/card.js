// /js/models/card.js

var app = app || {};

app.CardModel = Backbone.Model.extend({
    url         : '',
    defaults    : {
            		title: "",
                    order: "",
                    createdBy: "",
                    createdAt: ""
                  }
});