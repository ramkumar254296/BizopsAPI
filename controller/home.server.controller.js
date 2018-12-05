"use strict";
var config=require("../config/manager/HomeManager");

exports.getCategory=function(req,res){
	config.getCategory(function(err,result){
		res.send(result);
	});	
};

exports.getSubCategory=function(req,res){
	config.getSubCategory(function(err,result){
		res.send(result);
	});	
};

exports.getSubchildCategory=function(req,res){
	config.getSubchildCategory(function(err,result){
		res.send(result);
	});	
};

exports.getState=function(req,res){
	config.getState(function(err,result){
		res.send(result);
	});	
};

exports.getCounty=function(req,res){
	config.getCounty(function(err,result){
		res.send(result);
	});	
};

exports.getProductList=function(req,res){
	config.getProductList(function(err,result){
		res.send(result);
	});	
};
exports.BuildingTypes=function(req,res){
	config.BuildingTypes(function(err,result){
		res.send(result);
	});	
};
exports.BuildingSubTypes=function(req,res){
	config.BuildingSubTypes(function(err,result){
		res.send(result);
	});	
};
exports.Equipment=function(req,res){
	config.Equipment(function(err,result){
		res.send(result);
	});	
};