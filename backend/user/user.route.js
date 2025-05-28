const express = require('express');
const router = express.Router();
const User = require('../auth/auth.module.js');
const mongoose = require('mongoose');
const Command = require('../command/command.model.js');
const AnalyzeTotalBase = require('../analyzeUser/analyzeUser.module.js');
const dayjs = require('dayjs')

router.get('/fetch/task/:id', async (req, res)=>{    
try{
    const { taskType } = req.query;
    
    const { id } = req.user;
    const objectId = new mongoose.Types.ObjectId(id);

    if(taskType == 'breakTask'){
        const { breakTask } = await User.findById(objectId);         
        res.status(201).json(breakTask)    
    } 

    else if (taskType == 'mainTask'){
        
        const mainTask = await User.find({ "mainTask.userId.id": id },  );
        const myMainTask = await User.findById(objectId);
        const allMainTasks = mainTask.flatMap(task => task.mainTask);
        const FilterAllMainTasks = allMainTasks.filter(task => task.userId.some(i => i.id == id));  
       
        res.status(201).json([...myMainTask.mainTask, ...FilterAllMainTasks ]);  
        
}   
    }catch(e){
        res.status(404).json('Error:' + e)
    }
});

router.put('/complete/breakTask/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { taskType } = req.query;
        const myId = req.user;
        const date = dayjs().toDate();
        const objectId = new mongoose.Types.ObjectId(id);
        if (taskType == 'breakTask') {
            const updatedBreakTask = await User.findOneAndUpdate(
            { "breakTask._id": objectId }, 
            { $set: { "breakTask.$.completed": true } }, 
            { new: true });
        if (!updatedBreakTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(updatedBreakTask);
        } else if (taskType == 'mainTask') {
            
            const updatedUser = await User.findOneAndUpdate(
             { "mainTask._id": objectId }, 
                { $set:  { "mainTask.$[elem].userId.$[userElem].completed": true } },
                { arrayFilters: [
                    { "elem._id": objectId },     
                    { "userElem.id": myId.id }   
                ],
                returnDocument: "after" 
            });
            const updatedUserAnalyze = await AnalyzeTotalBase.findOneAndUpdate(
                    {
                      allTask: {
                        $elemMatch: {
                          _id: new mongoose.Types.ObjectId(id)
                        }
                      }
                    },
                    {
                      $push: {
                        "allTask.$[elem].completedDate": {
                          id: myId.id,
                          date: date,
                          completed: true
                        }
                      }
                    },
                    {
                      arrayFilters: [{ "elem._id": new mongoose.Types.ObjectId(id) }],
                      returnDocument: "after", // если ты на Mongoose >= 6, это ок. Иначе используй 'returnNewDocument: true'
                      new: true // обязательно, чтобы получить обновлённый документ
                    }
                  );
                  
              

        if(updatedUser.role !== 'admin'){
            const updatedUserCard = await User.findOneAndUpdate(
                { "mainTask._id": objectId }, // Находим нужный mainTask
                { $set: { "mainTask.$.completed": true } }, // Обновляем поле completed
                { returnDocument: "after" } // Возвращаем обновлённый документ
            );
          
       
            return res.status(203).json(updatedUserCard);
       
        }
  

        if (!updatedUser) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(201).json(updatedUser);
       
        }

    
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
});

router.put('/create/task/:id', async(req, res)=>{
    try{
    const { id } = req.params
    const { taskType } = req.query;
    const data = req.body;
    const userData = req.user;
  
    const breakTask = {
        mainTaskId:id,
        title:data.title,
        description:data.description,
        completed:false,
        deadline:data.deadline
    }
    const mainTask = { 
        title:data.title,
        description:data.description,
        completed:false,
        deadline:data.deadline,
        status:'todo',
        progress:0,
        priority:data.priority,
        creatAt:dayjs().toDate()
    }   
    if(taskType == 'breakTask'){
         const updateTask = await User.findByIdAndUpdate(userData.id, 
        { $push: { breakTask:breakTask   } }, 
        { new:true } 
    )
    res.status(200).json(updateTask);
}   else if(taskType == 'mainTask'){
        const updateTask = await User.findByIdAndUpdate(userData.id, 
        { $push: { mainTask:mainTask   } }, 
        { new:true } 
    )
    res.status(200).json(updateTask);
}

}catch(err){

    res.status(400).json('Error:' + err);

}
});

router.put('/edit/breakTask/:id', async(req, res)=>{
    try{
    const { id } = req.params;
    const { taskType } = req.query;
    const data = req.body;



    const objectId = new mongoose.Types.ObjectId(id);
   

    if(taskType == 'breakTask'){
    const breakTask = await User.findOneAndUpdate(
    { "breakTask._id": objectId }, 
    { $set: { 
        "breakTask.$.title": data.title,
        "breakTask.$.description":data.description,
        "breakTask.$.deadline":data.deadline
     } }, 
    { new: true });
    res.status(200).json(breakTask);
} else {

        const mainTask = await User.findOneAndUpdate(
        { "mainTask._id": objectId }, 
        { $set: { 
            "mainTask.$.title": data.title,
            "mainTask.$.description":data.description,
            "mainTask.$.deadline":data.deadline,
            "mainTask.$.priority":data.priority
         } }, 
        { new: true });
    
        res.status(200).json(mainTask);
}

}catch(err){
    res.status(400).json('Error:' + err);
}
});

router.put('/delete/breakTask/:id', async(req, res)=>{
    try{
    const { id } = req.params;
    const  { taskType } = req.query;
       
    const userIdToken = req.user

    const userId = new mongoose.Types.ObjectId(userIdToken.id);
    const objectId = new mongoose.Types.ObjectId(id);

        if (taskType == 'breakTask'){

        const deleteBreakTask = await User.findOneAndUpdate(
        { "breakTask._id": objectId },
        { $pull: { breakTask: { _id: objectId } } },
        { new: true }
    );
    res.status(200).json({id, taskType});
    }  
    else if(taskType == 'mainTask') {
        const deleteBreakTask = await User.findOneAndUpdate(
            { "_id": userId },
            { $pull: { mainTask: { _id: objectId } } },
            { new: true }
        );
        await AnalyzeTotalBase.updateOne(
            { "allTask._id": objectId }, // находим документ, где есть нужный _id во вложенном массиве
            { $set: { "allTask.$.deleted": true } } // обновляем только нужный элемент
    );
        res.status(200).json({id, taskType});

}
    }catch(err){
        res.status(400).json('Error:' + err);
    }
});

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
/*
router.put('/create/mainTask/:id', async(req, res)=>{  
    try{
      const { id } = req.params;
      const { description, deadline, title  } = req.body;
      
      function priorityRandomWord(){
        const words = ['low', 'medium', 'high'];
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex];
      }
      function getRandomWord() {
        const words = ["in-progress", "todo", "completed"];
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex];
      }
      function getRandomNumber() {
        return Math.floor(Math.random() * 101); // Generates a random number from 0 to 100
      }
        
  const newTask = {
    id,
    title,
    description,
    completed: false,
    deadline:deadline,
    status:getRandomWord(),
    progress:getRandomNumber(),
    priority:priorityRandomWord()
  };
  
  res.status(200).json(newTask);
  
    } catch(err){
      res.status(400).json('Error:' + err);
    }
  
});
*/
router.delete('/leave/command/:id', async(req, res)=>{
    try {    
    const { id } = req.params;
    const objectId = new mongoose.Types.ObjectId(id);
    const findAdminId = await Command.findOne({ "users.id": objectId });
    const objectFindAdminId = new mongoose.Types.ObjectId(findAdminId?.admin);

    const leaveCommand = await Command.updateOne(
        { "users.id": id }, 
        { $pull: { users: { id: id }}});
    
        const deleteFromTask = await User.updateOne(
        { _id: objectFindAdminId },
        { $pull: { "mainTask.$[].userId": { id: id } } }
      );
        res.status(202).json({ leaveCommand, deleteFromTask });
    } catch(err){
        res.status(404).json('Error:' + err);
    }
})
     



module.exports = router;