require("../models/appSmall")
const companyInfo = require('../data/companyInformation');
console.log("Start")

companyInfo.getCompanyInformation("AAPL").then(company => console.log("Company=", company)); 


console.log("End")