// /js/models/task.js

var app = app || {};

app.TaskModel = Backbone.Model.extend({
    defaults    : {
            		text: "",
                    order: "",
                    assignedTo: "",
                    cardId: ""
    }
});