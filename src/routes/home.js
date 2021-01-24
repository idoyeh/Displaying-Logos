const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', async (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../../client/views/home.html'));
  // res.sendFile(path.resolve(__dirname + '/../../client/views/Home_Page.html'));
  
  // res.send('Hello World!!!');
  // console.log('Hello World!!!');
  });

module.exports = router;