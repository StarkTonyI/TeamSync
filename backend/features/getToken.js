const jwtSecret = 'aaifja89fjas98jfasfj8';
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
const express = require('express');
express().use(cookie());
 
const getToken = (req) => {
    const token = req.cookies.token;
    return new Promise((resolve, reject)=>{
        if(token){
         jwt.verify(token, jwtSecret, {}, (err, userData) => {
          if (err) throw err;
          resolve(userData);
        })}
        else{
            reject('Error - no token')
        }
    })

};  

module.exports = getToken;