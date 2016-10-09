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
        'click span.delete-task' : 'deleteTask'
    },

    render: function() {
        this.$el.html(this.template(this.model.attributes));
        return this;
    },

    deleteTask: function(e) {
        this.model.destroy();
        this.undelegateEvents();
        this.remove();
    }
});