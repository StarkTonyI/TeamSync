const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  sender: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  recipient: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  deleteNotMy:[{ id:String }],
  messageText: String,
  file:String
}, {timestamps:true});

const MessageModel = mongoose.model('MessageChatModule', MessageSchema);

module.exports = MessageModel;