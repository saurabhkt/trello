// /js/views/dashboard.js

var app = app || {};

app.DashboardView = Backbone.View.extend({
    el : '#dashboard > .content',

    initialize: function() {
        
    },

    render: function() {
        
        var cardModel = new app.CardModel();
        var cardView = new app.CardView({
            model: cardModel
        });

        this.$el.html(cardView.render().el);
        return this;
    }
});

var Dashboard = new app.DashboardView();