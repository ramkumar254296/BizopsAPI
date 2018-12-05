"use strict";

var  db = require("../db");
const multer = require('multer');
const ConnectionPool = require('tedious-connection-pool');
const Request = require('tedious').Request;
const   sql = require('tedious').TYPES;

var poolConfig = {
    min: 1,
    max: 40,
    log: true
};

const config = new ConnectionPool(poolConfig,db);

config.on('connect', err => {
    if(err) { 
        console.log('ON',err);              
       }
       else{ 
           console.log("database connected");                           
        }
});

function getCategory(cb){
    config.acquire(function(err,connection){    
        if (err) {
        console.error(err);
        return;
    } 
    var jsonArray = []; 
    var query="select * from category";
    const request = new Request(query, (err,rowCount,rows) => {
       if (err){  
           console.log(err)
         }
         else{
         
         } 
      for(let i=0; i < rowCount; i++){
            var rowObject= {};
            var singleRowData = rows[i];
            for(let j =0; j < singleRowData.length; j++){
                var tempColName = singleRowData[j].metadata.colName;
                var tempColData = singleRowData[j].value;
                rowObject[tempColName] = tempColData;
             }
            jsonArray.push(rowObject);
        } 
         
        if(jsonArray.length>0){
            console.log(jsonArray);
            cb(null,jsonArray);
         }
        connection.release();
      });
      connection.execSql(request); 
   });
 }function getSubCategory(cb){
    config.acquire(function(err,connection){    
        if (err) {
        console.error(err);
        return;
    } 
    var jsonArray = []; 
    var query="select * from sub_category";
    const request = new Request(query, (err,rowCount,rows) => {
       if (err){  
           console.log(err)
         }
         else{
         
         } 
      for(let i=0; i < rowCount; i++){
            var rowObject= {};
            var singleRowData = rows[i];
            for(let j =0; j < singleRowData.length; j++){
                var tempColName = singleRowData[j].metadata.colName;
                var tempColData = singleRowData[j].value;
                rowObject[tempColName] = tempColData;
             }
            jsonArray.push(rowObject);
        } 
         
        if(jsonArray.length>0){
            console.log(jsonArray);
            cb(null,jsonArray);
         }
        connection.release();
      });
      connection.execSql(request); 
   });
 }

 function getSubchildCategory(cb){
    config.acquire(function(err,connection){    
        if (err) {
        console.error(err);
        return;
    } 
    var jsonArray = []; 
    var query="select * from sub2_category";
    const request = new Request(query, (err,rowCount,rows) => {
       if (err){  
           console.log(err)
         }
         else{
         
         } 
      for(let i=0; i < rowCount; i++){
            var rowObject= {};
            var singleRowData = rows[i];
            for(let j =0; j < singleRowData.length; j++){
                var tempColName = singleRowData[j].metadata.colName;
                var tempColData = singleRowData[j].value;
                rowObject[tempColName] = tempColData;
             }
            jsonArray.push(rowObject);
        } 
         
        if(jsonArray.length>0){
            console.log(jsonArray);
            cb(null,jsonArray);
         }
        connection.release();
      });
      connection.execSql(request); 
   });
 }

 function getState(cb){
    config.acquire(function(err,connection){    
        if (err) {
        console.error(err);
        return;
    } 
    var jsonArray = []; 
    var query="select * from [states]";
    const request = new Request(query, (err,rowCount,rows) => {
       if (err){  
           console.log(err)
         }
         else{
         
         } 
      for(let i=0; i < rowCount; i++){
            var rowObject= {};
            var singleRowData = rows[i];
            for(let j =0; j < singleRowData.length; j++){
                var tempColName = singleRowData[j].metadata.colName;
                var tempColData = singleRowData[j].value;
                rowObject[tempColName] = tempColData;
             }
            jsonArray.push(rowObject);
        } 
         
        if(jsonArray.length>0){
            console.log(jsonArray);
            cb(null,jsonArray);
         }
        connection.release();
      });
      connection.execSql(request); 
   });
 }

 function getCounty(cb){
    config.acquire(function(err,connection){    
        if (err) {
        console.error(err);
        return;
    } 
    var jsonArray = []; 
    var query="select * from [cities]";
    const request = new Request(query, (err,rowCount,rows) => {
       if (err){  
           console.log(err)
         }
         else{
         
         } 
      for(let i=0; i < rowCount; i++){
            var rowObject= {};
            var singleRowData = rows[i];
            for(let j =0; j < singleRowData.length; j++){
                var tempColName = singleRowData[j].metadata.colName;
                var tempColData = singleRowData[j].value;
                rowObject[tempColName] = tempColData;
             }
            jsonArray.push(rowObject);
        } 
         
        if(jsonArray.length>0){
            console.log(jsonArray);
            cb(null,jsonArray);
         }
        connection.release();
      });
      connection.execSql(request); 
   });
 }

 function getProductList(cb){
    config.acquire(function(err,connection){    
        if (err) {
        console.error(err);
        return;
    } 
    var jsonArray = []; 
    var query="SELECT CO.*,IMG.IMG_NAME,VE.AFLAG FROM COMPANY_DETAILS CO LEFT JOIN IMAGE_MSTR IMG ON CO.COMPANY_ID=IMG.COMPANY_ID LEFT JOIN VERIFIED VE ON CO.COMPANY_ID=VE.COMPANY_ID WHERE CO.PUBLISHED=1 ORDER BY CO.COMPANY_ID DESC";
    const request = new Request(query, (err,rowCount,rows) => {
       if (err){  
           console.log(err)
         }
         else{
         
         } 
      for(let i=0; i < rowCount; i++){
            var rowObject= {};
            var singleRowData = rows[i];
            for(let j =0; j < singleRowData.length; j++){
                var tempColName = singleRowData[j].metadata.colName;
                var tempColData = singleRowData[j].value;
                rowObject[tempColName] = tempColData;
             }
            jsonArray.push(rowObject);
        } 
         
        if(jsonArray.length>0){
            console.log(jsonArray);
            cb(null,jsonArray);
         }
        connection.release();
      });
      connection.execSql(request); 
   });
 }
 function getState(cb){
    config.acquire(function(err,connection){    
        if (err) {
        console.error(err);
        return;
    } 
    var jsonArray = []; 
    var query="select * from [states]";
    const request = new Request(query, (err,rowCount,rows) => {
       if (err){  
           console.log(err)
         }
         else{
         
         } 
      for(let i=0; i < rowCount; i++){
            var rowObject= {};
            var singleRowData = rows[i];
            for(let j =0; j < singleRowData.length; j++){
                var tempColName = singleRowData[j].metadata.colName;
                var tempColData = singleRowData[j].value;
                rowObject[tempColName] = tempColData;
             }
            jsonArray.push(rowObject);
        } 
         
        if(jsonArray.length>0){
            console.log(jsonArray);
            cb(null,jsonArray);
         }
        connection.release();
      });
      connection.execSql(request); 
   });
 }
 function BuildingTypes(cb){
    config.acquire(function(err,connection){    
        if (err) {
        console.error(err);
        return;
    } 
    var jsonArray = []; 
    var query="select * from [BUILDING_TYPES]";
    const request = new Request(query, (err,rowCount,rows) => {
       if (err){  
           console.log(err)
         }
         else{
         
         } 
      for(let i=0; i < rowCount; i++){
            var rowObject= {};
            var singleRowData = rows[i];
            for(let j =0; j < singleRowData.length; j++){
                var tempColName = singleRowData[j].metadata.colName;
                var tempColData = singleRowData[j].value;
                rowObject[tempColName] = tempColData;
             }
            jsonArray.push(rowObject);
        } 
         
        if(jsonArray.length>0){
            console.log(jsonArray);
            cb(null,jsonArray);
         }
        connection.release();
      });
      connection.execSql(request); 
   });
 }
 function BuildingSubTypes(cb){
    config.acquire(function(err,connection){    
        if (err) {
        console.error(err);
        return;
    } 
    var jsonArray = []; 
    var query="select * from [BUILDING_SUBTYPES]";
    const request = new Request(query, (err,rowCount,rows) => {
       if (err){  
           console.log(err)
         }
         else{
         
         } 
      for(let i=0; i < rowCount; i++){
            var rowObject= {};
            var singleRowData = rows[i];
            for(let j =0; j < singleRowData.length; j++){
                var tempColName = singleRowData[j].metadata.colName;
                var tempColData = singleRowData[j].value;
                rowObject[tempColName] = tempColData;
             }
            jsonArray.push(rowObject);
        } 
         
        if(jsonArray.length>0){
            console.log(jsonArray);
            cb(null,jsonArray);
         }
        connection.release();
      });
      connection.execSql(request); 
   });
 }
 function Equipment(cb){
    config.acquire(function(err,connection){    
        if (err) {
        console.error(err);
        return;
    } 
    var jsonArray = []; 
    var query="select * from Equipment_Details";
    const request = new Request(query, (err,rowCount,rows) => {
       if (err){  
           console.log(err)
         }
         else{
         
         } 
      for(let i=0; i < rowCount; i++){
            var rowObject= {};
            var singleRowData = rows[i];
            for(let j =0; j < singleRowData.length; j++){
                var tempColName = singleRowData[j].metadata.colName;
                var tempColData = singleRowData[j].value;
                rowObject[tempColName] = tempColData;
             }
            jsonArray.push(rowObject);
        } 
         
        if(jsonArray.length>0){
            console.log(jsonArray);
            cb(null,jsonArray);
         }
        connection.release();
      });
      connection.execSql(request); 
   });
 }
 module.exports={
   
    getCategory : getCategory,
    getSubCategory : getSubCategory,
    getSubchildCategory : getSubchildCategory,
    getState : getState,
    getCounty : getCounty,
    getProductList : getProductList,
    BuildingTypes:BuildingTypes,
    BuildingSubTypes:BuildingSubTypes,
    Equipment:Equipment
}; 

