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
    eMail: {
        type: String,
        required: true
    },
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
    } catch (err) {
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
async function deleteClient(id) {
    return clientModel.findByIdAndDelete(id);
}

async function updateClient(id, updClient) {
    //console.log("Before")
    return clientModel.findByIdAndUpdate(id, updClient);                   
}

async function createClient(newClient) {
    return clientModel.create(newClient);
}

async function getClientList() {
    return clientModel.find({}, 'role firstName lastName id',).sort({ lastName: 1, firstName: 1 }).exec();
}

async function transferMoney(id, transf) {
    let client = null;
    try {
        client = await clientModel.findById(id, 'balance');
        if (client) {
            client.balance += transf;
            return clientModel.updateClient(id, client);
        }
    } catch (err) {
        console.error("err=", err)

    }
    return client;
}

async function chkLogin(eM, pas) {
    let client = null;
    try {
        client = clientModel.findOne({ eMail:eM, password:pas }, 'role');
        client;
        return client;
    } catch (err) {
        console.error("err=", err)
    }
    return client;
}


module.exports = {
    getClientById,
    //getClientPasswordById,
    deleteClient,
    updateClient,
    createClient,
    getClientList,
    transferMoney,
    chkLogin
}