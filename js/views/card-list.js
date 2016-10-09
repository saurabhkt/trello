// /js/views/card-list.js

var app = app || {};

app.CardListView = Backbone.View.extend({
    initialize: function() {
        this.listenTo(this.collection, 'change', this.render);

        this.listenTo(this.collection, 'add', this.renderCard);
        this.listenTo(this.collection, 'reset', this.render);
        this.listenTo(this.collection, 'remove', this.render);
    },

    template: _.template($('#cardListTemplate').html()),

    events: {
        'click button.add-card' : 'addCard'
    },

    render: function() {
        var that = this;
        this.$el.html(this.template());

        if(!this.collection.isEmpty()) {
            this.$('.card-list-content').html('');
            this.collection.each(function(card) {
                that.renderCard(card);
            }, this);
        }
        
        return this;
    },

    renderCard: function(card) {
        var cardView = new app.CardView({
            model: card
        });
        this.$('.card-list-content').append(cardView.render().el);
    },

    addCard: function(e) {
        e.preventDefault();
        var model = new app.CardModel({
            id: app.Utils.guid()
        });
        this.collection.create(model);
    }
});