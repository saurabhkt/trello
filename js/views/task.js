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
        'click span.delete-task' : 'deleteTask',
        'click button.save-task' : 'saveTask'
    },

    render: function(mode) {
        var data = this.model.attributes;
        data['users'] = AllUsers.toJSON();
        
        data['mode'] = mode || 'read';
        this.$el.addClass(mode);

        this.$el.html(this.template(data));
        return this;
    },

    editTask: function() {
        this.render('edit');
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