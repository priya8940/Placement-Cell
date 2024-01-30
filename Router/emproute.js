const express = require('express');
const empRouter = express.Router();
const empCtrl = require('../Controller/empcontoller');

empRouter.post('./register',empCtrl.register);


module.exports= empRouter;