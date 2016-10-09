// /js/collections/cards.js

var app = app || {};

app.CardsCollection = Backbone.Collection.extend({
	localStorage	: new Backbone.LocalStorage("CardsCollection"),
    model			: app.CardModel
});

var AllCards = new app.CardsCollection();