// /js/collections/tasks.js

var app = app || {};

app.TasksCollection = Backbone.Collection.extend({
	url				: '/tasks',
    model			: app.TaskModel,
    comparator		: 'order'
});

var AllTasks = new app.TasksCollection();