// /js/views/task-full.js

var app = app || {};

app.TaskFullView = Backbone.View.extend({

    initialize: function(options) {
    	var that = this;
        this.callback = options.callback;
        this.mode = options.mode;
    },
    
    template: _.template($('#taskFullTemplate').html()),

    events: {
        'click button.save-task'        : 'saveTask',
        'click button.cancel-task'      : 'cancelTask',
        'keypress textarea.task-text'    : 'enterToSave'
    },

    render: function() {
        var data = this.model.attributes;
        data['users'] = AllUsers.toJSON();
        data['mode'] = this.mode;

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
            id: app.Utils.guid(),
            text: this.$('textarea.task-text').val(),
            assignedTo: this.$('select.assign-to').val()
        });

        if(this.callback)
            this.callback(this.model);
    },

    cancelTask: function() {
        this.close();
    },

    onClose: function() {
        $('#taskModal').modal('hide');
        $('body').removeClass('modal-open');
        this.undelegateEvents();
    }
});