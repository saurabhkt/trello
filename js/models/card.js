// /js/models/card.js

var app = app || {};

app.CardModel = Backbone.Model.extend({
    url         : '',
    defaults    : {
    				id: "",
            		title: "",
                    order: "",
                    createdBy: "",
                    createdAt: "",
                    tasks: []
                  }
});