// /js/collections/cards.js

var app = app || {};

app.CardsCollection = Backbone.Collection.extend({
	url				: 'http://localhost:2403/cards',
    model			: app.CardModel
});

var AllCards = new app.CardsCollection();