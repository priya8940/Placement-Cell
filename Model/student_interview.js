const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stuInterViewSchema = new Schema({
    stu_id:{
        type: Schema.Types.ObjectId,
        ref: "student"
    },
    interview_id:{
        type: Schema.Types.ObjectId,
        ref: "interView"
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