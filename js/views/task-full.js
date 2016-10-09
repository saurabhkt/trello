// /js/views/task-full.js

var app = app || {};

app.TaskFullView = Backbone.View.extend({

    initialize: function(options) {
    	var that = this;
        this.callback = options.callback;
    },
    
    template: _.template($('#taskFullTemplate').html()),

    events: {
        'click button.save-task'        : 'saveTask',
        'click button.cancel-task'      : 'cancelTask',
        'keypress textarea.new-task'    : 'enterToSave'
    },

    render: function() {
        var data = { users: AllUsers.toJSON() };
        this.$el.html(this.template(data));

        return this;
    },

    enterToSave: function(e) {
        if(e.keyCode == 13) {
            e.preventDefault();
            this.saveTask();
        }
            
    },

    saveTask: function(e) {
        this.model.set({
            text: this.$('textarea.new-task').val(),
            assignedTo: this.$('select.assign-to').val()
        });

        if(this.callback)
            this.callback(this.model);
    },

    cancelTask: function() {
        
    },

    onClose: function() {
        $('#taskModal').modal('hide');
        $('body').removeClass('modal-open');
        this.undelegateEvents();
    }
});