const express = require('express');
const router = express.Router();

const clientDB = require('../data/client');
const serverSetting  = require('../models/loadServerSetting');


router.get('/', async (req, res) => {

  let s = await serverSetting.setting;
  let name = s.name;
  let data = {name} 
  console.info(`Company name retrieved `, data)
  res.send(data);
});

module.exports = router;
