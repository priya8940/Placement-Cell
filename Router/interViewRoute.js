const express = require('express');
const interviewRouter = express.Router();
const interviewCtrl = require('../Controller/interviewController');

interviewRouter.post('/register',interviewCtrl.creatInterview);
// studentRouter.get('/allstudent',studCtrl.getAllStudent);
// studentRouter.delete('/delete/:id',studCtrl.deleteStudent);
// studentRouter.get('/:id',studCtrl.getStudent);

module.exports= interviewRouter;  