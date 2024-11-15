const router = require('express').Router();
const express = require('express');
const userRepository = require('../repositories/userRepository');
const utils = require('../utils');

router.tokens = new Map();

router.post('/login', express.urlencoded(), (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = userRepository.getUserByUsernameAndPassword(username, password);

    if (!user){
        return res.status(401).json({
            success: false,
            error: 'Invalid Credentials'
        });
    }

    const token = utils.generateRandomString(60);

    router.tokens.set(token, user.id);

    return res.status(200).json({
        success: true,
        token: token
    });
});



module.exports = router;