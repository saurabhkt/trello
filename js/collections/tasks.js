// /js/collections/tasks.js

var app = app || {};

app.TasksCollection = Backbone.Collection.extend({
	localStorage	: new Backbone.LocalStorage("TasksCollection"),
    model			: app.TaskModel
});

var AllTasks = new app.TasksCollection();