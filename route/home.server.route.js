"use strict";
module.exports=function(app){
var homepage=require("../controller/home.server.controller");

app.get("/api/home/getCategory",homepage.getCategory);
app.get("/api/home/getSubCategory",homepage.getSubCategory);
app.get("/api/home/getSubchildCategory",homepage.getSubchildCategory);
app.get("/api/home/getState",homepage.getState);
app.get("/api/home/getCounty",homepage.getCounty);
app.get("/api/home/getProduct",homepage.getProductList);
app.get("/api/home/getBuildingTypes",homepage.BuildingTypes);
app.get("/api/home/getBuildingSubTypes",homepage.BuildingSubTypes);
app.get("/api/home/getEquip",homepage.Equipment);
};