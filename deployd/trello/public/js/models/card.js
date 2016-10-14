// /js/models/card.js

var app = app || {};

app.CardModel = Backbone.Model.extend({
    defaults    : {
            		title: "",
                    order: "",
                    tasks: []
                  }
});