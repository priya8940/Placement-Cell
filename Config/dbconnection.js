const mongoose=require('mongoose');
mongoose.connect('mongodb://0.0.0.0/placement_cell');
const db=mongoose.connection;
db.on('error',console.error.bind(console,"error in connection to DB"));

db.once('open',function(){
    console.log("Succesfully Connected to database")
});
module.exports=db;