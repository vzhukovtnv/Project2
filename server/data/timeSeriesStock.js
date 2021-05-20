const fetch = require('node-fetch');
const alphaKey  = require("./alphaKey")

//const INTERVAL = "1min"; //5min, 15min, 30min, 60min

async function getStockSeries(func, symbol, outputsize){
    
    const url = `https://www.alphavantage.co/query?function=${func}&symbol=${symbol}&outputsize=${outputsize}` + await alphaKey.getAlphaKey();
    //console.log(url);
    try {
        let responce = await fetch(url);
        if ( responce.ok){
            return await responce.json();
        }               
    } catch (error) {
        console.error(error);
    }
    return {};
}

async function intradayStocks(symbol, fullSize = false){
    outputsize = fullSize ? "full"  : "compact";
    return getStockSeries("TIME_SERIES_INTRADAY", symbol, outputsize)
}

module.exports = {
    intradayStocks
}