const express = require('express')
const app = express.Router()
const oauth = require('../models/omniauth/omniauth')

app.route('/42').post(async function (req, res) {
    oauth.login42(req.body, res)
        .then(oauth.registerOrLogin)
        .then((data) => { res.send({ state: true, data: data.oauthUser, isUser: data.isUser }) }
        , (data) => {
            console.log(data.error)
            res.send({ state: false, data: data.error })
        }
    );
});

app.route('/github').post(async function (req, res) {
    oauth.logingithub(req.body, res)
        .then(oauth.registerOrLogin)
        .then((data) => res.send({ state: true, data: data.oauthUser, isUser: data.isUser })
        , (data) => {
            console.log(data.error)
            res.send({ state: false, data: data.error })
        }
    );
});

module.exports = app;