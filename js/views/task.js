// /js/views/task.js

var app = app || {};

app.TaskView = Backbone.View.extend({

    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
    },

    tagName: 'div',

    className: 'task',
    
    template: _.template($('#taskTemplate').html()),

    events: {
        'click span.edit-task' : 'editTask',
        'click span.cancel-edit-task' : 'cancelEditTask',
        'click span.delete-task' : 'deleteTask',
        'click button.save-task' : 'saveTask'
    },

    render: function(mode) {
        var data = this.model.attributes;
        data['users'] = AllUsers.toJSON();

        data['mode'] = mode || 'read';
        this.$el.removeClass('edit read').addClass(mode);

        this.$el.html(this.template(data));

        app.Utils.initSortable();

        return this;
    },

    editTask: function() {
        this.render('edit');
    },

    cancelEditTask: function() {
        // if(this.model.isNew())
        //     this.deleteTask();
        // else
            this.render();
    },

    saveTask: function() {
        this.model.set({
            text: this.$('textarea.task-text').val(),
            assignedTo: this.$('select.assign-to').val()
        });
        this.collection.add(this.model);
        this.model.save();
    },

    deleteTask: function(e) {
        this.model.destroy();
        this.undelegateEvents();
        this.remove();
    }
});