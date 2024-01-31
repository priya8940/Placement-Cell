const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const interViewSchema = new Schema({
   company_name:{
        type: String,
        required: true
    },
   interview_date:{
        type: Date,
        required: true
        
    },
},{
    timestamps:true
});

const interViewModel = mongoose.model('interView', interViewSchema);
module.exports = interViewModel;