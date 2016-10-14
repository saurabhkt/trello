// /js/views/dashboard.js

var app = app || {};

app.DashboardView = Backbone.View.extend({
    el : '#dashboard > .content',

    initialize: function() {
        var that = this;

        AllTasks.fetch({
            success: function() {
                AllCards.fetch({
                    success: function(){
                        AllUsers.fetch({
                            success: function() {
                                that.render();                     
                            }
                        });
                    }
                });        
            }
        });
    },

    render: function() {
        this.renderCardLists();
        app.Utils.initSortable();
        return this;
    },

    renderCardLists: function() {
        var cardListView = new app.CardListView({
            collection: AllCards
        });

        this.$el.append(cardListView.render().el);
    }
});