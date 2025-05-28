const express = require('express');
const router = express.Router();
const Command = require('../command.model.js')
const User = require('../../auth/auth.module.js');
const mongoose = require('mongoose');
const upload = require('../../uploadsModule/uploads.module.js')
express().use(express.json());


router.get('/command', async (req, res)=>{

    try {
    const adminData = req.user;
    const commandFind = await Command.findOne({ admin:adminData.id });
    if(commandFind){
      res.status(200).json({
        commandName:commandFind.commandName,
        commandTask:commandFind.commandTask,
        commandDescription:commandFind.commandDescription,
        commandNotification:commandFind.notification
      })
  } else{
    res.status(200);
  }
  } catch(e){
    res.status(400).json('Error' + e);
  }
});

router.get('/command/users', async (req, res) => {
  try{
  const adminData = req.user;
  const commandFind = await Command.findOne({ admin:adminData.id });
    if(!commandFind){
      res.status(200);
    }
    else{
      res.status(200).json(commandFind);
    }

  } catch(err){
    res.status(400).json('Error:' + err);
  }
});

router.get('/command/fetch/user/:id', async(req, res)=>{
  try {
    const { id } = req.params;
    const objectId = new mongoose.Types.ObjectId(id);
    const findUser = await User.findById(objectId).select('-password');
    res.status(200).json(findUser);
  }catch(err){
    res.status(400).json('Not okay' + err);
  }
})

router.get('/command/fetch/maintask/user/:id', async(req, res) =>{
    try{
      const { id } = req.params;   
      const objectId = new mongoose.Types.ObjectId(id);
      const mainTaskUsers = await User.find({ mainTask: { $elemMatch: { _id: objectId } } });
      const filterMainTask = mainTaskUsers.filter(i => i.role !== 'admin');
     
      res.status(202).json(filterMainTask);

    }catch(err){
      res.status(400).json('Error' + err);
    }
})

router.get('/notificatoin', async(req, res) => {
  try {
    const adminData = req.user;
    const findCommand = await Command.findOne({ admin:adminData.id })
    if(!findCommand){
      res.status(200).json([]);
    }else{
    res.status(200).json([
      ...findCommand.notification
    ])
  }
  }catch(e){
    res.status(200).json('Error:' + e);
  }

})

router.post('/create',upload.single('file'), async (req, res)=>{
    try {
      const imageFileName = req?.file?.filename;
      const adminData = req.user;
      const { commandName, commandTask, maxUsers, commandDescription  } = req.body;
      
      if(commandName){
        const command = await Command.create({
          commandName:commandName,
          commandTask:commandTask || '',
          commandMemberNumber:maxUsers,
          commandDescription:commandDescription || '',
          admin:adminData.id,
          file:imageFileName || ''
        })
    
        res.status(200).json(command);
      }else{
        res.status(400).json('No full some param')
      }

      }catch(e){
          res.status(400).json('Error' + e);
      }
});

router.delete('/delete', async(req, res)=>{
    try{
      const adminData = req.user;
      const deletedItem = await Command.findOneAndDelete({ admin:adminData.id });
      res.status(200).json('Good');
    }
    catch(error){
      res.status(400).json('Error:' + error);
    }
});

router.delete('/delete/user/:id', async (req, res) => {
  const { id } = req.params;
  const adminData = req.user;
  const user = await User.findById(id);

  try {
    const command = await Command.findOneAndUpdate(
      { admin: adminData.id }, 
      { $pull: { users: { login: user.login } } }, 
      { new: true }
    );

    if (!command) {
      return res.status(404).json({ message: "Command not found or user not in the team" });
    }

    res.status(202).json(command);
  } catch (e) {
    res.status(400).json({ error: 'Error: ' + e.message });
  }
});

router.put('/accept/user/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const adminData = req.user; 
    const user = await User.findById(id, 'login role username'); 
    const commandFindUsers = await Command.findOne({ "users.id":id });

    if(commandFindUsers){
      return res.status(401).json({message:'Such user already have command'})
    }

    const commandAddUser = await Command.findOneAndUpdate(
      { admin:adminData.id },
      { $push: { users: { 
        id: user._id, login:user.login, 
        role:user.role, username:user.username 
      }}
    });
 
    if (!commandAddUser) {
      return res.status(204).json({ message: "No command found for this user." });
  }
    res.status(202).json({commandRemoveNotification, commandAddUser});
  } catch (e) {
    res.status(400).json('Error: ' + e);
  }
});

router.post('/fetch/user/logo', async(req, res) => {
  try{  
    const obj = req.body;
    const ids = Object.keys(obj);

    const data = await User.find({ _id: { $in: ids }}, "_id imageUrl" );
  
    //const dataMap = data.map(i => ({ i_id: i._id, imageUrl: i.imageUrl }));

    res.status(200).json(data);
  }catch(err){
    res.status(404).json('Not' + err);
  }
})

module.exports = router;