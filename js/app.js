// /js/app.js

var app = app || {};

$(function() {

	var Router = Backbone.Router.extend({
	    routes: {
	        ''								: 'dashboard'
	    },

	    dashboard: function() {
	    	Dashboard.render();
	    }
	});

	app.AppRouter = new Router();

	Backbone.history.start();

});
