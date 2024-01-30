const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name:{
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
    dsa:{
        type: Boolean,
       
    },
    react:{
        type: Boolean,
        
    },
},{
    timestamps:true
});

const studentModel = mongoose.model('student', studentSchema);
module.exports = studentModel;