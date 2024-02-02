require('./Config/dbconnection')
const empRoute = require('./Router/emproute');
const studentRoute = require('./Router/studentRoute');
const interViewRoute=require('./Router/interViewRoute')
 const studentInterviewRoutee = require('./Router/studentInterviewRoute');
const express = require('express');
const app = express();
//import cors to enable cross origin requests
const cookieParser = require('cookie-parser');
const cors = require('cors')

app.use(cors({
    origin: 'http://localhost:5500', //front end domain url
    credentials: true
}));
//app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.json());
app.use('/employees',empRoute);
app.use('/students',studentRoute);
app.use('/interviews',interViewRoute);
app.use('/student-interview',studentInterviewRoutee);

app.listen('8000');