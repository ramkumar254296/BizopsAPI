 /* jshint unused: vars */


  "use strict";
    var express=require("express"),
    bodyParser=require("body-parser"),
	methodOverride = require("method-override");
	// path=require("path");
	
	module.exports=function(){
		
		var app=express();
		app.use(bodyParser.urlencoded({
			extended:true
		}));
		
		app.use(bodyParser.json());

		app.use(methodOverride());

		app.use(function(req, res, next) {
			// res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Origin", "http://localhost:4200");
			// res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
			//  res.header("Access-Control-Allow-Origin", "http://157.56.179.20");
			res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
			res.header('Access-Control-Allow-Credentials', true);
			next();
			
		});

		app.use(express.static("./public"));
		require("../route/homepage.server.route")(app);
	    require("../route/home.server.route") (app);
		// require("../route/userchart.server.route")(app);
        // require("../route/videochart.server.route")(app); 
	    // require("../route/layout.Server.route")(app);		
		return app;
	};

		

		

		

		