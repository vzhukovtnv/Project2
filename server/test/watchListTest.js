const mongoose = require('mongoose');
require("../models/appSmall")
const watchDB = require("../data/watchList");

clientId =mongoose.Types.ObjectId("60aa9e5fb4872e39cc831145");
console.log("Start")
let watch1 = {
    client :clientId,
    symbol:"AMD"
  };

  let watch2 = {
    client : clientId,
    symbol:"INTC"
  };
  watchDB.add(clientId,"CNQ").then((c) => console.log(c));
 
  // watchDB.add(clientId,"CNQ").then((c) => console.log(c));
 //watchDB.takeAway(clientId,"CNQ").then((c) => console.log(c));
  //watchDB.watchListModel.create(watch1);
  //watchDB.watchListModel.create(watch2);

  //watchDB.getWatchList(clientId).then((c) => console.log(c));