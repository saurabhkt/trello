// /js/collections/cards.js

var app = app || {};

app.CardsCollection = Backbone.Collection.extend({
	url				: '/cards',
    model			: app.CardModel,
    comparator		: 'order'
});

var AllCards = new app.CardsCollection();