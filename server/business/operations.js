const clientDB = require('../data/client');
const portfolioDB = require('../data/portfolio');
//const stockDB = require("..data/stock");
const settingDB = require('../data/setting')

async function buy(id, symbol, price, amount) {
    // const stock = await stockDB.getOneStock(symbol);
    // if (stock==null){
    //     return {ok:false, message:"Server error - no such stock"};
    // }
    if (price <= 0) {
        return { ok: false, message: "Price is unknown" };
    }
  
    client = await clientDB.getClientById(id)
    company = await settingDB.getSetting()
    if (!client || !company) {
        return { ok: false, message: "Server error - client lost" };
    }

    const delta = Math.round(amount * price + company.commission);
    if (delta > client.balance) {
        return { ok: false, message: "Not enoupgh money to buy this stock" };
    }

    let newBalance = client.balance - delta;
    await clientDB.updateClient(id, { balance: newBalance });
    newBalance = company.balance + company.commission;
    await settingDB.setSetting({ balance: newBalance });
  
    await portfolioDB.add(id, symbol, amount);
    return { ok: true, message: "" };
  
}

async function sell(id, symbol, price, amount) {
    // const stock =await stockDB.getOneStock(symbol);
    // if (stock==null){
    //     return {ok:false, message:"Server error - no such stock"};
    // }
    if (price <= 0) {
        return { ok: false, message: "Price is unknown" };
    }

    client = await clientDB.getClientById(id)
    company = await settingDB.getSetting()

    if (!client || !company) {
        return { ok: false, message: "Server error - client lost" };
    }
    let amountNow = await portfolioDB.getAmount(id, symbol);
    if (amount > amountNow) {
        amount = amountNow;
    }

    const delta = Math.round(amount * price - company.commission);

    let newBalance = client.balance + delta;
    await clientDB.updateClient(id, { balance: newBalance });

    newBalance = company.balance + company.commission;
    await settingDB.setSetting({ balance: newBalance });

    await portfolioDB.takeAway(id, symbol, amount);
    return { ok: true, message: "" };
}


module.exports = {
    buy,
    sell
}