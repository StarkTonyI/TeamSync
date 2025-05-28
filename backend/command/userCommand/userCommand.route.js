const express = require('express');
const router = express.Router();
const Command = require('../command.model.js')
const User = require('../../auth/auth.module.js');
express().use(express.json());
const mongoose = require('mongoose');
const dayjs = require('dayjs')




router.get('/list', async (req, res) => {
    try {
      const commandList = await Command.find().sort({ createdAt: -1});
        res.status(200).json(commandList)
    }catch(e){
        res.status(404).json('Fail:' + e);
    }    
});

router.get('/get/admin/data', async(req, res) => {
  try {
      const { id } = req.user;
      const objectId = new mongoose.Types.ObjectId(id);
      const getAdmin = await Command.findOne({  $or: [
        { "users.id": objectId },  // если id хранится как ObjectId
        { "users.id": id }         // если id хранится как строка
      ]
      });
   
      const objectAdminId =  new mongoose.Types.ObjectId(getAdmin.admin);
      const { _id,username } = await User.findById(objectAdminId);   
    //id:_id, username

      res.status(200).json({ id:_id, username });
   
    }
   catch(err){
    
    res.status(403).json(err);
  }
})

router.get('/user/command', async (req, res) => {
  try {
    const userData = req.user;
    const command = await Command.findOne({
      $or: [
        { "users.login": userData.login },
        { "admin": userData.id }  // Второй параметр
      ]
    });
    if (!command) {
      return res.status(204);
    }
    res.status(202).json(command);
  } catch (e) {
    res.status(400).json('Error: ' + e);
  }
});

router.put('/join/:id', async (req, res) => { 
  const { id } = req.params;
  try {  
    const userData = req.user;
    const result = await User.findByIdAndUpdate(
      userData.id, 
      { 
        $pull: { 
          notification: { id: id }  
        } 
      },
      { new: true }  
    );
  
    if(userData){
    const updateCommand = await Command.findOneAndUpdate(
      { _id: id },
      { $push: { users: { ...userData }  } }
  );
  res.status(200).json(updateCommand);
}

else{
  res.status(400).json('USER DATA NO EXIST');
}
  }catch(err){
    res.status(400).json('Error:' + err);
}}
);

router.put('/send/invitation/:id', async(req, res)=> {
  const { id } = req.params;
  try {
  const now = dayjs().toDate();
  const user = req.user;
  const command = await Command.findByIdAndUpdate( id,
    { $push: { notification: { ...user, read:false, date:now }  } }
  );
    res.status(200).json(command);
} catch (err){ 
  res.status(400).json('No okay:' + err);
}
});

router.delete('/delete/user', async (req, res) => {
  try {
    const userData = req.user;
    const command = await Command.findOneAndUpdate(
      { "users._id": userData._id }, // Find the team where the user is part of
      { $pull: { users: { _id: userData._id } } }, // Remove the user object from the array
      { new: true } // Return the updated document
    );
    if (!command) {
      return res.status(404).json({ message: "No command found for this user." });
    }
    res.status(202).json(command);
  } catch (e) {
    res.status(400).json('Error: ' + e);
  }
});


module.exports = router;











