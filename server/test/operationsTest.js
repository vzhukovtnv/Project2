
require("../models/appSmall")
const operations = require('../business/operations');

const id = '60aab2a2b4296b30c891bd3f';
console.log("start");

//operations.buy(id,"IBM", 5 ,1).then((c) => console.log(c)) ;
//operations.sell(id,"AAPL", 10 ,100).then((c) => console.log(c)) ;
operations.buy(id,"AAPL", 0 ,100).then((c) => console.log(c)) ;