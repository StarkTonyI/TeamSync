const express = require('express');
const authRouter =  require('./auth/auth.route.js');
const adminRouter = require('./admin/admin.route.js');
const userRouter = require('./user/user.route.js')
const adminCommand = require('./command/adminCommand/adminCommand.route.js');
const userCommand = require('./command/userCommand/userCommand.route.js');
const message = require('./messages/messages.route.js');
const analyzeTaskUser = require('./analyzeUser/analyzeUser.route.js');
const analyzeTaskAdmin = require('./analyzeAdmin/analyzeAdmin.route.js')
const jwt = require('jsonwebtoken')
const ws = require('ws');
const cors = require('cors');
const cookie = require('cookie-parser');
const mongoose = require('mongoose');
const app = express();
const Message = require('./messages/messages.model.js');
const fs = require('fs')
const multer = require('multer');
const path = require('path');
require('dotenv').config();
const { auth, checkRole, authMiddleware } = require("./authMiddlewares/authMiddlewares.js");
const PORT = process.env.PORT || 3000;
const accessTokenSecret = process.env.JWT_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_SECRET
const dayjs = require('dayjs')

app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

/*
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(204);
});
*/

app.use("/uploads", express.static("uploads")); // Раздаём загруженные файлы

app.use(cookie());
mongoose.connect(process.env.MONGO_URL);


app.use('/api/auth',  authRouter);
app.use('/api/admin', authMiddleware, adminRouter);

app.use('/api/user', authMiddleware,  userRouter);
app.use('/api/messages',authMiddleware, message);

app.use('/api/command/user',authMiddleware, userCommand);
app.use('/api/command/admin',authMiddleware, adminCommand);

app.use('/api/analyze/user',authMiddleware, analyzeTaskUser);
app.use('/api/analyze/admin', authMiddleware, analyzeTaskAdmin);


app.get('/refresh', (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ message: "Токен отсутствует" });

  // Проверяем refresh-токен
  jwt.verify(refreshToken, refreshTokenSecret, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Недействительный токен" });

      // Создаём новый access-токен
      const accessToken = jwt.sign({ 
        id: decoded.id, 
        role: decoded.role,
        login:decoded.login,
        username:decoded.username
      }, accessTokenSecret, { expiresIn: "15m" });

      res.json({ accessToken });
  });
});

app.use((req, res, next) => {
  if (req.originalUrl.startsWith("/api")) {
    return next(); // API пусть отдает 404, если нет маршрута
  }
  //res.sendFile(path.join(__dirname, "public", "index.html")); // Отдаём фронтовый React
});

app.use((req, res) => {
  res.status(404).json({ message: "404 - Не найдено" });
});

const server = app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
const wss = new ws.WebSocketServer({server});

wss.on('connection', (connection, req)=>{
 
  const notifyAboutOnlinePeople = () => {
    [...wss.clients].forEach(client=>{
        client.send(JSON.stringify({
            online:[...wss.clients].map(c => ({
                id:c.id,
                username:c.userName
            }))
        })
    )})
}

connection.isAlive = true;

connection.timer = setInterval(() => {
  connection.ping();
  connection.deathTimer = setTimeout(() => {
    connection.isAlive = false;
    clearInterval(connection.timer);
    connection.terminate();
    notifyAboutOnlinePeople();
    console.log('dead');
  }, 1000);
}, 5000);

connection.on('pong', () => {
  clearTimeout(connection.deathTimer);
});



const cookies = req.headers.cookie;

if(cookies){
  const tokenCookieString = cookies.replace(/^refreshToken=/, '');
   if (tokenCookieString) {
    //const token = tokenCookieString.split('=')[1];   
          jwt.verify(tokenCookieString, refreshTokenSecret, {}, (err, userData) => {
            if (err) throw err;
            const { id, username } = userData;
            connection.id = id;
            connection.userName = username;
          });
   }
}

connection.on('message', async (message) => {
    const messageData = JSON.parse(message);
    const { messageText, sender, recipient, file, _id  } = messageData;

    const date = dayjs().toDate();
    let filename = null;
   
    if (file) {     
       const parts = file.name.split('.');
       const ext = parts[parts.length - 1];
       filename = Date.now() + '.' + ext;
       const path = __dirname + '/uploads/' + filename;
       const bufferData = Buffer.from(file.data.split(',')[1], 'base64');
 
       fs.writeFile(path, bufferData, () => {
         console.log('file saved:' + path);
       });
  } 
    if((messageText || file) && sender && recipient && _id){
         
      const messageDoc = await Message.create({
            _id: new mongoose.Types.ObjectId(_id), 
            messageText:messageText,
            deleteNotMy:[],
            sender:sender, 
            recipient:recipient,
            file: file ? filename : null,
     });

    [...wss.clients]
      .filter(c => c.id === recipient)
      .forEach(c=> c.send(JSON.stringify({
          messageText,
          sender,
          recipient,
          file: file ? filename : null,
          _id:messageDoc._id,
          createdAt:Date.now().toString(),
      })
    ));    
  }}
);

notifyAboutOnlinePeople()
})


