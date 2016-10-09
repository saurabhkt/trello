// /js/app.js

var app = app || {};

$(function() {

	Backbone.View.prototype.close = function() {
		this.remove();
		this.unbind();
		if (this.onClose){
	    	this.onClose();
	  	}
	};

	var Dashboard = new app.DashboardView();
	
	var Router = Backbone.Router.extend({
	    routes: {
	        ''		: 'dashboard'
	    },

	    dashboard: function() {
	    	// Dashboard.render();
	    }
	});

	app.AppRouter = new Router();

	Backbone.history.start();

});
