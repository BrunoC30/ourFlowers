const express = require('express');
const {createRoom} = require('./socket/roomManager');

    const router = express.Router();

    router.get("/api/home",(req,res)=>{
        //cria sala automaticamente
        res.json(createRoom());
    })



module.exports = router;