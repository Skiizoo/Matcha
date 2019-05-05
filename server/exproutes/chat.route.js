const express = require('express');
const app = express.Router();
const chat = require('../models/chat/base');
const users = require('../models/users/base');

app.post('/getConversation', verifyAuthenticatedToken, async (req, res) => {
    try {
        if (req.body.user1 && req.body.user2) {
            var result = await chat.getConversation(req.body.user1, req.body.user2);
            res.status(200).send(result);
        } else 
            res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/getConversations', verifyAuthenticatedToken, async (req, res) => {
    try {
        if (req.body.nickname) {
            var result = await chat.getConversations(req.body.nickname);
            res.status(200).send(result);
        } else
            res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/createConversation', verifyAuthenticatedToken, async (req, res) => {
    try {
        if (req.body.user1 && req.body.user2) {
            var result = await chat.createConversation(req.body.user1, req.body.user2);
            res.status(200).send(result);
        } else 
            res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/lastMessage', verifyAuthenticatedToken, async (req, res) => {
    try {
        if (req.body.id !== undefined) {
            var result = await chat.lastMessage(req.body.id);
            res.status(200).send(result);
        } else
            res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/getMessages', verifyAuthenticatedToken, async (req, res) => {
    try {
        if (req.body.id !== undefined) {
            var result = await chat.getMessages(req.body.id);
            res.status(200).send(result);
        } else 
            res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/sendMessage', verifyAuthenticatedToken, async (req, res) => {
    try {
        if (req.body.nickname && req.body.id !== undefined && req.body.message && req.body.dest) {
            var result = await chat.sendMessage(req.body.nickname, req.body.id, req.body.message, req.body.dest);
            res.status(200).send(result);
        } else 
            res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

module.exports = app;

async function verifyAuthenticatedToken(req, res, next) {
    if (req.body.authenticatedToken) {
        var user = await users.getUser(req.body.nickname)
        req.body.authenticatedToken === user.authenticatedToken ? next() : res.status(403).send('You can\'t access this page')
    } else
        res.status(403).send('You can\'t access this page')
}