const express = require('express');
const userModel = require('../auth/auth.module.js');
const router = express.Router();
const totalTaskModel = require('../analyzeUser/analyzeUser.module.js');
const Command = require('../command/command.model.js')
const { format } = require("date-fns");
express().use(express.json());
const cors = require('cors');
const mongoose = require('mongoose');
const dayjs = require('dayjs')


function updateArrayStatus(arr1, arr2) {
    const map = new Map(arr2.map(item => [item._id.toString(), item.completed]));

    return arr1.map(item => ({
        ...item,
        completed: map.has(item._id.toString()) &&  map.get(item._id.toString())
         !== item.completed ? map.get(item._id.toString()) : item.completed
    }));
}
express().use(cors({
    origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));



router.post('/analyzeTask/:id',async (req, res)=>{
    try {
        const { id } = req.user;
        const objectId = new mongoose.Types.ObjectId(id);

        const findUser = await userModel.findById(id);

        const now = dayjs().toDate();
        const day = format(now, "dd");
        const month = format(now, "MMMM");
        const year = format(now, "yyyy");

        const totalTask = await totalTaskModel.findOne({"user":objectId});

        

        if (!totalTask && objectId) {
            const createModel = await totalTaskModel.create({
                user: objectId,
                allTask: []
            });
            return res.status(212).json(createModel);
        } 

        findUser.mainTask = findUser.mainTask.map(task => {
            const totalTask = task.userId.length;
            const completedTask = task.userId.filter(i => i.completed == 'true').length;

            if (totalTask === completedTask && totalTask !== 0) {
                return { ...task, completed: true };
            }
            return task;
        });
  

        const existingTaskIds = new Set(totalTask.allTask.map(task => task._id.toString()));

        const allTask = findUser?.mainTask.filter(task => !existingTaskIds.has(task._id.toString()));

        
        /*
         totalTask.allTask.forEach(task1 => {
        const task2 = findUser?.mainTask.find(task => task._id.toString() === task1._id.toString());
  
        if (task2) {
        const existingUserIds = totalTask.allTask?.users?.map(u => u?.id) || [];

        task2.userId.forEach(user => {
        if (!existingUserIds.includes(user.id)) {
        task1.users.push(user);
      }
    });
  }
});
        */


        const optimizedTask = allTask?.map(({ _id, deadline, completed }) => 
            ({ _id, completed, deadline, day, month, year, status:'user', deleted:false, creatAt:now }));

        if (optimizedTask.length) {
            totalTask.allTask.push(...optimizedTask);
        }
        const firstArray = totalTask.allTask.map(item => item.toObject());
        const secondArray = findUser.mainTask.map(item => item.toObject());

        const completeUpdateArray = updateArrayStatus(firstArray, secondArray);



        totalTask.allTask = completeUpdateArray;

    

       await totalTask.save();

        res.status(200).json(totalTask);

    } catch(err){

        res.status(400).json('Not okay:' + err);

}
}) 

module.exports = router;


