const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const empSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
   
},{
    timestamps:true
});

const empSchemaModel = mongoose.model('employee', empSchema);
module.exports = empSchemaModel;