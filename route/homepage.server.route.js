"use strict";
module.exports=function(app){
var homepage=require("../controller/homepage.server.controller");

app.get("/api/homepage/user",homepage.getUsers);
app.get("/api/getBiz",homepage.getVechicle);
app.get("/api/getBiz/:id",homepage.getbizUser);
app.get("/api/getUserBiz/:id",homepage.getUserBiz);
app.get("/api/getUserlist",homepage.getUserList);
app.get("/api/getImage/:id",homepage.getSecImage);


app.post("/api/createUser",homepage.createUser);
app.post("/api/insertimage",homepage.insertimage);
app.post("/api/login",homepage.userlogin);
app.post("/api/createBiz",homepage.userdate);
app.post("/api/createEquip",homepage.createEquip);
app.post("/api/upload",homepage.uploadImage);
app.post("/api/upload/edit",homepage.editUploadImage);
app.post("/api/upload/multi",homepage.multiUploadImage);

app.put("/api/publishProduct",homepage.publishProduct);
app.put("/api/hideProduct",homepage.hideProduct);
app.get("/api/homepage/location",homepage.getLocation);


app.get("/api/verify/:id",homepage.emailVerify);
app.get("/api/mail/:mail",homepage.sendMail);
app.get("/api/verifyEmail/:companyid",homepage.verifyEmail);
app.get("/api/flag/:aflag",homepage.aflag);
app.get("/api/flagid/:id",homepage.changeflag);

};