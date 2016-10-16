// /js/utils.js

var app = app || {};

$(function() {

	app.Utils = {
		initSortable: function() {
			$('.task-list-content:not(:data(ui-sortable))').each(function() {
				$(this).sortable({
            		connectWith: '.task-list-content',
            		update: function(event, ui) {
            			if($(ui.item).closest('.task-list-content').attr('data-cardId') == $(event.target).attr('data-cardId'))
            				ui.item.trigger('sort', ui);
            		},
            		remove: function(event, ui) {
            			if($(ui.item).find('input[name="taskId"]').val().length > 0)
                			ui.item.trigger('removed', ui);
            		},
            		receive: function(event, ui) {
            			if($(ui.item).find('input[name="taskId"]').val().length > 0)
                			ui.item.trigger('received', ui);
            		}
        		});
			});
			$('.card-list-content:not(:data(ui-sortable))').each(function() {
				$(this).sortable({
            		connectWith: '.card-list-content',
            		update: function(event, ui) {
                		console.log('cardid:'+$(ui.item).find('input[name="cardId"]').val());
                		if($(ui.item).find('input[name="cardId"]').val().length > 0)
                			ui.item.trigger('dropped', ui);
            		}
        		});
			});
		}
	}

});
