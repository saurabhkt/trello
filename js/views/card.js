// /js/views/card.js

var app = app || {};

app.CardView = Backbone.View.extend({

    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
        this.collection = new app.TasksCollection(this.model.get('tasks'));

        this.model.listenTo(this.collection, 'update', this.updateModel);
    },

    tagName: 'div',

    className: 'card',
    
    template: _.template($('#cardTemplate').html()),

    events: {
        'click span.delete-card'        : 'deleteCard',
        'change textarea.card-title'    : 'updateCardName',
        'keypress textarea.card-title'  : 'enterToSave'
    },

    render: function() {
        var that = this;
        var data = this.model.attributes;
        data['tasksCount'] = data.tasks.length;

        this.$el.html(this.template(data));
        
        this.renderTaskList();

        return this;
    },

    renderTaskList: function() {
        var taskListView = new app.TaskListView({
            collection: this.collection,
            model: this.model
        });

        this.$('.card-content').append(taskListView.render().el);
        app.Utils.initSortable();
    },

    /*
        The below function exits only because there is no real backend to map data of
        cards collection and tasks collections when HTTP requests are made to their respective endpoints (i.e.: /cards and /tasks)
    */
    updateModel: function(collection) {
        this.set({
            'tasks' : collection.toJSON()
        });
        this.save();
    },

    enterToSave: function(e) {
        if(e.keyCode == 13) {
            e.preventDefault();
            this.updateCardName();
        }
    },

    updateCardName: function(e) {
        this.model.set({
            title: this.$('textarea.card-title').val()
        });
        this.model.save();
        this.$('textarea.card-title').blur();
    },

    deleteCard: function(e) {
        this.model.destroy();
        this.undelegateEvents();
        this.remove();
    }
});