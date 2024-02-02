const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    batch:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    college_name:{
        type: String,
        required: true
    },
    status:{
        type: String
    },
    dsa_score:{
        type: Number,
       
    },
    react_score:{
        type: Number,
        
    },
    web_dev_score:{
        type: Number,
        
    },
},{
    timestamps:true
});

const studentModel = mongoose.model('student', studentSchema);
module.exports = studentModel;