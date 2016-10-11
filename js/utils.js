// /js/utils.js

var app = app || {};

$(function() {

	app.Utils = {
		guid:	function () {
		  			return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
		},
		initSortable: function() {

			$('.task-list-content:not(:data(ui-sortable))').each(function() {
				$(this).sortable({
            		connectWith: '.task-list-content',
            		update: function(event, ui) {
                		// console.log($(this).find('.card').length);
                		console.log('taskid:'+$(ui.item).find('input[name="taskId"]').val());
            		}
        		});
			});

			$('.card-list-content:not(:data(ui-sortable))').each(function() {
				$(this).sortable({
            		connectWith: '.card-list-content',
            		update: function(event, ui) {
                		// console.log($(this).find('.card').length);
                		console.log('cardid:'+$(ui.item).find('input[name="cardId"]').val());
            		}
        		});
			});
		}
	}

	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	}

});
