// /js/collections/tasks.js

var app = app || {};

app.TasksCollection = Backbone.Collection.extend({
    model			: app.TaskModel
});

var AllTasks = new app.TasksCollection();