const settingDB = require("../data/setting");
let setting =  settingDB.getSetting().then((c) => {
    return c;});

  
 async function tt()
 {
   return setting.then(t => {return t;});
 }   

 function pp(name)
 {
   return setting.then(t => {return t[name];});
 }   


// export default await settingDB;

module.exports = {
  setting,
  tt, pp
}        
