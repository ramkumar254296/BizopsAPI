  "use strict";
// module.exports={	
//     user: 'sa',
//     password: 'sql',
//     server: 'DESKTOP-68OF7RJ', 
//     database: 'Bizopsai'
// };

//var config = 
module.exports={ 
     userName: 'bizops_user', // update me
     password: 'Bizsql707', // update me
     server: 'bizopsdev.database.windows.net', // update me
     options: 
        {
           database: 'Bizopsai' //update me
           , encrypt: true,
           rowCollectionOnRequestCompletion: true
        }
   };