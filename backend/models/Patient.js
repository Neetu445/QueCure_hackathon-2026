import mongoose from "mongoose";

const patientSchema =new mongoose.Schema({
    tokenNumber:{ type:Number,
      required:true
    },

    name:{
        type:String,
        required:true
    },

    age:{
        type:Number,
        required:true
    },

    phone:{
        type:String,
        default:"true"
    },

    priority:{
        type:String,
        default:"normal"
    },

    status:{
        type:String,
        default:"waiting"
    },

    joinedAt:{
        type:Date,
        default:Date.now
    },

    calledAt:{
        type:Date
    },

    completeAt:{
        type:Date
    }
});

export default mongoose.model(
    "Patient",
    patientSchema
);