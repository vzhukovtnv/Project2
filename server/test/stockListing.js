require("../models/appSmall")
const stockListing = require("../data/stock") 
stockListing.getOneStock('ABC').then( stock => console.log(stock));