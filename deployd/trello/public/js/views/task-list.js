// /js/views/task-list.js

var app = app || {};

app.TaskListView = Backbone.View.extend({
    initialize: function() {
        var that = this;
        this.taskIds = this.model.get('tasks');
        this.collection = new app.TasksCollection();

        $.each(this.taskIds, function(index, value) {
            var model =  AllTasks.get(value);
            that.collection.add(model);
        });
    },

    template: _.template($('#taskListTemplate').html()),

    events: {
        'click div.add-task'    : 'addTask',
        'update-sort' : 'updateSort'
    },

    render: function() {
        var that = this;
        this.$el.html(this.template());

        this.collection.each(function(model) {
            that.renderTask(model);
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

    renderTask: function(model, mode) {
        var taskView = new app.TaskView({
            model: model,
            collection: AllTasks,
            cardModel: this.model
        });
        var param = mode || 'read';
        this.$('.task-list-content').append(taskView.render(mode).el);
    },

    addTask: function(e) {
        e.preventDefault();
        var model = new app.TaskModel();
        this.renderTask(model, 'edit');
    }
});