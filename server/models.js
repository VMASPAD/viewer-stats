const mongoose = require('mongoose')

const repository = new mongoose.Schema({
    repository:{
        unique: true,
        require: true,
        type:String,
    },
        metrics: [{
            date: { type: Number },
            value: { type: Number }
        }],
        color: {type: String, default: "#FF0000"},
})

module.exports = mongoose.model('Repository', repository)