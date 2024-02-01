const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stuInterViewSchema = new Schema({
    stu_id:{
        type: Schema.Types.ObjectId,
        ref: "student",
        required:true
    },
    interview_id:{
        type: Schema.Types.ObjectId,
        ref: "interView",
        required:true
    },
    result:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

const studentInterviewModel = mongoose.model('studentInterview', stuInterViewSchema);
module.exports = studentInterviewModel;