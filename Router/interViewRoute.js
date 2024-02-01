const express = require('express');
const interviewRouter = express.Router();
const interviewCtrl = require('../Controller/interviewController');

interviewRouter.post('/register',interviewCtrl.creatInterview);
interviewRouter.get('/all-interviews',interviewCtrl.getAllInterview);
interviewRouter.delete('/delete/:id',interviewCtrl.deleteInterview);
interviewRouter.get('/:id',interviewCtrl.getInterview);

module.exports= interviewRouter;  