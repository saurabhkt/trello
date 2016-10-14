// /js/views/card-list.js

var app = app || {};

app.CardListView = Backbone.View.extend({
    initialize: function() {
        this.listenTo(this.collection, 'add', this.renderCard);
    },

    template: _.template($('#cardListTemplate').html()),

    events: {
        'click button.add-card' : 'addCard'
    },

    render: function() {
        var that = this;
        this.$el.html(this.template());

        this.collection.each(function(model) {
            that.renderCard(model);
        }, this);

        return this;
    },

    renderCard: function(model) {
        var cardView = new app.CardView({
            model: model
        });

        this.$('.card-list-content').append(cardView.render().el);

        app.Utils.initSortable();
    },

    addCard: function(e) {
        e.preventDefault();
        var model = new app.CardModel();
        this.collection.add(model);
    }
});