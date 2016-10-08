// /js/views/task.js

var app = app || {};

app.TaskView = Backbone.View.extend({

    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
    },

    tagName: 'div',

    className: 'task',
    
    template: _.template($('#taskTemplate').html()),

    render: function() {
        this.$el.html(this.template(this.model.attributes));
        return this;
    }
});