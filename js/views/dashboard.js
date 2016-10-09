// /js/views/dashboard.js

var app = app || {};

app.DashboardView = Backbone.View.extend({
    el : '#dashboard > .content',

    initialize: function() {
        AllCards.reset();
        AllUsers.reset();
        AllCards.fetch();
        AllUsers.fetch();
        this.render();
    },

    render: function() {
        this.renderCardLists();
        return this;
    },

    renderCardLists: function() {
        var cardListView = new app.CardListView({
            collection: AllCards
        });

        this.$el.append(cardListView.render().el);
    }
});