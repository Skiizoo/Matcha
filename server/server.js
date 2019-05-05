const express = require('express');
const bodyParser = require('body-parser');
const users = require('./exproutes/users.route');
const chat = require('./exproutes/chat.route');
const omniauth = require('./exproutes/omniauth.route');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PROPFIND');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    next();
});
app.use('/users', users);
app.use('/chat', chat);
app.use('/login', omniauth);

var port = process.env.PORT || 4000;

require('./config/bdd')

const server = app.listen(port, () => { console.log('Matcha server online in port:', port); });

var connectedUsers = [];

const io = require('socket.io')(server, { pingTimeout: 60000 });
io.on('connection', (socket) => {

    socket.on('USER_LOGIN', (data) => {
        var users = {}
        users.customId = data
        database.update('user', data, { online: 1 })
        users.userId = socket.id
        connectedUsers.push(users)
    });

    socket.on('USER_LOGOUT', () => {
        connectedUsers = connectedUsers.filter( (user) => {
            var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
            if (user.userId == socket.id)
                database.update('user', user.customId, { online: 0, lastVisited: date, authentificatedToken: null })
            return user.userId != socket.id
        })
    });

    socket.on('SEND_MESSAGE', (data) => {
        io.emit('MESSAGE', data);
    });

    socket.on('NOTIFS', (data) => {
        var test = connectedUsers.filter( (user) => { return user.customId === data.userNotified })
        if (test.length === 1) io.to(test[0].userId).emit('SHOW_NOTIFS', '')
    });

    socket.on('USER_DATA', (data) => {
        var test = connectedUsers.filter( (user) => { return user.customId === data.user })
        if (test.length === 1) io.to(test[0].userId).emit('GET_DATA', '')
    });

    socket.on('USER_MSG', (data) => {
        var test = connectedUsers.filter( (user) => { return user.customId === data.userTargetted })
        if (test.length === 1) io.to(test[0].userId).emit('GET_USRMSG', data.user)
    });

});