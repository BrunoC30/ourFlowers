const express = require('express');
const {createRoom, logRoom} = require('./socket/roomManager');

    const router = express.Router();

    router.get("/api/home",(req,res)=>{
        //cria sala automaticamente
        res.json(createRoom());
    })

    router.get("/api/sala",(req,res)=>{
        //entra na sala
        const reqID = req.query.roomID;
        const reqKey = req.query.key;
        
    })



module.exports = router;