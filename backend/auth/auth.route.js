const express = require('express');
const userModel = require('./auth.module.js');
const Command = require('../command/command.model.js')
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const getToken = require('../features/getToken.js');
require('dotenv').config();
const accessTokenSecret = process.env.JWT_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_SECRET
express().use(express.json());
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { default: mongoose } = require('mongoose');
const { authMiddleware } = require('../authMiddlewares/authMiddlewares.js');
express().use(cors({
    origin:process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"), // Папка для сохранения
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname), // Уникальное имя файла
});
  
const upload = multer({ storage });


router.post('/register',async (req, res)=>{
    const { username, lastname, login, password, role } = req.body;
    const checkUserExist = await userModel.findOne({ login });
    if(checkUserExist){
        return res.status(402).json('Such login already exist');
    }
    if(username && login && password && role && lastname){
        try{
        const userCreate = await userModel.create({
            username:username, 
            lastname:lastname,
            login:login,
            password:password,
            role:role,
            description:''
});
    res.status(200).json('User created' + userCreate);
    } catch(e){
    res.status(404).json('Error:' + e);
}
    }
    else{
        res.status(404).json('No create')
    }
});


router.post('/login',async (req, res)=>{
    try {
        const { login, password } = req.body;
        if(login && password){    
        const userFind = await userModel.findOne({ login });
        if(!userFind){
            return res.status(400).json({ message: 'User not found' });
        }
        const payload = {
            id: userFind._id.toString(),
            username: userFind.username,
            login:userFind.login,
            role:userFind.role
        };

        // login:  'useasfasfasf',
    const comparePassword = bcrypt.compareSync(password, userFind.password);
    if (comparePassword) {

        const accessToken = jwt.sign(
            payload, accessTokenSecret, { expiresIn: "15m" })
            const refreshToken = jwt.sign(payload, refreshTokenSecret, { expiresIn: "7d" });
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'None' });
        res.status(200).json(accessToken   )
    }
}else {
    res.status(400).json('No full param');
}
} catch(e){
    res.status(404).json('Error:' + e);

}});


router.get('/profile', authMiddleware, async (req, res)=>{    
try {
    const { id } = req.user; 
    const userFind = await userModel.findById(id);
     res.status(200).json({
        id:userFind._id, 
        username:userFind.username, 
        notification: userFind.notification || '', 
        breakTask:userFind.breakTask, 
        mainTask:userFind.mainTask,
        role:userFind.role,
        description:userFind.description,
        image:userFind.imageUrl,
        login:userFind.login,
        image:userFind.imageUrl
    });
    } catch(e){
        res.status(404).json('Error:' + e)
    }
});

router.put('/profile/edit',authMiddleware, async(req, res)=>{
    try {
        const profileData = req.user; 
        const { description, name } = req.body;

        const mongoProfileUser = await userModel.findByIdAndUpdate(
            profileData.id,   // ID пользователя
            { 
                username: name, 
                description: description 
            },
            { new: true }  // Возвращает обновленный документ
        );
        


        res.status(200).json({ description, name, profileData, mongoProfileUser });

    } catch(err){
        res.status(400).json('not' + err);
    } 
});

router.put('/profile/leave/:id', async(req, res)=>{
    try {
        res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'strict' });
        res.status(200).json('You logout');
    } catch(err){
        res.status(400).json('not' + err);
    } 
});

router.post('/profile/upload', authMiddleware, upload.single("image"), async(req, res)=>{
    try {
    
    const userToken = req.user; 
    const imageUrl = `https://working-project-teamsync.up.railway.app/uploads/${req.file.filename}`;
    const newImage = await userModel.findByIdAndUpdate(
        userToken.id, 
        { $set: { imageUrl: imageUrl } }, 
        { new: true } 
    );
    res.status(200).json(newImage);

} catch(err){
        res.status(400).json('not' + err);
    } 
})

router.delete('/profile/delete/:id',authMiddleware,  async(req, res)=>{
    try{
        const { id } = req.params;
        const objectId = new mongoose.Types.ObjectId(id);

        const findAdminId = await Command.findOne({ "users.id": id });
        const objectFindAdminId = new mongoose.Types.ObjectId(findAdminId?.admin);
        
          await userModel.findByIdAndDelete(objectId);
        
          await Command.updateOne(
            { "users.id": id }, 
            { $pull: { users: { id: id }}});
          await userModel.updateOne(
            { _id: objectFindAdminId },
            { $pull: { "mainTask.$[].userId": { id: id } } }
          );
      
          res.status(200).json('Profile Deleted')
    
        } catch(err){
        res.status(404).json('Error:' + err);
    }
})

module.exports = router;