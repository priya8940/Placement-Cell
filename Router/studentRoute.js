const express = require('express');
const studentRouter = express.Router();
const studCtrl = require('../Controller/studentController');

studentRouter.post('/register',studCtrl.register);
studentRouter.get('/allstudent',studCtrl.getAllStudent);
studentRouter.delete('/delete',studCtrl.deleteStudent);
//studentRouter.get('/students/:id',studCtrl.getStudentById);

module.exports= studentRouter;