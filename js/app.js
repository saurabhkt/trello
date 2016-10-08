// /js/app.js

var app = app || {};

$(function() {

	var Dashboard = new app.DashboardView();
	
	var Router = Backbone.Router.extend({
	    routes: {
	        ''								: 'dashboard'
	    },

	    dashboard: function() {
	    	// Dashboard.render();
	    }
	});

	app.AppRouter = new Router();

	Backbone.history.start();

});
