// /js/models/card.js

var app = app || {};

app.CardModel = Backbone.Model.extend({
	localStorage	: new Backbone.LocalStorage("CardModel"),
    defaults    : {
    				id: "",
            		title: "",
                    order: "",
                    createdBy: "",
                    createdAt: "",
                    tasks: []
                  }
});