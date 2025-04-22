const Messages = require('./messages.model.js');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Command = require('../command/command.model.js');

async function getLastMessagesForUsers(users, adminOrUserId) {
  const userIds = users.map(user => new mongoose.Types.ObjectId(user.id));
  const allIds = [...userIds, adminOrUserId]; // Все возможные ID (users + admin)
  const lastMessages = await Messages.aggregate([
    {
      $match: {
        $or: [
          { sender: { $in: allIds } },
          { recipient: { $in: allIds } }
        ],        
        "deleteNotMy.id": { $nin: [adminOrUserId] }
      }
    },
    { $sort: { createdAt: -1 } },
    {
      $group: {
        _id: {
          sender: '$sender',
          recipient: '$recipient'
        },
        lastMessage: { $first: '$messageText' },
        sender: { $first: '$sender' },
        recipient: { $first: '$recipient' },
        file: { $first: '$file' },
        deleteNotMy: { $first: '$deleteNotMy' },
        createdAt: { $first: '$createdAt' }
      }
    },
    {
      $project: {
        _id: 0,
        sender: 1,
        recipient: 1,
        lastMessage: 1,
        file: 1,
        deleteNotMy: 1,
        createdAt: 1
      }
    },
    {
      $match: {
        $or: [
          { sender: { $in: allIds } },
          { recipient: { $in: allIds } }
        ]
      }
    }
  ]);
  

  return lastMessages;
}


router.get('/fetch/lastMessages', async(req, res)=>{
    try {
        const adminOrUserData = req.user;
        const adminOrUserDataId = adminOrUserData.id;

        const ObjectId = new mongoose.Types.ObjectId(adminOrUserDataId);
    
const findCommand = await Command.findOne({
  $or: [
    { admin: ObjectId },
    { "users.id": adminOrUserDataId },
    { "users.id": ObjectId }
  ]
});
   
        const findCommandUsers = findCommand.users;
        const findMessages = await getLastMessagesForUsers(findCommandUsers, adminOrUserDataId);
        res.status(200).json(findMessages);
    
    } catch(err){
        res.status(404).json( 
            'Error:' + err
         );
    }
})

router.post('/list/:id', async(req, res)=>{
    try{  
        const sender = req.user;
        const senderId = new mongoose.Types.ObjectId(sender.id);
        const recipient = req.params.id;    

        const messages = await Messages.find({
            sender:{$in:[senderId,recipient]},
            recipient:{$in:[senderId,recipient]}
          }).sort({createdAt: 1});
    
          const messagesmessages = messages.map(i => i.deleteNotMy);
    let filteredMessages = 0;
    const filteredDataMessage = 
    messages.filter((item) => !item.deleteNotMy.some((subItem) => subItem.id == sender.id));
    
    res.status(200).json(filteredDataMessage );
    
    } catch(err){
        res.status(400).json('Error:' + err);
    }
});

router.delete('/delete', async(req, res)=>{
try{
    const myId = req.user;
    const myObjectId = new mongoose.Types.ObjectId(myId.id);
    const { status } = req.query;
    const data = req.body;
    const idList = data.map(item => new mongoose.Types.ObjectId(item.id));

    if(status == 'true'){
        const deleteArr = await Messages.deleteMany({ _id: { $in: idList } });
        res.status(201).json(deleteArr);
    } else if(status == 'false'){
        const removeForMe = await Messages.updateMany(
            { _id: { $in: idList } }, 
            { $push: { deleteNotMy:{ id:myId.id } } }  
        );
        res.status(202).json(removeForMe);
    }


}catch(err){
    res.status(400).json('Error:' + err);
}
});

module.exports = router;
