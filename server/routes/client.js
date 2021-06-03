var express = require('express');
var router = express.Router();

const clientDB = require('../data/client');


router.get('/login/:userID/:password', async (req, res) => {
  let data = await clientDB.chkLogin( req.params.userID, req.params.password);
  if (data) {
    console.log("successful login");
  }else{
    data = {_id:""};
    console.log("unsuccessful login");
  }
  res.send(data);
});

router.get('/', async (req, res) => {
  let data = await clientDB.getClientList();
  console.info(`Clients retrieved: `, data?.length)
  res.send(data);
});


router.post('/', async (req, res) => {
  let clientToCreate = req.body
  try {
    await clientDB.createClient(clientToCreate);
    console.log("Created client", clientToCreate)
    res.send(clientToCreate)
  }
  catch (error) {
    console.error("Creating client error: ",error)
    if (error.code === 11000) {
      res.status(409).send('Client ' + clientToCreate.firstName + ' already exists');
    }
    else {
      res.sendStatus(500)
    }
  }
})


router.get('/:id', async function (req, res) {
  try {
    let foundClient = await clientDB.getClientById( req.params.id);
    if (!foundClient ) {
      console.log("Client not found");
      res.sendStatus(500)
    }
    else {
      console.log("Client get");
      //console.info(`Found client:`, foundClient);
      res.send(foundClient);
    }
  } catch (error) {
    console.error("Getting finding client error: ",error)
    res.sendStatus(500)
  }
});


router.put('/:id', async function (req, res) {
  let updatedClient = req.body
  try {
    const data = await clientDB.updateClient(req.params.id, updatedClient);
    res.send(data);
    console.log("Updated client")
  }
  catch (error) {
    console.error("Updating client error:", error)
    res.sendStatus(500)
  }
})


router.delete("/:id", async (req, res) => {
  try {
    const data = await clientDB.deleteClient(req.params.id);
    if (data) {
      console.log("Deleted client", data);
      res.send(data);
    } else {
      console.error("Can't delete client ", req.params.id)
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("Deleting client error: ",error)
    res.sendStatus(500)
  }
});



router.put('/:id/transfer', async function (req, res) {
  try {
    // console.log("started transfer ", req.body)
    let updatedClient = req.body
    let transfer = updatedClient.transfer;
    // console.log(transfer)
    let data = await clientDB.transferMoney(req.params.id, transfer);
    if (data) {
      console.log("Money transfered $", transfer)
      res.send(data);
    }else{
      console.error("Can't transfer money, client ", req.params.id)
      res.sendStatus(404);   
    }
  }
  catch (error) {
    console.log("Transferring money error: ",error)
    res.sendStatus(500)
  }
})


module.exports = router;
