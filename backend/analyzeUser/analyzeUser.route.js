const express = require('express');
const userModel = require('../auth/auth.module.js');
const router = express.Router();
const totalTaskModel = require('../analyzeUser/analyzeUser.module.js');
const Command = require('../command/command.model.js')
const { format } = require("date-fns");
express().use(express.json());
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors({
  origin: 'https://team-sync-gamma.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


function updateCommandCompleted(commandFilter, targetId) {
  commandFilter.forEach(command => {
      const user = command.userId.find(user => user.id === targetId);
      
      if (user && String(user.completed) !== String(command.completed)) {
          command.completed = user.completed === "true";
      }
  });

  return commandFilter;
}


function mergeArrays(arr1, arr2) {
    const map = new Map(arr1.map(item => [item._id.toString(), item]));
    
    arr2.forEach(item => {
      if (map.has(item._id.toString()) && map.get(item._id.toString()).completed !== item.completed) {
        map.get(item._id.toString()).completed = item.completed;
      }
    });
    
    return Array.from(map.values());
  }

router.post('/analyzeTask/:id', async (req, res) => {
  try {
      const { id } = req.params;   
      const objectId = new mongoose.Types.ObjectId(id);
      const findUser = await userModel.findById(objectId);
      if (!findUser) {
          return res.status(404).json({ message: "Пользователь не найден" });
      }

      const totalTask = await totalTaskModel.findOne({ user: findUser._id });
      const command = await userModel.findOne({ "mainTask.userId.id": id }) || {};
      const commandFilter = command.mainTask ? command.mainTask.filter(i => i.userId.some(i => i.id == id)) : [];


      const now = new Date();
      const day = format(now, "dd");
      const month = format(now, "MMMM");
      const year = format(now, "yyyy");

      if (!totalTask) {
          const createModel = await totalTaskModel.create({
              user: id,
              allTask: []
          });
          return res.status(201).json(createModel);
      }


      const filterTask = mergeArrays(totalTask.allTask, findUser.mainTask)
      
      const existingTaskIds = new Set(totalTask.allTask.map(task => task._id.toString()));
      const allTask = findUser.mainTask?.filter(task => !existingTaskIds.has(task._id.toString())) || [];
      const allTaskCommand = commandFilter?.filter(task => !existingTaskIds.has(task._id.toString())) || [];

      const CommandUdatedCompleted = updateCommandCompleted(commandFilter,id)

  
      
      const optimizedTask = allTask.map(({ _id, completed, deadline }) => 
          ({ _id, completed, deadline, day, month, year, status: 'user' })
      );

      const optimizedTaskCommand = allTaskCommand.map(({ _id, completed, deadline }) => 
          ({ _id, completed, deadline, day, month, year, status: 'command' })
      );

      

      if (optimizedTask.length) totalTask.allTask.push(...optimizedTask);
      if (optimizedTaskCommand.length) totalTask.allTask.push(...optimizedTaskCommand);
      
      
      const map = new Map(CommandUdatedCompleted.map(item => [item._id.toHexString(), item]));
          totalTask.allTask.forEach(i => {
        if (map.has(i._id.toHexString()) && map.get(i._id.toHexString()).completed !== i.completed) {
            i.completed = map.get(i._id.toHexString()).completed
        } 
      })

      await totalTask.save();

      res.status(200).json(totalTask);
  } 
  catch (e) {
      res.status(500).json({ error: e.message });
  }
});


module.exports = router;