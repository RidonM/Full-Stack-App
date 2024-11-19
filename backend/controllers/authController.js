const router = require('express').Router();
const express = require('express');
const userRepository = require('../repositories/userRepository');
const tokenRepository = require('../repositories/tokenRepository');

router.post('/login', express.json(), (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = userRepository.getUserByUsernameAndPassword(username, password);

    if (!user){
        return res.status(401).json({
            success: false,
            error: 'Invalid Credentials'
        });
    }

    const {token, expiryDate} = tokenRepository.newTokenForUser(user.id);

    return res.status(200).json({
        success: true,
        data: {
            token: token,
            expiryDate: expiryDate
        }
    });
});



module.exports = router;