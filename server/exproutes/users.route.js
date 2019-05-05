const express = require('express')
const app = express.Router()
const users = require('../models/users/base')
const multer  = require('multer')
const upload = multer({ dest: '../client/public/img/uploads/' })

app.post('/login', async (req, res) => {
    try {
        if (req.body.user && req.body.user.login && req.body.api !== undefined) { 
			var result = await users.login(req.body.user.login, req.body.user.password, req.body.api);
            result.authenticatedToken = await users.generateKey()
            if (result.success) var result2 = await users.changeAuthenticatedToken(result.nickname, result.authenticatedToken)
            res.status(200).send(result);
        } else
            res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/register', async (req, res) => {
    try {
        var user = req.body;
        if (user && user.lastname && user.firstname && user.nickname && user.mail && user.password && user.passwordConfirm) {
            var result = await users.createUser(user.lastname, user.firstname, user.nickname, "", "", "", "", "", "", "", "", "", "", user.latitude, user.longitude, user.mail, user.password, user.passwordConfirm, req.ip);
            res.status(200).send(result);
        } else
            res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/checkMail', async (req, res) => {
    try {
        if (req.body.mail) {
            var result = await users.checkEmail(req.body.mail);
            res.status(200).send(result);
        } else
            res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/checkNickname', async (req, res) => {
    try {
        if (req.body.nickname) {
            var result = await users.checkNickName(req.body.nickname);
            res.status(200).send(result);
        } else
            res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/checkPassword', async (req, res) => {
    try {
        if (req.body.password) {
            var result = await users.checkPassword(req.body.password);
            res.status(200).send(result);
        } else
            res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/checkOldPassword', async (req, res) => {
    try {
        if (req.body.nickname && req.body.password) {
            var result = await users.checkOldPassword(req.body.nickname, req.body.password);
            res.status(200).send(result);
        } else
            res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/activate', async (req, res) => {
    try {
        if (req.body.nickname && req.body.token) {
            var result = await users.activateAccount(req.body.nickname, req.body.token);
            res.status(200).send(result);
        } else
            res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/forgotPass', async (req, res) => {
    try {
        if (req.body.mail) {
            var result = await users.forgotPass(req.body.mail);
            res.status(200).send(result);
        } else
            res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/changePass', async (req, res) => {
    try {
        if (req.body.password && req.body.nickname && req.body.key) {
            var result = await users.changeLostPass(req.body.nickname, req.body.key, req.body.password);
            res.status(200).send(result);
        } else
            res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/changePassword', verifyAuthenticatedToken, async (req, res) => {
    try {
        if (req.body.password && req.body.nickname) {
            var result = await users.changePassword(req.body.nickname, req.body.password);
            res.status(200).send(result);
        } else
            res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/changeGenre', verifyAuthenticatedToken, async (req, res) => {
    try {
        if (req.body.nickname && req.body.genre) {
            var result = await users.changeGenre(req.body.nickname, req.body.genre);
            res.status(200).send(result);
        } else
            res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/changeOrientation', verifyAuthenticatedToken, async (req, res) => {
    try {
        if (req.body.nickname && req.body.orientation) {
            var result = await users.changeOrientation(req.body.nickname, req.body.orientation);
            res.status(200).send(result);
        } else
            res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/changeDesc', verifyAuthenticatedToken, async (req, res) => {
    try {
        if (req.body.nickname && req.body.desc) {
            var result = await users.changeDesc(req.body.nickname, req.body.desc);
            res.status(200).send(result);
        } else
            res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/changeFirstname', verifyAuthenticatedToken, async (req, res) => {
    try {
		if (req.body.firstname && req.body.nickname) {
			var result = await users.changeFirstname(req.body.nickname, req.body.firstname);
			res.status(200).send(result);
		} else
			res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/changeLastname', verifyAuthenticatedToken, async (req, res) => {
    try {
		if (req.body.nickname && req.body.lastname) {
			var result = await users.changeLastname(req.body.nickname, req.body.lastname);
			res.status(200).send(result);
		} else
			res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/changeTags', verifyAuthenticatedToken, async (req, res) => {
    try {
		if (req.body.nickname && req.body.tags) {
			var result = await users.changeTags(req.body.nickname, req.body.tags);
			res.status(200).send(result);
		} else
			res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/changeMail', verifyAuthenticatedToken, async (req, res) => {
    try {
		if (req.body.nickname && req.body.mail) {
			var result = await users.changeMail(req.body.nickname, req.body.mail);
			res.status(200).send(result);
		} else
			res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/getUser', verifyAuthenticatedToken, async (req, res) => {
    try {
		if (req.body.user) {
			var result = await users.getUser(req.body.user);
			res.status(200).send(result);
		} else
			res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/getUserByAuthToken', async (req, res) => {
    try {
		if (req.body.authenticatedToken) {
			var result = await users.getUserByAuthToken(req.body.authenticatedToken);
			res.status(200).send(result);
        }
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/addLike', verifyAuthenticatedToken, async (req, res) => {
    try {
		if (req.body.user && req.body.like) {
			var result = await users.addLike(req.body.user, req.body.like);
			res.status(200).send(result);
		} else
			res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/removeLike', verifyAuthenticatedToken, async (req, res) => {
    try {
		if (req.body.user && req.body.like) {
			var result = await users.removeLike(req.body.user, req.body.like);
			res.status(200).send(result);
		} else 
			res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/isLike', verifyAuthenticatedToken, async (req, res) => {
    try {
		if (req.body.user && req.body.like) {
			var result = await users.isLike(req.body.user, req.body.like);
			res.status(200).send(result);
		} else 
			res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/isRelation', verifyAuthenticatedToken, async (req, res) => {
    try {
		if (req.body.user1 && req.body.user2) {
			var result = await users.isRelation(req.body.user1, req.body.user2);
			res.status(200).send(result);
		} else 
			res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/sendRate', verifyAuthenticatedToken, async (req, res) => {
    try {
		if (req.body.rate && req.body.user1 && req.body.user2) {
			var result = await users.sendRate(req.body.rate, req.body.user1, req.body.user2);
			res.status(200).send(result);
		} else 
			res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/isRate', verifyAuthenticatedToken, async (req, res) => {
    try {
		if (req.body.user1 && req.body.user2) {
			var result = await users.isRate(req.body.user1, req.body.user2);
			res.status(200).send(result);
		} else 
			res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/getRates', verifyAuthenticatedToken, async (req, res) => {
    try {
		if (req.body.user) {
			var result = await users.getPopularity(req.body.user);
			res.status(200).send(result);
		} else
			res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/newVisit', verifyAuthenticatedToken, async (req, res) => {
    try {
		if (req.body.nickname) {
			var result = await users.newVisit(req.body.nickname);
			res.status(200).send(result);
		} else 
			res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/lastVisit', verifyAuthenticatedToken, async (req, res) => {
    try {
		if (req.body.nickname) {
			var result = await users.lastVisit(req.body.nickname);
			res.status(200).send(result);
		} else 
			res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/imOnline', verifyAuthenticatedToken, async (req, res) => {
    try {
		if (req.body.nickname) {
			var result = await users.imOnline(req.body.nickname);
			res.status(200).send(result);
		} else
			res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/imOffline', verifyAuthenticatedToken, async (req, res) => {
    try {
		if (req.body.nickname) {
			var result = await users.imOffline(req.body.nickname);
			res.status(200).send(result);
		} else 
			res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/getOnline', verifyAuthenticatedToken, async (req, res) => {
    try {
		if (req.body.nickname) {
			var result = await users.getOnline(req.body.nickname);
			res.status(200).send(result);
		} else 
			res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/getSearchedUsers', verifyAuthenticatedToken, async (req, res) => {
    try {
		if (req.body.nickname && req.body.sort) {
			var result = await users.getSearchedUsers(req.body.nickname, req.body.search, req.body.sort);
			res.status(200).send(result);
		} else
			res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/checkBirthDate', verifyAuthenticatedToken, async (req, res) => {
    try {
	    var result = await users.checkBirthDate(req.body.birthDate);
		res.status(200).send(result);
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/changeBirthDate', verifyAuthenticatedToken, async (req, res) => {
    try {
		if (req.body.nickname && req.body.birthDate) {
			var result = await users.changeBirthDate(req.body.nickname, req.body.birthDate);
			res.status(200).send(result);
		} else 
			res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/getRecommandedUsers', verifyAuthenticatedToken, async (req, res) => {
    try {
		if (req.body.nickname && req.body.sort) {
			var result = await users.getRecommandedUsers(req.body.nickname, req.body.sort);
			res.status(200).send(result);
		} else 
			res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/getSortedUsers', verifyAuthenticatedToken, async (req, res) => {
    try {
		if (req.body.users && req.body.nickname && req.body.sort) {
			var result = await users.getSortedUsers(req.body.users, req.body.nickname, req.body.sort);
			res.status(200).send(result);
		} else 
			res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/changeLatitude', verifyAuthenticatedToken, async (req, res) => {
    try {
		if (req.body.nickname && req.body.latitude) {
			var result = await users.changeLatitude(req.body.nickname, req.body.latitude);
			res.status(200).send(result);
		} else
			res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/changeLongitude', verifyAuthenticatedToken, async (req, res) => {
    try {
		if (req.body.nickname && req.body.longitude) {
			var result = await users.changeLongitude(req.body.nickname, req.body.longitude);
			res.status(200).send(result);
		} else 
			res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/getNotifications', verifyAuthenticatedToken, async (req, res) => {
    try {
		if (req.body.nickname) {
			var result = await users.getNotifications(req.body.nickname);
			res.status(200).send(result);
		} else 
			res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/setNotificationsToNull', verifyAuthenticatedToken, async (req, res) => {
    try {
		if (req.body.id) {
			var result = await users.setNotificationsToNull(req.body.id);
			res.status(200).send(result);
		} else 
			res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/addBlock', verifyAuthenticatedToken, async (req, res) => {
    try {
		if (req.body.nickname && req.body.block) {
			var result = await users.addBlock(req.body.nickname, req.body.block);
			res.status(200).send(result);
		} else
			res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/removeBlock', verifyAuthenticatedToken, async (req, res) => {
    try {
		if (req.body.nickname && req.body.block) {
			var result = await users.removeBlock(req.body.nickname, req.body.block);
			res.status(200).send(result);
		} else
			res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/getBlocks', verifyAuthenticatedToken, async (req, res) => {
    try {
		if (req.body.nickname) {
			var result = await users.getBlocks(req.body.nickname);
			res.status(200).send(result);
		} else 
			res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/reportUser', verifyAuthenticatedToken, async (req, res) => {
    try {
		if (req.body.emitter && req.body.receiver) {
			var result = await users.reportUser(req.body.emitter, req.body.receiver);
			res.status(200).send(result);
		} else 
			res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/getReportedUser', verifyAuthenticatedToken, async (req, res) => {
    try {
		if (req.body.emitter && req.body.receiver) {
			var result = await users.getReportedUser(req.body.emitter, req.body.receiver);
			res.status(200).send(result);
		} else 
			res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/addVisiters', verifyAuthenticatedToken, async (req, res) => {
    try {
		if (req.body.hosts && req.body.visiter) {
			var result = await users.addVisiters(req.body.hosts, req.body.visiter);
			res.status(200).send(result);
		} else 
			res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/getVisiters', verifyAuthenticatedToken, async (req, res) => {
    try {
		if (req.body.hosts) {
			var result = await users.getVisiters(req.body.hosts);
			res.status(200).send(result);
		} else 
			res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/getLikes', verifyAuthenticatedToken, async (req, res) => {
    try {
		if (req.body.hosts) {
			var result = await users.getLikes(req.body.hosts);
			res.status(200).send(result);
		} else 
			res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/changePictures', upload.single('file'), async (req, res) => {
    try {
		if (req.body.user && req.body.index) {
			var result = await users.changePictures(req.body.user, req.file, req.body.index);
			res.status(200).send(result);
		} else 
			res.status(403).send('Parameters aren\'t valid')
    } catch (err) {
        console.log(err);
        res.status(400).send("a problem with the db");
    }
});

app.post('/registerByOauth', async (req, res) => {
    try {
        var user = req.body;
		if (user.nickname) {
			var result = await users.createUser(user.lastname, user.firstname, user.nickname, "", "", "", "", "", "", "", "", "", user.profilePicture, user.latitude, user.longitude, user.email, '', '', req.ip, 1);
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
        try {
            if (req.body.nickname) {
                var user = await users.getUser(req.body.nickname)
                req.body.authenticatedToken === user.authenticatedToken ? next() : res.status(403).send('You can\'t access this page')
            } else
                res.status(403).send('You can\'t acces this page')
        } catch (err) {
            console.log(err)
            res.status(400)
        }
    } else
        res.status(403).send('You can\'t access this page')
}