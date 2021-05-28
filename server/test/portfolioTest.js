const mongoose = require('mongoose');
require("../models/appSmall")
const portfolioDB = require("../data/portfolio");

clientId =mongoose.Types.ObjectId("60aab2a2b4296b30c891bd3f");

console.log("Start")
let port1 = {
    client :clientId,
    symbol:"AMD",
    amount:100
  };

  let port2 = {
    client : clientId,
    symbol:"AAPL",
    amount:200
  };

  //portfolioDB.portfolioModel.create(port1).then((c) => console.log(c));
  //portfolioDB.portfolioModel.create(port2);
  
  //portfolioDB.add(clientId,"ZZZ",20).then((c)=> console.log(c));
    //portfolioDB.takeAway(clientId,"ZZZ",15).then((c)=> console.log(c));
    portfolioDB.getAmount(clientId,"ZZZ").then((c)=> console.log(c));