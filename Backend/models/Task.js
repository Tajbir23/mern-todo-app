const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : String,
    email : String,
    phone : Number,
    date : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('userDataReact', userSchema)