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
    return {ok:"abc"};
    const stock =await stockDB.getOneStock(symbol);
    if (stock==null){
        return false;
    }
   
    result = await watchListModel.findOne({client:id,symbol} );
    if (result !=null) {
        return false;
    }   
    return await watchListModel.create({client:id, symbol}) !=null;
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