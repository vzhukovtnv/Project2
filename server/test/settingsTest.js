require("../models/appSmall")
const settingDB = require("../data/setting");

console.log("Start")
let setting = {
    name:   "Project2 brocker company",
    key:    "3PRM4UE4KPUFCKVB",
    interval:"5min",
    commission: 10
  };

//1min, 5min, 15min, 30min, 60min


//settingsDB.setSetting(setting).then((c) => console.log("set: ", c));
settingDB.getSetting().then((c) => console.log("get: ", c));
settingDB.transferMoney(10).then((c) => console.log("transfer:",c));
//
console.log("End")

