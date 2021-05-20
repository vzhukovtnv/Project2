const mongoose = require('mongoose');

require('./db')

const Schema = mongoose.Schema;

const settingsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    interval:{
        type: String,
        enum: ["1min", "5min", "15min", "30min", "60min"],
        required: true
    },
    comission:{
        type: Number,
        required: true
    },
    balance: Number
});

const settingsModel = mongoose.model('Setting', settingsSchema, 'Settings');

async function getSetting(){ 
    let settings = null;
    try {
        settings = settingsModel.findOne({}).exec();
    } catch (err) {
        //console.error("err=", err)
    }
    return await settings;
}

async function setSetting(newSettings) {
    let settings = null;
    try {
        settings = settingsModel.findOneAndUpdate({},newSettings, {fields:{balance:0}, new:true, upsert:true});
    } catch (err) {
        console.error("err=", err)
    }
    return settings;
}


async function transferMoney( transf ){
    let settings = null;
    try {
       settings = await settingsModel.findOne({}, "balance");
       if (settings){
            settings.balance +=  transf;
            return settingsModel.findOneAndUpdate({}, settings,  {fields:{balance:1}, new:true})
        }
    } catch (err) {
        console.error("err=", err)
    }
    return settings;
}

module.exports = {
    getSetting,
    setSetting, 
    transferMoney
}