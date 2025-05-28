const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema =  new mongoose.Schema({
    username: {
        type: String,
        required: true,
  },
    lastname:{
        type: String,
        required: true,
  },
    login:{
        type: String,
        required: true,
  },
    password: {
        type: String,
        required: true
  },
    notification:[{
        id: { type: String, required: true },
        commandName: { type: String, required:true}, 
        date:{ type:Date, required:true },
        read:{ type:Boolean, required:true }
  }],
    mainTask:[{
          title: {
            type: String, 
            required: false,
          },
          description: {
            type: String,
            required: false,
          },
          completed: {
            type: Boolean, 
            default: false,
          },
          deadline: {
            type: String, 
            required: false,
          },
          status:{
            type: String, 
            required: false,
          },
          progress:{
            type:Number,
            required:false
          },
          priority:{
            type:String,
            required:false
          },
          userId: [{
            id:{
              type:String,
              required:false
            },
            completed:{
              type:String,
              required:false
            },
            description:{
              type:String,
              required:false
            }
          }],
          creatAt:{
          type:Date,
          required:true
    }
  },
  ],  
    breakTask:[{
        mainTaskId:{
          type:String,
          required:false
        },
        title: {
          type: String, 
          required: false,
        },
        description: {
          type: String,
          required: false,
        },
        completed: {
          type: Boolean, 
          default: false,
        },
        deadline: {
          type: Date, 
          required: false,
        }
      }
  ],
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: true
  },
    description:{
      type: String,
      required: false,
  },
    imageUrl: {
      type: String,
      required: false,
  }
},
{ timestamps: true }
);

  userSchema.pre('save', async function( next) {
      if(!this.isModified('password')) return next();
      this.password = await bcrypt.hash(this.password, 10);
      next();
}
)

const User =  mongoose.model('UserModule', userSchema);

module.exports = User;