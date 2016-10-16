// /js/views/task.js

var app = app || {};

app.TaskView = Backbone.View.extend({

    initialize: function(options) {
        this.cardModel = options.cardModel;
    },

    tagName: 'div',

    className: 'task',
    
    template: _.template($('#taskTemplate').html()),

    events: {
        'click span.edit-task' : 'editTask',
        'click span.cancel-edit-task' : 'cancelEditTask',
        'click span.delete-task' : 'deleteTask',
        'click button.save-task' : 'saveTask',
        'keypress textarea.task-text'  : 'enterToSave',
        'keypress select.assign-to'  : 'enterToSave',
        'sort' : 'sort',
        'removed' : 'removed',
        'received' : 'received'
    },

    render: function(mode) {
        var data = this.model.toJSON();
        data['users'] = AllUsers.toJSON();

        data['mode'] = mode || 'read';
        this.$el.removeClass('edit read').addClass(mode);

        this.$el.html(this.template(data));
        return this;
    },

    sort: function(event, ui) {
        this.$el.trigger('update-sort', [this.model, ui.item.index()]);
    },

    removed: function(event, ui) {
        this.collection.remove(this.model);

        var taskIds = _.clone(this.cardModel.get('tasks'));
        this.cardModel.set({
            tasks: this.removeFromArray(taskIds, this.model.get('id'))
        });
    },

    removeFromArray: function(arr, key) {
        return $.grep(arr, function(value) {
            return value != key;
        });
    },

    received: function(event, ui) {
        var targetTaskList = $(ui.item).closest('.task-list');
        $(targetTaskList).trigger('task-dropped', [this.model, ui]);
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

    enterToSave: function(e) {
        if(e.keyCode == 13) {
            e.preventDefault();
            this.saveTask();
        }
    },

    saveTask: function() {
        var that = this;
        this.model.set({
            text: this.$('textarea.task-text').val(),
            assignedTo: this.$('select option:selected').val(),
            cardId: this.$el.closest('.card').find('input[name="cardId"]').val(),
            order: this.model.get('order') || this.cardModel.get('tasks').length
        });
        if(this.model.isNew()) {

            AllTasks.add(this.model);
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
        this.removed();
        this.undelegateEvents();
        this.remove();
        this.model.destroy();
    }
});