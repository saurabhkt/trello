// /js/views/task-full.js

var app = app || {};

app.TaskFullView = Backbone.View.extend({

    initialize: function(options) {
    	var that = this;
        this.model = options.model;
        this.collection = options.collection;
    },
    
    template: _.template($('#taskFullTemplate').html()),

    el: '#modalWrapper',

    events: {
        'click button.save-task'    : 'saveTask',
        'click button.cancel-task'  : 'cancelTask',
    },

    render: function() {
        var data = this.model.attributes;
        data['users'] = AllUsers.toJSON();

        this.$el.html(this.template(data));
        $('#taskModal').modal({
            backdrop: false
        });
        $('#taskModal').on('shown.bs.modal', function (e) {
            $('#taskModal textarea.new-task').focus();
        })

        return this;
    },

    saveTask: function(e) {
        e.preventDefault();
        this.model.set({
            text: this.$('textarea.new-task').val(),
            assignedTo: this.$('select.assign-to').val()
        });
        this.collection.add(this.model);
        this.model.save();
        this.close();
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