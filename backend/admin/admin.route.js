const express = require('express');
const router = express.Router();
express().use(express.json());
const cors = require('cors');
const cookie = require('cookie-parser');
express().use(cookie());
const Command = require('../command/command.model.js');
const User = require('../auth/auth.module.js');
const mongoose = require('mongoose');
const totalTask = require('../analyzeUser/analyzeUser.module.js');
const dayjs = require('dayjs')

express().use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));



router.get('/users', async (req,res)=>{
  try {

  const users = await User.find({ role:'user'});
  res.status(200).json([ ...users ]);
} catch(e){
    res.status(400).json('Error' + e);
  }
});

router.put('/invite/user/:id', async (req, res) => {
  const { id } = req.params;
  const adminData = req.user;
  const commandFind = await Command.findOne({ admin:adminData.id });
  const commandId = commandFind._id;
  const date = dayjs().toDate();
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { 
        $addToSet: { 
          notification: {
            id: commandId,
            commandName: commandFind.commandName,
            date:date,
            read:false
          } 
        } 
      }, 
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });

  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
});

router.put('/assign/task/:id', async(req, res)=>{  
  try{
    const { id } = req.params;
    const { task, description } = req.body;

    const objectTaskId = new mongoose.Types.ObjectId(task._id);
    const alreadyAssignTask = await User.findOne(
      { "mainTask._id": objectTaskId },
    );
    const filterMainTask = alreadyAssignTask.mainTask.filter(i => i._id == task._id);
    const alreadyAssignTaskUser = filterMainTask.filter(i => 
      i.userId.some(user => new mongoose.Types.ObjectId(user) == id)
  );
   
    if(!alreadyAssignTaskUser.length){
      const updateCommandData = await User.findOneAndUpdate(
        { "mainTask._id":objectTaskId },
        { $push: { "mainTask.$.userId": { id:id, completed:false, description:description } } }, 
        { new: true }
      )
      res.status(200).json(updateCommandData.mainTask);
    } 
    else {
      const updateCommandData = await User.findOneAndUpdate(
        { "mainTask._id":objectTaskId },
        { $pull: { "mainTask.$.userId": { id:id } } }, 
        { new: true }
      )
      res.status(200).json(updateCommandData.mainTask);
    }
  
    
    res.status(200);

   } catch(err){
    res.status(400).json('Error:' + err);
  }
});

router.get('/fetch/mainTask', async (req, res)=>{    
  try {
      const { id } = req.user;
      const objectId = new mongoose.Types.ObjectId(id);
      const { mainTask }  = await User.findById(objectId);


      res.status(206).json(mainTask);

    } catch(e){
          res.status(404).json('Error:' + e)
      }
});

router.get('/fetch/user/mainTask/:id', async(req, res)=>{
  try{
    const { id } = req.params;
    const admin = req.user;
    const objectAdminId = new mongoose.Types.ObjectId(admin.id);
 
    const userMainTask = await User.findOne( { "_id": objectAdminId } );
    

    const userMainTaskFilter = userMainTask.mainTask.filter(i => i._id == id);

    if (!userMainTaskFilter.length) {
      throw new Error("Задача не найдена");
    }
    
    const idUserMainTaskFilter = userMainTaskFilter[0]?.userId ?? [];
 
    const ids = idUserMainTaskFilter.map(task => task.id); // Берём id из массива



    if (!Array.isArray(idUserMainTaskFilter) || !idUserMainTaskFilter.length) {
      throw new Error("У задачи нет пользователей");
    }
    
    const usersMainTask = await User.find({ _id:{ $in: ids } });
    

    res.status(200).json(usersMainTask);
  
  } catch(err){  
    
    res.status(414).json('Error:' + err);
  }
})

router.put('/create/task', async(req, res)=>{
      try{
      const data = req.body;
      const userData = req.user; 

    const mainTask = { 
          title:data.title,
          description:data.description,
          completed:false,
          deadline:data.deadline,
          status:'todo',
          progress:0,
          priority:data.priority,
          userId:[],
          creatAt:dayjs().toDate()
    }   
        const updateTask = await User.findByIdAndUpdate(
          userData.id,
          { $push: { mainTask:mainTask   } }, 
          { new:true } 
      )
      res.status(200).json(updateTask);
  
  
  }catch(err){
  
      res.status(400).json('Error:' + err);
  
  }
});

router.put('/edit/mainTask/:id', async(req, res)=>{
      try{
      const { id } = req.params;
      const data = req.body;
      const objectId = new mongoose.Types.ObjectId(id);
      const mainTask = await User.findOneAndUpdate(
          { "mainTask._id": objectId }, 
          { $set: { 
            "mainTask.$.title": data.title,
            "mainTask.$.description":data.description,
            "mainTask.$.priority":data.priority,
            "mainTask.$.deadline":data.deadline
         } }, 
        { new: true }
        );
      
          res.status(200).json(mainTask);
  
  
  }catch(err){
      res.status(400).json('Error:' + err);
  }
});

router.put('/delete/mainTask/:id', async(req, res)=>{
      try{
          const { id } = req.params;
          const objectId = new mongoose.Types.ObjectId(id);
          if(!objectId){
            return res.status(404);
          }
        
          const deleteMainTask = await User.findOneAndUpdate(
              { "mainTask._id": objectId },
              { $pull: { mainTask: { _id: objectId } } },
              { new: true }
          );
        
        await totalTask.updateOne(
        { "allTask._id": objectId }, // находим документ, где есть нужный _id во вложенном массиве
        { $set: { "allTask.$.deleted": true } } // обновляем только нужный элемент
);

          res.status(200).json(deleteMainTask)
      }catch(err){
          res.status(400).json('Error:' + err);
}});

router.delete('/break/task/delete', async(req, res) => {
      try{
          const { data } = req.body;
          const userData = req.user;
          if(data){
              const findUser = await User.findByIdAndUpdate(userData.id, 
                  { $pull: { tasks: { data:data }  } }
              )
              res.status(200).json(findUser);
          }
      }catch(err){
          res.status(400).json('Error:' + err);
      }
});

router.get('/fetch/notification', async(req, res) => {
  try { 
    const token = req.user;
    //const objectTokenId = new mongoose.Types.ObjectId(token.id);
    
    const commandFind = await Command.findOne({ admin:token.id });
    const usersByNotification = await User.find({ "notification.id": commandFind?._id })
    
    const userFind = await Command.find({ "notification.id":token.id });
    const commandFindUsers = await Command.find({ 
      "users.id": token.id
    });
    
    if (commandFind || usersByNotification?.length) {
     
      const mergedNotificatonIds = commandFind?.users.map(i=> i.id) || []
      const userId = usersByNotification?.map(obj => obj?._id.toString()) || [];
     
      res.status(202).json({ allIds:[ ...mergedNotificatonIds, ...userId] }) 
    } else  if(userFind.length || commandFindUsers.length) {
      
      const mergedNotificatonIds = commandFindUsers?.flatMap(obj => 
      Array.isArray(obj.users) ? obj.users.map(user => user.id) : []);

      const mergedIds = userFind.map(i => i?._id);
     
      res.status(200).json({ allIds:[ ...mergedIds, ...mergedNotificatonIds] }) 
      
    } else{
      res.status(212).json({ })
    }
  }
  catch(err){
    res.status(404).json('Not okay' + err);
  }
})

router.put('/notification/delete/:id', async(req, res) => {  
  try {
  const { id } = req.params;
  const objectId = new mongoose.Types.ObjectId(id);
  const adminorUser = req.user;
 
  const user = await User.findByIdAndUpdate(
    adminorUser.id,
    { $pull: { notification: { _id: objectId } } }
);
  const command = await Command.updateMany(
    { "admin":adminorUser.id },
    { $pull: { notification: { id: id } } }
);

  res.status(200).json({ id, user });
} catch(err){
  res.status(404).json('Error:' + err);
}});

router.put('/notification/read', async(req, res)=>{
  try {
    const AdminOrUser = req.user;
    const commandUpdate = await Command.updateMany(
      { "admin": AdminOrUser.id }, 
      { $set: { "notification.$[].read": true } } // Делаем все read: true
    );
    const userUpdate = await User.updateMany(
      { "_id": AdminOrUser.id }, 
      { $set: { "notification.$[].read": true } } // Делаем все read: true
    );
 
    
    res.status(200).json({commandUpdate, userUpdate});


  }catch(err){  
  res.status('Error:' + err);
  }
})

router.delete('/delete/command/:id', async(req, res)=>{  
  try{
    const { id } = req.params;
    const objectId = new mongoose.Types.ObjectId(id);
    const findCommand = await Command.findOne({ admin:id }).select('_id');
    const deleteCommand = await Command.findOneAndDelete({ admin:id })
    const deleteAllUserTask = await User.updateOne(
      { _id: objectId }, 
      { $set: { "mainTask.$[].userId": [] } }
    );
    const deleteNotification = await User.updateMany(
      {}, // Пустой объект означает, что обновляем ВСЕ документы
      { $pull: { notification: { id: findCommand._id } } } // Удаляем из массива notification объекты с этим _id`
    );

    res.status(200).json({ id,deleteAllUserTask, deleteNotification });
  }catch(err){
    res.status(400).json('Error:' + err);
  }
});

router.delete('/delete/user/:id', async(req, res)=>{
  try{
    const { id } = req.params;
    const admin = req.user;
    const objectAdmin = new mongoose.Types.ObjectId(admin.id);
    const objectId = new mongoose.Types.ObjectId(id);
 
    const FindAndDelete = await Command.updateMany(
      { admin: admin.id },
      { 
        $pull: { 
          users: { 
            $or: [{ id: id }, { id: objectId }] 
          } 
        } 
      }
    );
        
    const deleteFromTask = await User.updateOne(
      { _id: objectAdmin },
      { $pull: { "mainTask.$[].userId": { 
        $or: [{ id: id }, { id: objectId }] 
      }  } }
    );

    res.status(200).json({ FindAndDelete, deleteFromTask });
  }catch(err){
    res.status(404).json('Error:' + err);
  }

})

module.exports = router;