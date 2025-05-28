const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const { fa } = require('@faker-js/faker');
const Schema = mongoose.Schema;

const analyzeTaskSchema =  new mongoose.Schema({
  user:{
    type:String,
    required:false
  },  
  allTask:[{
          id: {
            type: String, 
            required: false,
          },
          completed:{
            type: Boolean,
            required:false
          },
          deadline:{
            type:String,
            required:false
          },
          day:{
            type:String,
            required:false
          },
          month:{
            type:String,
            required:false
          },
          year:{
            type:String,
            required:false
          },
          status:{
            type:String,
            required:false
          },
          deleted:{
            type:Boolean,
            required:false
          },
          completedDate:[{
            id:String,
            date:Date, 
            completed:Boolean
          }],
          users:[{
            userId:String,
            completed:Boolean
          }],
          creatAt:{
            type: Date,
            required:true
          }
        },
      ]
})

const analyzeTask =  mongoose.model('analyzeTask', analyzeTaskSchema);

module.exports = analyzeTask;