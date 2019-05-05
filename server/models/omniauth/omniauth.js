const Promise = require('promise')
const request = require('request')
const user = require('../users/base')

module.exports.login42 = (body, res) => {
    return  new Promise( (fullfil, reject) => {
        var data = { res: res, args: body }
        request.post({
            url: 'https://api.intra.42.fr/oauth/token',
            json: true,
            body: {
                grant_type: 'authorization_code',
                client_id: '01dac0c084ae2a6ac29ee0a880d2769e731682b34478bd75a8849dfd1650f08c',
                client_secret: '81fa82ff71cb6198ffb878256e9fa43e3eacaf18fac55754dcebdc87293ba056',
                code: data.args.oauthCode,
                redirect_uri: 'http://localhost:8080/oauth/42'
            }
        }, (error, response, body) => {
            if (error)
                reject({ res: data.res, error: 'Invalid token' })
            else {
                if (response.body.error)
                    reject({res: data.res, error: response.body.error_description})
                data.oauthToken = response.body.access_token
                request.get({
                    url: 'https://api.intra.42.fr/v2/me?access_token=' + data.oauthToken,
                    json: true
                }, (error, response, body) => {
                    if (error)
                        reject({ res: data.res, error: 'API issues' })
                    else {
                        if (response.body.error)
                            reject({ res: data.res, error: response.body.error_description })
                        data.oauthUser = { firstname: response.body.first_name, lastname: response.body.last_name ,nickname: 'le101_' + response.body.login, email: response.body.email, profilePicture: response.body.image_url, latitude: '', longitude: '' }
                        fullfil(data)
                    }
                })
            }
        })
    })
}

module.exports.logingithub = (body, res) => {
    return new Promise( (fullfil, reject) => {
		var data = { res: res, args: body }
        request.post({
            url: 'https://github.com/login/oauth/access_token',
            json: true,
            body: {
                grant_type: 'authorization_code',
                client_id: 'a92145361450ff616ae0',
                client_secret: 'f08c1bc322a126ce9ed13cb13acb950dee3aa565',
                code: data.args.oauthCode,
				redirect_uri: 'http://localhost:8080/oauth/github',
            }
        }, (error, response, body) => {
            if (error)
                reject({ res: data.res, error: 'Invalid token' })
            else {
                if (response.body.error)
					reject({ res: data.res, error: response.body.error_description })
				data.oauthToken = response.body.access_token
				request.get({
					url: 'https://api.github.com/user?access_token=' + data.oauthToken,
					json: true,
					headers: { 'User-Agent': '' }
				}, (error, response, body) => {
					if (error)
                        reject({ res: data.res, error: 'API issues' })
                    else {
                        if (response.body.error)
                            reject({ res: data.res, error: response.body.error_description })
                        data.oauthUser = { firstname: '', lastname: '', nickname: 'github_' + response.body.login, email: '', profilePicture: response.body.avatar_url, latitude: '', longitude: '' }
                        fullfil(data)
                    }
				})
            }
        })
    })
}

module.exports.registerOrLogin = async function (data) {
    try {
        var isUser = await user.getUser(data.oauthUser.nickname)
        data.isUser = isUser ? true : false
        return (data)
    } catch (err) {
        console.error(err)
    }
}