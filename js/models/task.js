// /js/models/task.js

var app = app || {};

app.TaskModel = Backbone.Model.extend({
    defaults    : {
            		text: "",
                    order: "",
                    createdBy: "",
                    createdAt: "",
                    updatedAt: "",
                    edited: false,
                    assignedTo: ""
    }
});