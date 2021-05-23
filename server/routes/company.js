const express = require('express');
const router = express.Router();

const settingDB = require('../data/setting');
const serverSetting  = require('../models/loadServerSetting');


router.get('/', async (req, res) => {
  let s = await serverSetting.setting;
  let name = s.name;
  let data = {name} 
  console.info(`Company name retrieved `, data)
  res.send(data);
});

router.get('/setting', async (req, res) => {
  console.info(`Setting retrieved `)
  res.send(await settingDB.getSetting());
});

router.patch('/setting', async (req, res) => {
  try {
    const data = await settingDB.setSetting(req.body);
    res.send(data);
    console.log(`Setting saved`);
  }
  catch (error) {
    console.error("Saving setting error: ",error)
    res.sendStatus(500)
  }
});



module.exports = router;
