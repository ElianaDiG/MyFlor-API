const mongoose = require ("mongoose");

const userSchema = mongoose.Schema(
    {
        nombreDeFlor:{
            type:String,
            required: true,
        },
        codigo:{
            type: Number,
            required: true,   
        },
        color:{
            type:String,
            required:false,
        }
    }
);
module.exports = mongoose.model('User', userSchema);