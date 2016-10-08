// /js/models/task.js

var app = app || {};

app.TaskModel = Backbone.Model.extend({
    url         : '',
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