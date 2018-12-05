"use strict";
var config=require("../config/manager/HomepageManager");


exports.getUsers=function(req,res){
	config.getUsers(function(err,result){
		res.send(result);
	});	
};


exports.getVechicle=function(req,res){	
	config.getVechicle(function(err,result){
		res.send(result);
	});	
};

exports.getUserList=function(req,res){	
	config.getUserList(function(err,result){
		res.send(result);
	});
	
};

exports.getbizUser=function(req,res){
	var v1 = req.params.id;
	config.getbizUser(v1,function(err,result){
		res.send(result);
	});
	
};

exports.getUserBiz=function(req,res){
	var v1 = req.params.id;
	config.getUserBiz(v1,function(err,result){
		res.send(result);
	});
	
};

exports.userlogin=function(req,res){	
	var v1=req.body;
	config.userlogin(v1,function(err,result){
		res.send(result);
	});

};

exports.createUser=function(req,res){
	var v1=req.body;
	config.createUser(v1,function(err,result){
		res.status(200).send("1");
		//res.send(result);
	});

};
exports.insertimage=function(req,res){
	var v2=req.body;
	// var password=req.body.password;
	console.log(v2)
	config.insertimage(v2,function(err,result){
		res.status(200).send("1");
		//res.send(result);
	});

};

exports.userdate=function(req,res){
	// console.lof(req)
	var v1=req.body;
	// var password=req.body.password;
	//console.log("Test  API response");
	config.userdate(v1,function(err,rows){
		//res.send(result);
		//console.log("---------LOG-------------");
		 console.log(rows[0]);
		//console.log(rows[0][0].value);
		var str = rows[0][0].value;
		res.status(200).send(str.toString());
	});

};
exports.createEquip=function(req,res){	
	var v1=req.body;		
	config.createEquip(v1,function(err,rows){
		res.status(200).send("1");
	});

};

exports.uploadImage=function(req,res){	
	config.uploadImage(req,res,function(err,result){		
		res.send("Uploaded Sucessfully");
	});	
};

exports.editUploadImage=function(req,res){	
	config.editUploadImage(req,res,function(err,result){		
		res.send("Uploaded Sucessfully");
	});	
};

exports.publishProduct=function(req,res){	
	var v1=req.body;
	config.publishProduct(v1,function(err,result){
		res.status(200).send("1");
		//res.send(result);
	});
};

exports.hideProduct=function(req,res){	
	var v1=req.body;
	config.hideProduct(v1,function(err,result){
		res.status(200).send("1");
		//res.send(result);
	});
};

exports.multiUploadImage=function(req,res){
	config.multiUploadImage(req,res,function(err,result){
		res.send("Uploaded Sucessfully");
	});

};

exports.getLocation=function(req,res){
	config.getLocation(function(err,result){
		res.send(result);
	});
	
};

exports.getId=function(req,res){
	config.getId(function(err,result){
		res.send(result);
	});
	
};
exports.emailVerify=function(req,res){
	var v1=req.params.id;
	config.emailVerify(v1,function(err,result){
		res.send(result);
	})
}
exports.sendMail=function(req,res){
	
	var v3=req.params.mail;

	console.log(1)
	console.log(v3);
	config.sendMail(v3,function(err,result){
	
		res.send(result);
	});

};
exports.verifyEmail=function(req,res){
	var v1 = req.params.companyid;
	config.verifyEmail(v1,function(err,result){
		res.send(result);
	});
	
};
exports.aflag=function(req,res){
	var v1 = req.params.aflag;
	config.aflag(v1,function(err,result){
		res.send(result);
	});
	
};
exports.changeflag=function(req,res){
	var v1=req.params.id;
	config.changeflag(v1,function(err,result){
		res.status(200).send("1");
	});
	
};

exports.getSecImage=function(req,res){
	var v1 = req.params.id;
	config.getSecImage(v1,function(err,result){
		res.send(result);
	});
	
};