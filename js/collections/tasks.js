// /js/collections/tasks.js

var app = app || {};

app.TasksCollection = Backbone.Collection.extend({
	url				: 'http://localhost:2403/tasks',
    model			: app.TaskModel
});

var AllTasks = new app.TasksCollection();