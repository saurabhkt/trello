I'm not a backend developer so Google search results lead me to deployd.com
which allows me to easily create and run REST APIs on my local machine.

Kindly install deployd to run this Trello app. I initially started with a
simple python server and backboneLocalStorage but that had its own issues.


NOTE: 
> Dependencies: MongoDB, npm and deployd ( https://github.com/deployd/deployd ,  http://deployd.com/ )


HOW TO SET UP:
> To install MongoDB: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

> To install deployd, use npm:
	
	npm install deployd -g

> Once you have successfully installed deployd, use terminal to navigate to:
	
	trello/deployd/trello

> then run the following command:

	dpd

This will run trello using deployd with the local server at: http://localhost:2403/


