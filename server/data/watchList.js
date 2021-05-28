const mongoose = require('mongoose');

require('./db')
const stockDB = require("./stock");

const Schema = mongoose.Schema;

const watchListSchema = new Schema({
    client: mongoose.ObjectId,
    symbol: String
});

const watchListModel = mongoose.model('WatchList', watchListSchema, 'watchLists')

async function getWatchList(id){
    return watchListModel.find({client:id});
}

async function add(id, symbol){
    const stock =await stockDB.getOneStock(symbol);
    if (stock==null){
        return null;
    }
   
    result = await watchListModel.findOne({client:id,symbol} );
    if (result !=null) {
        return result;
    }   
    return watchListModel.create({client:id, symbol});
}

async function takeAway(id, symbol){
    return watchListModel.deleteMany({client:id, symbol});
}


module.exports = {
    watchListModel,
    getWatchList,
    add,
    takeAway
}