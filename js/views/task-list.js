// /js/views/task-list.js

var app = app || {};

app.TaskListView = Backbone.View.extend({
    initialize: function() {
        this.listenTo(this.collection, 'change', this.render);

        this.listenTo(this.collection, 'add', this.renderTask);
        this.listenTo(this.collection, 'reset', this.render);
        this.listenTo(this.collection, 'remove', this.render);
    },

    template: _.template($('#taskListTemplate').html()),

    events: {
        'click div.add-task'    : 'addTask'
    },

    render: function() {
        var that = this;
        this.$el.html(this.template());

        if(!this.collection.isEmpty()) {
            this.$('.task-list-content').html('');
            this.collection.each(function(task) {
                that.renderTask(task);
            }, this);
        }

        app.Utils.initSortable();

        return this;
    },

    renderTask: function(task, mode) {
        var taskView = new app.TaskView({
            model: task,
            collection: this.collection
        });
        var param = mode || 'read';
        this.$('.task-list-content').append(taskView.render(mode).el);

        app.Utils.initSortable();
    },

    addTask: function(e) {
        e.preventDefault();
        var model = new app.TaskModel();
        this.renderTask(model, 'edit');
        // this.collection.add(model);
    }
});