const mongoose = require('mongoose');
const fetch = require('node-fetch');

const alphaKey  = require("./alphaKey")
require('./db')

const Schema = mongoose.Schema;

const companyInformationSchema = new Schema({
  Symbol: {
    type: String,
    required: true,
    index:{ unique: false}
  },
    Name: String,
    Description: String,
    Exchange: String,
    Currency: String,
    Country: String,
    Sector: String, 
    Industry: String,
    FullTimeEmployees: Number,
    MarketCapitalization: Number
});

const companyInformationModel = mongoose.model('Company', companyInformationSchema, 'companies');

async function getCompanyInformation(symbol) {
    let company = null;
    try {
        company = await companyInformationModel.findOne({ Symbol:symbol})       
    } catch (error) {
        console.error("err=", err)
    }
       
    if (company) {
         //console.log("from db");
         return  company;
    }
    
    //console.log("load from alpha");
    company = await getCompanyInformationAlpha(symbol);
    if (Object.keys(company).length > 0 ){
        await saveCompanyInformation(company);
    }
    return company;
}

async function saveCompanyInformation(company) {
    return  companyInformationModel.create(company);
  }

async function getCompanyInformationAlpha(symbol){
    let url = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=" + symbol +"&apikey=" + alphaKey.getAlphaKey();
    try {
        let responce = await fetch(url);
        if ( responce.ok){
            const c = await responce.json();
            const  { Symbol,Name, Description,Exchange, Currency, Country, Sector, Industry, FullTimeEmployees, MarketCapitalization} = c;
            return { Symbol,Name, Description,Exchange, Currency, Country, Sector, Industry, FullTimeEmployees, MarketCapitalization} ;
        }               
    } catch (error) {
        console.error(error);
    }
    return {};
}


module.exports = {
    getCompanyInformation
}