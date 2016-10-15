// /js/views/card-list.js

var app = app || {};

app.CardListView = Backbone.View.extend({
    initialize: function() {
        this.listenTo(this.collection, 'add', this.renderCard);
    },

    template: _.template($('#cardListTemplate').html()),

    events: {
        'click button.add-card' : 'addCard',
        'update-sort' : 'updateSort'
    },

    render: function() {
        var that = this;
        this.$el.html(this.template());

        this.collection.each(function(model) {
            that.renderCard(model);
        }, this);

        return this;
    },

    updateSort: function(event, model, position) {
        this.collection.remove(model);

        this.collection.each(function (model, index) {
            var order = index;
            if (index >= position)
                order += 1;
            model.set('order', order);
            model.save();
        });            
        
        model.set('order', position);
        this.collection.add(model, {at: position});
        model.save();
    },

    renderCard: function(model) {
        var cardView = new app.CardView({
            model: model,
            collection: this.collection
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