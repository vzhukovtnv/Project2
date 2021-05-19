var express = require('express');
const { isValidObjectId } = require('mongoose');
var router = express.Router();

const clientDB = require('../data/client');

router.get('/', async (req, res) => {
  let data = await clientDB.getClientList();
  console.info(`records retrieved from mongoose:`, data?.length)
  res.send(data);
});


router.post('/', async (req, res) => {
  let clientToCreate = req.body
  try {
    await clientDB.createClient(clientToCreate);
    console.log("Created client", clientToCreate)
    res.send(newSuperhero)
  }
  catch (error) {
    console.log(error)
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
      console.info(`Found client:`, foundClient);
      res.send(foundClient);
    }
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
});


router.put('/:id', async function (req, res) {
  let updatedClient = req.body
  try {
    await clientDB.updateClient(req.params.id, updatedClient);
    console.log("Updated client", updatedClient)
    res.send(data);
  }
  catch (error) {
    console.log(error)
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
    console.error(error)
    res.sendStatus(500)
  }
});



router.put('/:id/:transfer', async function (req, res) {
  let updatedClient = req.body
  try {
    let data = await clientDB.transferMoney(req.params.id, req.params.transfer);
    if (data) {
      console.log("Money transfered $", req.params.transfer)
      res.send(data);
    }else{
      console.error("Can't transfer money, client ", req.params.id)
      res.sendStatus(404);   
    }
  }
  catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})


module.exports = router;