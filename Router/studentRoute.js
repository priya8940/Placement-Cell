const express = require('express');
const studentRouter = express.Router();
const studCtrl = require('../Controller/studentController');

studentRouter.post('/register',studCtrl.register);
studentRouter.get('/allstudent',studCtrl.getAllStudent);
studentRouter.post('/get-student-byEmail',studCtrl.getStudentByEmail);
studentRouter.delete('/delete/:id',studCtrl.deleteStudent);
studentRouter.get('/:id',studCtrl.getStudent);

module.exports= studentRouter;  