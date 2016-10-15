// /js/views/card.js

var app = app || {};

app.CardView = Backbone.View.extend({

    initialize: function() {
        var that = this;

        this.listenTo(this.model, 'change:tasks', this.updateTaskCount);
    },

    tagName: 'div',

    className: 'card',
    
    template: _.template($('#cardTemplate').html()),

    events: {
        'click span.delete-card'        : 'deleteCard',
        'change textarea.card-title'    : 'updateCardName',
        'keypress textarea.card-title'  : 'enterToSave',
        'dropped' : 'sort'
    },

    render: function() {
        var that = this;
        var data = this.model.attributes;
        data['tasksCount'] = data.tasks.length;

        this.$el.html(this.template(data));
        this.renderTaskList();

        return this;
    },

    sort: function(event, index) {
        this.$el.trigger('update-sort', [this.model, index]);
    },

    renderTaskList: function() {
        var taskListView = new app.TaskListView({
            model: this.model
        });
        this.$('.card-content').append(taskListView.render().el);

        app.Utils.initSortable();
    },

    updateTaskCount: function() {
        this.render();
        this.model.save();
    },

    enterToSave: function(e) {
        if(e.keyCode == 13) {
            e.preventDefault();
            $(e.currentTarget).blur();
        }
    },

    updateCardName: function(e) {
        var that = this;
        this.model.set({
            title: this.$('textarea.card-title').val(),
            order: this.model.get('order') || this.collection.length + 1
        });
        this.model.save(null, {
            success: function(response) {
                that.model.set({
                    id: response.id
                });
            }
        });
        this.$('textarea.card-title').blur();
    },

    deleteCard: function(e) {
        this.model.destroy();
        this.undelegateEvents();
        this.remove();
    }
});