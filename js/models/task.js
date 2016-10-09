// /js/models/task.js

var app = app || {};

app.TaskModel = Backbone.Model.extend({
	localStorage	: new Backbone.LocalStorage("TaskModel"),
    defaults    : {
    				id: "",
            		text: "",
                    order: "",
                    createdBy: "",
                    createdAt: "",
                    updatedAt: "",
                    edited: false,
                    assignedTo: ""
                  }
});