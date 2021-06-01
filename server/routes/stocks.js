const express = require('express');
const router = express.Router();

const fetchStockModule = require('../business/fetchStock');
const operations = require('../business/operations');
const watchList = require('../data/watchList');

router.get('/:id/:full', async (req, res) => {
  const id = req.params.id;
  const full = req.params.full === 'true'
  //console.info(`fetch Stock ` + full);
  console.log("Stocks data fetched !")
  data = await fetchStockModule.fetchStock(id, full);
  if (data == null) {
    console.log(id + " Client not found");
    res.sendStatus(500);
  }
  else {
    res.send(data);
  }
});



router.post('/:id/watch', async (req, res) => {
  try {
    console.log("watcH")
    const id = req.params.id;
    const action = req.body;
    const symbol = action.symbol;
    const operation = action.operation;
    switch (operation) {
      case "add":
        let data = await watchList.add(id, symbol);
        //  console.log("data=",data)  ;
        res.send(data);
        break;

      case "takeAway":
        res.send(await watchList.takeAway(id, symbol));
        break;

      default:
        const s = "Unknown watch action: " + operation;
        console.error(s);
        res.status(400).send(s);
        break;
    }
  }
  catch (error) {
    const s = "Watching action error: " + error;
    console.error(s);
    res.status(500).send(s);
  }
})


router.post('/:id/portfolio', async (req, res) => {
  try {
    const id = req.params.id;
    const action = req.body;

    //console.log("portfolio");
    //console.log(action);
    
    const symbol = action.symbol;
    const operation = action.operation;
    const amount = action.amount;
    const price = action.price;

    if (operation === "buy" || operation === "sell") {
      
      const { ok, message } = (operation === "buy") ?
        await operations.buy(id, symbol, price, amount) :
        await operations.sell(id, symbol, price, amount);
      console.log("buy or sell")
      if (ok) {
        res.send(result);
      } else {
        console.log(message);
        res.status(400).send(s);
      }
    } else {
      const s = "Unknown portfolio action: " + operation;
      console.error(s);
      res.status(400).send(s);
    }
  }
  catch (error) {
    const s = "Portfolio action error: " + error.message;
    console.error(s);
    res.status(500).send(s);
  }
})


module.exports = router;
