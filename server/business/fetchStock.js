const portfolioDB = require('../data/portfolio');
const watchListDB = require('../data/watchList');
const clientDB = require('../data/client');
const companyDB = require('../data/companyInformation');

const timeStock = require('../data/timeSeriesStock');

async function fetchStock(id, isFullData = false) {
    const watchList = await watchListDB.getWatchList(id);
    const portfolio = await portfolioDB.getPortfolio(id);
    const client = await clientDB.getClientById(id);
 //   console.log("fetchStock - Start");
    if (!client) {
        return null;
    }

    const unitedList = combineLists(portfolio, watchList);

    const fullData = [];
    const lastData = []
    const portfolioArray = [];
    const balance = client.balance;
    let totalSum = 0.0
   
    for (const val of unitedList) {
        const stockAll = await timeStock.intradayStocks(val.symbol, false);
        property = getPropertyName(stockAll, 1)
        const amount = getNumberOfStocs(portfolio, val.symbol);

        let lastDataElement = {};
        lastDataElement.symbol = val.symbol;
        lastDataElement.amount = amount;
        lastDataElement.balance = balance;

        const stock = stockAll[property];
        const dataExists = Object.keys(stock).length > 0;
        
   
        if (dataExists) {
            const lastDate = getPropertyName(stock, 0);
            lastDataElement.lastDate = lastDate;
            lastDataElement.open = parseFloat(stock[lastDate]["1. open"]);
            lastDataElement.high = parseFloat(stock[lastDate]["2. high"]);
            lastDataElement.low = parseFloat(stock[lastDate]["3. low"]);
            lastDataElement.close = parseFloat(stock[lastDate]["4. close"]);
            lastDataElement.volume = parseInt(stock[lastDate]["5. volume"]);
        }
   
        if (val.watch) {
            const company = await companyDB.getCompanyInformation(val.symbol)
   
            lastDataElement.name = company.Name;
            lastDataElement.sector = company.Sector;
            lastDataElement.industry = company.Industry;
            lastDataElement.exchange = company.Exchange;

            lastData.push(lastDataElement);
            if (isFullData && dataExists) {
                let symbalArray = [];
                for (const property in stock) {
                    const el = { dateS: property, close: parseFloat(stock[property]["4. close"]) };
                    symbalArray.push(el);
                }
                fullData.push({ symbol: val.symbol, data: symbalArray })
            }
        }
   
        if (val.port) {
            let portfolioElement = { symbol: val.symbol, amount}
            if (dataExists){
                const price = lastDataElement.close;
                const stSum = amount * price;
                portfolioElement.price = price;
                totalSum += stSum;
            }  
            portfolioArray.push(portfolioElement);
        }
    }
   // console.log("fetchStock - 5");
    totalSum += balance;
    const portfolioObj = { balance, totalSum, portfolioArray }
    const resultOj = { portfolioObj, lastData };
    if (isFullData) {
        resultOj.fullData = fullData;
    }
  //  console.log("fetchStock - End");

    return resultOj;
}

function combineLists(port, watch) {
    let uni = [];
    for (const val of port) {
        uni.push({ symbol: val.symbol, port: true, watch: false })
    }
    for (const val of watch) {
        const index = uni.findIndex((u, index) => { return u.symbol === val.symbol });
        if (index >= 0) {
            uni[index].watch = true;
        } else {
            uni.push({ symbol: val.symbol, port: false, watch: true })
        }
    }
    return uni;
}

function getPropertyName(obj, n) {
    let cnt = 0
    for (const property in obj) {
        if (cnt == n) {
            return property;
        }
        cnt++;
    }
    return "";
}

function getNumberOfStocs(portfolio, symbol) {
    for (const val of portfolio) {
        if (val.symbol == symbol) {
            return val.amount;
        }
    }
    return 0;
}

module.exports = {
    fetchStock
}