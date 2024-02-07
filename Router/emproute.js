const express = require('express');
const empRouter = express.Router();
const empCtrl = require('../Controller/empcontoller');

empRouter.post('/register',empCtrl.register);
empRouter.get('/checkSession',empCtrl.checkSession);
empRouter.get('/:id',empCtrl.getEmp);
empRouter.post('/login',empCtrl.logIn);
empRouter.get('/log_out',empCtrl.logout);



module.exports= empRouter;