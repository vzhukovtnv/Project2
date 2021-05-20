require("../models/appSmall")
const settingsDB = require("../data/setting");

console.log("Start")
let setting = {
    name:   "Project2 brocker company",
    key:    "3PRM4UE4KPUFCKVB",
    interval:"5min",
    comission: 10
  };

//1min, 5min, 15min, 30min, 60min


//settingsDB.setSetting(setting).then((c) => console.log("set: ", c));
settingsDB.getSetting().then((c) => console.log("get: ", c));
settingsDB.transferMoney(10).then((c) => console.log("transfer:",c));
//
console.log("End")

