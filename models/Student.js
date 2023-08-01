const mongoose=require('mongoose'); //import mongoose package

const Schema=mongoose.Schema; //assign mongoose schema to variable

const studentSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    }, 
}) //create schema


const student=mongoose.model('student',studentSchema); //create model

module.exports=student; //export model