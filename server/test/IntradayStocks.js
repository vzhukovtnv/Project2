require("../models/appSmall")
const stocks = require('../data/timeSeriesStock');
console.log("Start")
//stocksDB.checkIfCollectionExists("tt").then((t) => {console.log(t)});
// stocksDB.tryToFindCompanyInformation('ABC').then(company => {
//     console.log("company=",company);
// })

stocks.intradayStocks("AMD").then(stocks => console.log("stocks=", stocks)); 
console.log("End")