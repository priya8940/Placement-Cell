const express = require('express');
const empRouter = express.Router();
const empCtrl = require('../Controller/empcontoller');

empRouter.post('/register',empCtrl.register);
empRouter.get('/checkSession',empCtrl.checkSession);
empRouter.get('/log_out',empCtrl.logout);
empRouter.get('/:id',empCtrl.getEmp);
empRouter.get('/csv',empCtrl.allEmpData);
empRouter.post('/login',empCtrl.logIn);




module.exports= empRouter;