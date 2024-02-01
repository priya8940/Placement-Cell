const express = require('express');
const studentInterviewRouter = express.Router();
const studentInterviewCtrl = require('../Controller/studentInterviewController');

 studentInterviewRouter.post('/register',studentInterviewCtrl.allocateInterviewToStudent);
 studentInterviewRouter.get('/allocated-interviews/:id',studentInterviewCtrl.getAlocatedInterview);
 studentInterviewRouter.delete('/delete/:id',studentInterviewCtrl.deleteAllocatedInterview);
studentInterviewRouter.get('/allAllocated-interviews',studentInterviewCtrl.getAllAllocatedInterview);

module.exports= studentInterviewRouter;  