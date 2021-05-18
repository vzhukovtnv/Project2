require("../models/appSmall")
const clientDB = require("../data/client");

console.log("Start")
let client = {
    firstName: "Paul",
    lastName: "McCartney",
    birthdate:  new Date(1945, 11, 17),
    phone: "911",
    eMail: "paulMcCartmey@gmail.com",
  };
const id ='60a294d8b5747f64409e1b5e';
//clientDB.createClient(client).then(console.log("End"));


 clientDB.getClientById(id).then((c) => console.log(c.eMail));
 clientDB.getClientPasswordById(id).then((c) => console.log(c.password));
 clientDB.getClientList().then((c) => console.log(c));
// clientDB.deleteClient(id);
 clientDB.updateClient(id, {password:"1234"});
 clientDB.updateClient(id, {balance:100});