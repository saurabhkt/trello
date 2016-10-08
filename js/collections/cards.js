// /js/collections/cards.js

var app = app || {};

app.CardsCollection = Backbone.Collection.extend({
	url				: 'https://api.myjson.com/bins/ntlu', // FOR TESTING
	localStorage	: new Backbone.LocalStorage("CardsCollection"),
    model			: app.CardModel
});

var AllCards = new app.CardsCollection();