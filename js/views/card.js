// /js/views/card.js

var app = app || {};

app.CardView = Backbone.View.extend({

    initialize: function() {

        this.collection = new app.TasksCollection(this.model.get('tasks'));

        this.listenTo(this.collection, 'change', this.render);

        this.listenTo(this.collection, 'add', this.renderTask);
        this.listenTo(this.collection, 'reset', this.render);
        this.listenTo(this.collection, 'remove', this.render);

        // this.model.listenTo(this.collection, 'add', this.saveNewTask);
        this.model.listenTo(this.collection, 'update', this.updateModel);
    },

    tagName: 'div',

    className: 'card',
    
    template: _.template($('#cardTemplate').html()),

    events: {
        'click div.add-task' : 'newTask',
        'click div.task' : 'editTask',
        'click span.delete-card' : 'deleteCard',
        'change textarea.card-title' : 'updateCardName',
        'keypress textarea.card-title'    : 'enterToUpdate'
    },

    render: function() {
        var that = this;

        var data = this.model.attributes;
        data['tasksCount'] = data.tasks.length;
        this.$el.html(this.template(data));
        
        this.collection.each(function(task) {
            that.renderTask(task);
        }, this);

        return this;
    },

    renderTask: function(task) {
        var taskView = new app.TaskView({
            model: task
        });

        this.$('.card-content').append(taskView.render().el);
    },

    newTask: function(e) {
        e.preventDefault();
        var that = this;

        var taskFullView = new app.TaskFullView({
            model: new app.TaskModel(),
            mode: 'create',
            callback: function (model) {
                        that.addTask(model);
                        this.close();
                    }
        });
        $('#modalWrapper').html(taskFullView.render().el);
        $('#taskModal').modal({
            backdrop: false
        });
        $('#taskModal').on('shown.bs.modal', function (e) {
            $('#taskModal textarea.task-text').focus();
        })
    },

    addTask: function(model) {
        var taskView = new app.TaskView({
            model: model
        });
        this.collection.add(model);
    },

    editTask: function(e) {
        var that = this;
        var taskId = $(e.currentTarget).find('input[name="taskId"]').val();
        var taskFullView = new app.TaskFullView({
            model: this.collection.get(taskId),
            mode: 'edit',
            callback: function (model) {
                        that.updateTask(model);
                        this.close();
                    }
        });
        $('#modalWrapper').html(taskFullView.render().el);
        $('#taskModal').modal({
            backdrop: false
        });
    },

    updateTask: function(model) {
        this.collection.set(model);
    },

    updateModel: function(collection) {
        this.set({
            tasks: collection.toJSON()
        });
        this.save();
    },

    enterToUpdate: function(e) {
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
    },

    deleteCard: function(e) {
        this.model.destroy();
        this.undelegateEvents();
        this.remove();
    }
});