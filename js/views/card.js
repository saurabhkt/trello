// /js/views/card.js

var app = app || {};

app.CardView = Backbone.View.extend({

    initialize: function() {
    	var that = this;
        this.listenTo(this.model, 'change', this.render);

        this.collection = new app.TasksCollection(this.model.get('tasks'));
    },

    tagName: 'div',

    className: 'card',
    
    template: _.template($('#cardTemplate').html()),

    render: function() {
    	var data = this.model.attributes;
    	data['tasksCount'] = data.tasks.length;
        this.$el.html(this.template(data));
        this.renderTasks();

        return this;
    },

    renderTasks: function() {
    	var that = this;

    	if(!this.collection.isEmpty()) {
            this.collection.each(function(task) {
                that.renderTask(task);
            }, this);
        }
		else {
            this.$('.card-content').html('<div class="text-center"><p class="font12">No tasks.</p></div>');
        }
        
    },

    renderTask: function(task) {
    	var taskView = new app.TaskView({
            model: task
        });

    	this.$('.card-content').append(taskView.render().el);
    }

});