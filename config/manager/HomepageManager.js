"use strict";
var sql=require("mssql");
var db=require("../db");
var CronJob = require('cron').CronJob;
const multer = require('multer');
const ConnectionPool = require('tedious-connection-pool');
const Request = require('tedious').Request;
var   sql = require('tedious').TYPES;
var nodemailer = require('nodemailer');
var flag;
var com_id;
 var host='localhost';
 var rand=Math.floor((Math.random() * 100) + 54);
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'anandhu92.cse@gmail.com',
      pass: 'malar@123'
    },
    tls: {
        rejectUnauthorized: false
    }
  });

var jsonArray =[];

var poolConfig = {
    min: 1,
    max: 40,
    log: true
};

const config = new ConnectionPool(poolConfig,db);

config.acquire(function (err, connection) {
    if (err) {
        console.error(err);
        return;
    }
    var request = new Request('select 42', function(err, rowCount) {
        if (err) {
            console.error(err);
            return;
        }
        console.log('rowCount: ' + rowCount); 
 //release the connection back to the pool when finished
        connection.release();
    });

    request.on('row', function(columns) {
        console.log('value: ' + columns[0].value);
    });
    connection.execSql(request);

});

      config.on('connect', err => {
          if(err) { 
              console.log('ON',err);              
             }
             else{ 
                 console.log("database connected");                           
              }
     });

     config.on('error',err=>{
         if(err){
            console.log('Error',err);
         }
         else{ 
            console.log("database connected !!!");
       
         }
      });


//  const DIR = 'C:\\inetpub\\wwwroot\\assets\\img';
//  const Secdir = 'C:\\inetpub\\wwwroot\\assets\\img';

const DIR = 'E:\\RAM\\BIZOPSAI\\Backup_Project-26-11\\Backup_Project\\src\\assets\\img'
const Secdir = 'E:\\RAM\\BIZOPSAI\\Backup_Project-26-11\\Backup_Project\\src\\assets\\img';

var up_filename="";
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
        //console.log("filename",req.body.user);
        up_filename=file.fieldname + '-' + Date.now() + '.jpg';
       cb(null,up_filename );
    }
});

let secStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, Secdir);
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + '.jpg');
    }
});

var upload = multer({storage: storage}).single('PrimaryImage');
var secUpload = multer({storage: secStorage}).single('SecondaryImage');


function uploadImage(req,res,cb){  
    config.acquire(function(err,connection){    
        if (err) {
        console.error(err);
        return;
    } 
    
   var path = '';
   var filename='';
   var user='';
   var company_id='';

  
     upload(req,res,function (err) { 
        
         if (err) {             
             console.log(err); 
             cb(null,err);            
         }  
        else{
            
            filename=req.file.filename;
            path=req.file.path;
            user=req.body.user; 
            company_id=req.body.Company_ID;
            console.log(company_id);

            var query = "INSERT INTO IMAGE_MSTR VALUES ('"+ company_id +"','"+ user +"',1,0,'"+ up_filename +"','"+ path +"') " ;  
            console.log(query)  
                 const request = new Request(query, function(err,rowCount,rows) {
                     if (err){  
                         console.log(err)
                       }
                       else{
                        console.log(rows);
                        cb(null,rowCount);
                       } 
                       connection.release();
                     });
                connection.execSql(request); 
        }
    });
    });
}

function multiUploadImage(req,res,cb){  
    config.acquire(function(err,connection){    
        if (err) {
        console.error(err);
        return;
    }     
   var path = '';
   var filename='';
   var user='';
   var company_id='';  
     secUpload(req,res,function (err) {         
         if (err) {             
             console.log(err); 
             cb(null,err);            
         }  
        else{                    
            filename=req.file.filename;
            path=req.file.path;
            user=req.body.user; 
            company_id=req.body.Company_ID;
            console.log(company_id);
            var query = "INSERT INTO IMAGE_SECONDARY VALUES ('"+ company_id +"','"+ user +"',0,1,'"+ filename +"','"+ path +"') " ;  
            console.log(query)  
                 const request = new Request(query, function(err,rowCount,rows) {
                     if (err){  
                         console.log(err)
                       }
                       else{
                        console.log(rows);
                        cb(null,rowCount);
                       } 
                       connection.release();
                     });
                connection.execSql(request); 
        }
    });
    });
}



function editUploadImage(req,res,cb){   
    config.acquire(function(err,connection){    
        if (err) {
        console.error(err);
        return;
    } 
    var path = '';
    var filename='';
    var user='';
    var company_id='';
   
      upload(req,res,function (err) { 
         
          if (err) {             
              console.log(err); 
              cb(null,err);            
          }  
         else{
             
             filename=req.file.filename;
             path=req.file.path;
             user=req.body.user; 
             company_id=req.body.Company_ID;
             console.log(company_id);
 
             var query = " UPDATE IMAGE_MSTR SET IMG_NAME = '"+filename+"',IMG_DIRECTORY = '"+path+"' where COMPANY_ID='"+company_id+"' " ;  
             console.log(query)  
                  const request = new Request(query, function(err,rowCount,rows) {
                      if (err){  
                          console.log(err)
                        }
                        else{
                         console.log(rowCount);
                         cb(null,rowCount);
                        } 
                        connection.release();
                      });
                 connection.execSql(request); 
         }
     });
    });
 }






function getUsers(cb){
    config.acquire(function(err,connection){    
        if (err) {
        console.error(err);
        return;
    } 
    var jsonArray = []; 
    var query="select * from [register]";
    const request = new Request(query, (err,rowCount,rows) => {
       if (err){  
           console.log(err)
         }
         else{
          //console.log(rows);
         // cb(null,JSON.stringify(rows));
         } 
      for(let i=0; i < rowCount; i++)
          {
            var rowObject= {};
            var singleRowData = rows[i];
           for(let j =0; j < singleRowData.length; j++)
          {
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


function getVechicle(cb){       
    config.acquire(function(err,connection){    
        if (err) {
        console.error(err);
        return;
    } 
    var jsonArray = []; 
    var query="SELECT CO.*,AD.*,IMG.IMG_NAME,VE.AFLAG FROM COMPANY_DETAILS CO LEFT JOIN IMAGE_MSTR IMG ON CO.COMPANY_ID=IMG.COMPANY_ID LEFT JOIN VERIFIED VE ON CO.COMPANY_ID=VE.COMPANY_ID LEFT JOIN ADDITIONAL_DETAILS AD ON CO.COMPANY_ID=AD.COMPANY_ID  ORDER BY CO.COMPANY_ID DESC"; 
    const request = new Request(query, (err,rowCount,rows) => {
       if (err){  
           console.log(err)
         }
         else{        
          
      for(let i=0; i < rowCount; i++)
          {
            var rowObject= {};
            var singleRowData = rows[i];
           for(let j =0; j < singleRowData.length; j++)
          {
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
      }
      connection.release();
    });      
  connection.execSql(request);  
});  
}

function getUserList(cb){    
    config.acquire(function(err,connection){    
        if (err) {
        console.error(err);
        return;
    } 
    var jsonArray = []; 
    var query="SELECT * FROM [USER]"; 
    const request = new Request(query, (err,rowCount,rows) => {
       if (err){  
           console.log(err)
         }
         else{        
          
      for(let i=0; i < rowCount; i++)
          {
            var rowObject= {};
            var singleRowData = rows[i];
           for(let j =0; j < singleRowData.length; j++)
          {
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
      }
      connection.release();
    });      
  connection.execSql(request);  
});   
}

function getbizUser(v1,cb) { 
    config.acquire(function(err,connection){    
        if (err) {
        console.error(err);
        return;
    } 
    console.log(v1);
    var jsonArray = [];
    var query = "SELECT * FROM [COMPANY_DETAILS] WHERE USER_ID='"+v1+"'"; 
 
    const request = new Request(query, (err,rowCount,rows) => {
       if (err){  
           console.log(err)
         }
         else{
        
         } 
      for(let i=0; i < rowCount; i++)
          {
            var rowObject= {};
            var singleRowData = rows[i];
           for(let j =0; j < singleRowData.length; j++)
          {
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
        else{
            cb(null,[{"status":"No Data Found"}]);
        }
        connection.release();
    });      
  connection.execSql(request); 
});
 }

 function getUserBiz(v1,cb) { 
    config.acquire(function(err,connection){    
        if (err) {
        console.error(err);
        return;
    } 
    console.log(v1);
    var jsonArray = [];
   // var query = "SELECT CO.*,AD.* FROM COMPANY_DETAILS CO LEFT JOIN ADDITIONAL_DETAILS AD ON CO.COMPANY_ID=AD.COMPANY_ID WHERE CO.COMPANY_ID='"+v1+"'"; 
    var query = 'SP_GetDetailsByComid';
    const request = new Request(query, (err,rowCount,rows) => {
       if (err){ console.log(err) }
       else{ } 
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
            cb(null,jsonArray);
        }
        else{
            cb(null,[{"status":"No Data Found"}]);
        }
        connection.release();
    });
    request.addParameter('COMPANY_ID', sql.Int, v1);        
 // connection.execSql(request); 
    connection.callProcedure(request); 
});
 }



function userlogin(v1,cb) { 
    config.acquire(function(err,connection){    
        if (err) {
        console.error(err);
        return;
    } 
    console.log(v1);
    var jsonArray = [];
    var query = "SELECT * FROM [USER] WHERE USER_EMAIL='"+v1.Email+"' AND USER_PASSWORD='"+v1.Password+"'"; 
 
    const request = new Request(query, (err,rowCount,rows) => {
       if (err){  
           console.log(err)
         }
         else{
        
         } 
      for(let i=0; i < rowCount; i++)
          {
            var rowObject= {};
            var singleRowData = rows[i];
           for(let j =0; j < singleRowData.length; j++)
          {
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
        else{
            cb(null,[{"status":"Credential Failed"}]);
        }
        connection.release();
    });      
  connection.execSql(request); 
});
 }


function createUser(v1,cb) {
    config.acquire(function(err,connection){    
        if (err) {
        console.error(err);
        return;
    } 
    var query = "SP_CreateUser";
    console.log(v1);
    const request = new Request(query, (err,rowCount,rows) => {
        if (err){  
            console.log(err);
          }
          else{
         cb(null,rowCount);
            } 
            connection.release();
        }); 
        request.addParameter('FIRSTNAME', sql.VarChar, v1.FirstName);  
        request.addParameter('EMAIL', sql.VarChar, v1.Email);  
        request.addParameter('PASSWORD', sql.VarChar, v1.Password);  

    connection.callProcedure(request);
    });
   
}


function userdate(v1,cb) {
    config.acquire(function(err,connection){    
        if (err) {
        console.error(err);
        return;
    } 
    var query = "SP_CreateSeller";
    const request = new Request(query, (err,rowCount,rows) => {
        if (err){  
            console.log(err);
          }
          else{
            //   console.log(rowCount,rows[0]);
             cb(null,rows);
       
            } 
            connection.release();
        });    
          
        request.addParameter('COMPANY_ID', sql.Int, v1.CompanyId);
        request.addParameter('USER_ID', sql.Int, v1.userId);
        request.addParameter('TITLE', sql.VarChar, v1.Title);
        request.addParameter('STATE', sql.VarChar, v1.State);
        request.addParameter('COUNTY', sql.VarChar, v1.County);
        request.addParameter('PRICE', sql.VarChar, v1.Price);
        request.addParameter('LONG_DESC', sql.VarChar, v1.Description);
        request.addParameter('FLAG', sql.Int, v1.Flag); 
        request.addParameter('CATEGORY',sql.VarChar,v1.Category);
        request.addParameter('SUBCATEGORY',sql.VarChar,v1.SubCategory);
        request.addParameter('SUBCHILD',sql.VarChar,v1.SubChildCategory);
        request.addParameter('COMPANY_TYPE',sql.VarChar,v1.CmpType);
        request.addParameter('COMPANY_STATUS',sql.VarChar,'-');
        request.addParameter('EMPLOYEE_COUNT',sql.VarChar,v1.EmpCount); 
        request.addParameter('YOUTUBE',sql.VarChar,v1.YoutubeUrl); 
        request.addParameter('LATITUDE',sql.VarChar,v1.Latitude); 
        request.addParameter('LONGITUDE',sql.VarChar,v1.Longitude);
        request.addParameter('ADDRESS',sql.VarChar,v1.Address); 
        request.addParameter('REVENUE', sql.VarChar, v1.Revenue);
        request.addParameter('CASHFLOW', sql.VarChar, v1.CashFlow);
        request.addParameter('ZIPCODE',sql.VarChar,v1.ZipCode); 
        
        request.addParameter('CUSTOMER',sql.VarChar,'-'); 
        request.addParameter('EMPLOYEE',sql.VarChar,'-'); 
        request.addParameter('PROPERTY',sql.VarChar,'-'); 
        request.addParameter('CUSTOMER_URL',sql.VarChar,'-'); 
        request.addParameter('EMPLOYEE_URL',sql.VarChar,'-'); 
        request.addParameter('PROPERTY_URL',sql.VarChar,'-');

        request.addParameter('BUILDING_TYPE',sql.VarChar,v1.BuildingType);
        request.addParameter('BUILDING_SUBTYPE',sql.VarChar,v1.BuildingSubTypes);

        request.addParameter('BUILDING_SIZE',sql.BigInt,v1.BuildingSize);
        request.addParameter('PRE_SIZE',sql.BigInt,v1.totalAreaSize);
        request.addParameter('RENT',sql.BigInt,v1.rentDetail);
        request.addParameter('INDUSTRY_SPECIFIC',sql.VarChar,v1.industryDetail);
        request.addParameter('ZONING',sql.VarChar,v1.zoningDetail);
        request.addParameter('ANNUAL_REVENUE',sql.VarChar,v1.Revenue);
        request.addParameter('CASH_FLOW',sql.VarChar,v1.CashFlow);
        request.addParameter('EXPENSE',sql.VarChar,v1.Expense);
        request.addParameter('EQUIPMENT_NAME',sql.VarChar,v1.Equipment);
        request.addParameter('ACCOUNTANT',sql.VarChar,v1.accountant);
        request.addParameter('ATTORNEY',sql.VarChar,v1.attorney);
        request.addParameter('BUSINESS_BROKER',sql.VarChar,v1.bussinessBrokerDetails);
        

    connection.callProcedure(request);
    });
}

function createEquip(v1,cb) {  

    var value= v1.values[0];
    for(var i=0;i<value.length;i++){    
    config.acquire(function(err,connection){    
        if (err) {
        console.error(err);
        return;
    } 
   console.log("-----------------------");        
    var query = "INSERT INTO Equipment_Details VALUES ('"+v1.comp_id+"','"+ value[i].name+"','"+ value[i].value +"') ";
    
    console.log(v1.values[0]);
    console.log(query)  
    const request = new Request(query, function(err,rowCount,rows) {
        if (err){  
            console.log(err)
          }
          else{
           console.log(rows);
         
          } 
          connection.release();
        });
   connection.execSql(request); 
 
   
    });
}
    cb(null,'success');
}
function getLocation(cb){
    var query="select distinct Location from demo";
    console.log(query)
    config.query(query,function(err,result){
        if(err){

            cb(err,null);

        }else{
            cb(null,result);
        }
    });
}


function getId(cb){
    config.acquire(function(err,connection){    
        if (err) {
        console.error(err);
        return;
    } 
    var jsonArray = []; 
    var query="SELECT IMG_NAME FROM IMAGE_MSTR WHERE PRIMARY_IMAGE=1"; 
    const request = new Request(query, (err,rowCount,rows) => {
       if (err){  
           console.log(err)
         }
         else{
            
         } 
      for(let i=0; i < rowCount; i++)
          {
            var rowObject= {};
            var singleRowData = rows[i];
           for(let j =0; j < singleRowData.length; j++)
          {
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

function getSecImage(v1,cb){
    config.acquire(function(err,connection){    
        if (err) {
        console.error(err);
        return;
    } 
    var jsonArray = []; 
    var query="SELECT IMG_NAME FROM IMAGE_SECONDARY WHERE COMPANY_ID='"+v1+"'"; 
    const request = new Request(query, (err,rowCount,rows) => {
       if (err){  
           console.log(err)
         }
         else{
            
         } 
      for(let i=0; i < rowCount; i++)
          {
            var rowObject= {};
            var singleRowData = rows[i];
           for(let j =0; j < singleRowData.length; j++)
          {
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

function publishProduct(v1,cb) {   
    config.acquire(function(err,connection){    
        if (err) {
        console.error(err);
        return;
    } 
    var query = "UPDATE COMPANY_DETAILS SET PUBLISHED = 1 WHERE COMPANY_ID='"+v1.com_id+"'";  
    const request = new Request(query, (err,rowCount,rows) => {
       if (err){  
           console.log(err)
         }
         else{
            cb(null,rowCount);
         } 
         connection.release();       
     });  

  connection.execSql(request); 
    });
 }



 function hideProduct(v1,cb) {    
    config.acquire(function(err,connection){    
        if (err) {
        console.error(err);
        return;
    } 
    var query = "UPDATE COMPANY_DETAILS SET PUBLISHED = 0 WHERE COMPANY_ID='"+v1.com_id+"'";  
    const request = new Request(query, (err,rowCount,rows) => {
       if (err){  
           console.log(err)
         }
         else{
            cb(null,rowCount);
         } 
         connection.release();       
     });  

  connection.execSql(request); 
    });
 }
 function sendMail(v3,cb){
    
    console.log(com_id)
    console.log(flag)
    
   
    var link="http://"+host+":4200/viewcomponent?com_id="+com_id;
    console.log(link)
     var mailOptions={
     to :v3,
     subject : "Please confirm your Email account",
     html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"	
     }
    console.log(v3)
    console.log("a='"+v3+"'");
  
    transporter.sendMail(mailOptions, function(error, response){
     if(error){
        console.log(error);
    //     var msg="error";
    //     cb(null,msg)
    // // res.end("error");
     }else{

       console.log("Message sent: " + response);
    //     var msg="sent";
    // // res.end("sent");
    // cb(null,msg);
    }
    });
   
}
// function emailVerify(v1,cb){
//   var link1="http://"+host+":3010/api/verify/"+rand;
//     if(("http://"+host)==("http://"+host))
//     {
//       console.log("Domain is matched. Information is from Authentic email");
//       if(v1==rand) 
//       {
//         console.log("email is verified");
//         cb(null,"Email is  Successfully verified");
//         cb(null,v1)
//       }
//       else
//       {
//         console.log("email is not verified");
//         cb(null,"Bad Request");
//       }
//     }
//     else
//     {
//       cb(null,"Request is from unknown source");
//     }
    

// };
function verifyEmail(v1,cb){
   com_id=v1;
   console.log(v1);
}
function aflag(v1,cb){
    flag=v1;
    console.log(v1);
    
}
 function changeflag(v1,cb){
//     var jsonArray = []; 
//     console.log(v1);
//     var query="UPDATE USER_NEW SET aflag = 1 where ID='"+v1+"'"; 
//     console.log(query)
//     const request = new Request(query, (err,rowCount,rows) => {
//        if (err){  
//            console.log(err)
//          }
//          else{
//               cb(null,rowCount)
//          } 
    
//     });      
//   connection.execSql(request); 
config.acquire(function(err,connection){    
    if (err) {
    console.error(err);
    return;
} 
var query = "UPDATE USER_NEW SET aflag = 1 where ID='"+v1+"'";  
const request = new Request(query, (err,rowCount,rows) => {
   if (err){  
       console.log(err)
     }
     else{
        cb(null,rowCount);
     } 
     connection.release();       
 });  

connection.execSql(request); 
});
 }
module.exports={
    getUsers:getUsers,
    getVechicle:getVechicle,
    userlogin:userlogin,
    userdate:userdate,
    getLocation:getLocation,
    getId:getId,
    createUser:createUser,
    uploadImage:uploadImage,
    multiUploadImage:multiUploadImage,    
    getbizUser:getbizUser,
    getUserBiz:getUserBiz,
    editUploadImage:editUploadImage,
    publishProduct:publishProduct,
    hideProduct:hideProduct,
    getUserList:getUserList,
    sendMail:sendMail,
    verifyEmail:verifyEmail,
    aflag:aflag,
    changeflag:changeflag,
    getSecImage:getSecImage,
    createEquip:createEquip
};
