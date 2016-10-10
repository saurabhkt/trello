// /js/views/dashboard.js

var app = app || {};

app.DashboardView = Backbone.View.extend({
    el : '#dashboard > .content',

    initialize: function() {
        var that = this;
        AllCards.fetch();
        AllUsers.fetch({
            success: function() {
                that.render();
            }
        });
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