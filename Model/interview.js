const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const interViewSchema = new Schema({
   compaany_name:{
        type: String,
        required: true
    },
    date:{
        type: date,
        required: true
        
    },
},{
    timestamps:true
});

const interViewModel = mongoose.model('interView', interViewSchema);
module.exports = interViewModel;