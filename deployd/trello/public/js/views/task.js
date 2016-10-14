// /js/views/task.js

var app = app || {};

app.TaskView = Backbone.View.extend({

    initialize: function(options) {
        this.cardModel = options.cardModel;
        this.listenTo(this.cardModel, 'change', this.updateTaskCount);
    },

    tagName: 'div',

    className: 'task',
    
    template: _.template($('#taskTemplate').html()),

    events: {
        'click span.edit-task' : 'editTask',
        'click span.cancel-edit-task' : 'cancelEditTask',
        'click span.delete-task' : 'deleteTask',
        'click button.save-task' : 'saveTask',
        'dropped' : 'sort'
    },

    render: function(mode) {
        var data = this.model.toJSON();
        data['users'] = AllUsers.toJSON();

        data['mode'] = mode || 'read';
        this.$el.removeClass('edit read').addClass(mode);

        this.$el.html(this.template(data));

        return this;
    },

    sort: function(event, index) {
        this.$el.trigger('update-sort', [this.model, index]);
    },

    editTask: function() {
        this.render('edit');
    },

    cancelEditTask: function() {
        if(this.model.isNew())
            this.deleteTask();
        else
            this.render();
    },

    saveTask: function() {
        var that = this;
        this.model.set({
            text: this.$('textarea.task-text').val(),
            assignedTo: this.$('select option:selected').val(),
            cardId: this.$el.closest('.card').find('input[name="cardId"]').val(),
            order: this.model.get('order') || this.cardModel.get('tasks').length + 1
        });
        if(this.model.isNew()) {

            this.collection.add(this.model);
            this.model.save(null, {
                success: function(response) {
                    that.render();
                    this.id = response.id;
                    var taskIds = _.clone(that.cardModel.get('tasks'));
                    taskIds.push(this.id)
                    that.cardModel.set({
                        tasks: taskIds
                    });
                }
            });
        }
        else {
            this.model.save();
            this.render();
        }
    },

    deleteTask: function(e) {
        var taskIds = this.cardModel.get('tasks');
        this.cardModel.set({
            tasks: this.removeFromArray(taskIds, this.model.get('id'))
        });
        this.model.destroy();
        this.undelegateEvents();
        this.remove();
    },

    removeFromArray: function(arr, key) {
        return $.grep(arr, function(value) {
            return value != key;
        });
    }
});