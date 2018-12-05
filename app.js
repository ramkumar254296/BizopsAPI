"use strict";
var express=require("./config/express");
var config =require("./config/db");
var app=express();

var server=app.listen(3010,function(){
	var port=server.address().port;
	console.log("port 3010 running !!!!!");
	
});


// app.use(function(req, res, next) { //allow cross origin requests
// 	res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// 	res.header("Access-Control-Allow-Credentials", true);
// 	next();
// });
// app.use(function (req, res, next) {
// 	req.sql = tediousExpress(config);
//  next();
// });

module.export={
	app:app,
	server:server
};
