const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', async (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../../client/views/Logo_Page.html'));
  
});

module.exports = router;