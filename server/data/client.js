const mongoose = require('mongoose');

require('./db')

const Schema = mongoose.Schema;

const clientSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    birthdate: Date,
    eMail: String,
    phone: String,
    balance: Number,
    password: String,
    role: Number
});

const clientModel = mongoose.model('Client', clientSchema, 'clients')

async function getClientById(id) {
    let client = null;
    try {
        client = clientModel.findById(id)
    } catch (error) {
        console.error("err=", err)
    }
    return client;
}

// async function getClientPasswordById(id) {
//     let client = null;
//     try {
//         client = clientModel.findById(id,'password')
//     } catch (error) {
//         console.error("err=", err)
//     }
//     return client;
// }
async function deleteClient(id)
{
    return clientModel.findByIdAndDelete(id);
}

async function updateClient(id, updClient){
    return clientModel.findByIdAndUpdate(id, updClient);
}

async function createClient(newClient){
    return clientModel.create(newClient);
}

async function getClientList(){
    return clientModel.find({},'role firstName lastName',).sort({lastName:1,firstName:1}).exec();
}

module.exports = {
    getClientById,
    //getClientPasswordById,
    deleteClient,
    updateClient,
    createClient,
    getClientList
}