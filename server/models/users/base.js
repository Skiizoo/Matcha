//src/models/users/base.js
const objectUser = require('./user')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const iplocation = require('iplocation').default
const fs = require('fs')

var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: 'XXXXXX',
		pass: 'XXXXXX'
	}
});

/**
 * Get an User
 * @param {string} nickName
 */
module.exports.getUser = function (nickName) {

	if (!nickName) return;

	nickName = nickName.toLowerCase();
	var stmt = database.prepare('SELECT * FROM `user` WHERE nickName = ?');
	var res = stmt.get(nickName);

	if (!res) return undefined;

	var user = new objectUser(res);
	return user;
};

/**
 * Get an User
 * @param {string} nickName
 */
module.exports.getUserByAuthToken = function (token) {

	if (!token) return;

	var stmt = database.prepare('SELECT * FROM `user` WHERE authenticatedToken = ?');
	var res = stmt.get(token);

	if (!res) return undefined;

	var user = new objectUser(res);
	return user;
};

/**
 * Get a lot of Users
 * @param {string} search
 */
module.exports.getUsers = function (search) {

	if (!search) return;

	search = search.toLowerCase(); 
	var stmt = database.prepare('SELECT nickName FROM `user` WHERE nickName LIKE ? LIMIT 9');
	var res = stmt.all(search + '%');

	if (!res) return undefined;

	return res;
};

/**
 * Get an User by an ID
 * @param {string} id
 */
module.exports.getUserById = function (id) {

	if (!id) return;

	var stmt = database.prepare('SELECT * FROM `user` WHERE id = ?');
	var res = stmt.get(id);

	if (!res) return undefined;

	var user = new objectUser(res)
	return user;
};

/**
 * Get an User by an mail
 * @param {string} mail
 */
module.exports.getUserByMail = function (mail) {

	if (!mail) return;

	var stmt = database.prepare('SELECT * FROM `user` WHERE email = ?');
	var res = stmt.get(mail);

	if (!res) return undefined;

	var user = new objectUser(res)
	return user;
};

/**
 * Create an User
 * 
 */
module.exports.createUser = function (lastName, firstName, nickName, gender, birthDate, description, interest, orientation, picture1, picture2, picture3, picture4, profilePicture, latitude, longitude, email, password, password_conf, ip, api) {
	/**
    * Empty if the account is valid
    * @type {string}
    */

	if (this.checkError(nickName, email, password, password_conf, api)) return { value: this.error, enumerable: true };

    if (latitude === '' && longitude === '') {
        iplocation(ip, [latitude, longitude], (error, res) => {
			if (res) {
				latitude = res.latitude !== null ? res.latitude : 45.7477113
				longitude = res.longitude !== null ? res.longitude : 4.82409989999996
			} else {
				latitude = 45.7477113
				longitude = 4.82409989999996
			}
		});
	}
	
	var userTemplate = {
		lastName: lastName,
		firstName: firstName,
		nickName: nickName.toLowerCase(),
		gender: gender,
		birthDate: birthDate,
		description: description,
		interest: interest,
		orientation: orientation === '' ? 3 : orientation,
		picture1: picture1,
		picture2: picture2,
		picture3: picture3,
		picture4: picture4,
		profilePicture: profilePicture,
		latitude: latitude,
		longitude: longitude,
		popularity: 0,
		email: email.toLowerCase(),
		salt: this.generateSalt(),
		password: '',
		dateCreated: Date('Y-m-j'),
		tokenLost: null,
		tokenVerif: this.generateKey(),
		authenticatedToken: null
	};
		
	if (!api)
		userTemplate.password = this.encryptPassword(password, userTemplate.salt)
	
	var user = new objectUser(userTemplate),
	value = user.get();
	
	database.insert("user", value);
	
	var message = !api ? `<a href='http://localhost:8080/activate/${userTemplate.nickName}/${userTemplate.tokenVerif}'>Cliquez ici</a> pour confirmer le compte` : `Vous venez de lier votre compte 42. Bravo :)`;
	if (email !== '') this.sendMail(email, "Confirmation de compte Matcha", message);

	return user;
}

/**
* Check the validity of the nickName (length && regex) && if he already exists in the database
* @param {string} nickname nickname of the user
* @returns {string}
*/
module.exports.checkNickName = function (nickName) {

	if (!nickName) return;

	nickName = nickName.toLowerCase();
	var regex = /^([a-zA-Z0-9-_.]){6,20}$/;
	if (!regex.test(nickName))
		return 'Le pseudo doit contenir 6 à 20 caractères alphanumériques';

	var stmt = database.prepare('SELECT nickName FROM `user` WHERE nickName = ?');
	if (!stmt) return "Un problème avec la bdd est survenue";
	if (stmt.get(nickName) !== undefined) return `Le pseudo "${nickName}" est déjà utilisé`;

	return;
}

/**
 * Check the validity of the password (length and ===)
 * @param {string} mail mail of the user
 * @returns {string}
 */
module.exports.checkEmail = function (mail, api) {
	if (api && !mail)
		return;

	mail = mail.toLowerCase();
	var regex = /^([a-zA-Z0-9-_.]){3,40}@([a-zA-Z0-9-_.]){3,40}\.([a-zA-Z0-9-_.]){1,40}$/;
	if (!regex.test(mail))
		return 'Le mail n\'est pas dans le bon format';

	var stmt = database.prepare('SELECT email FROM `user` WHERE email = ?');

	if (!stmt) return "Un problème avec la bdd est survenue";
	if (stmt.get(mail) !== undefined) return `Le mail "${mail}" est déjà utilisé`;
	
	return;
}

/**
 * Check the validity of the password (length and ===)
 * @param {string} password password of the user
 * @param {string} password_conf password confirmation of the user
 * @returns {string}
 */
module.exports.checkPassword = function (password) {

	if (!password) return;

	var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
	if (!regex.test(password))
		return 'Pas de caractéres spéciaux. Majuscule, minuscule, un chiffre et 8 caractères min';
	return;
}

/**
 * Check the validity of the password via database
 * @param {string} password password of the user
 * @returns {string}
 */
module.exports.checkOldPassword = async function (nickname, oldPassword) {

	if (!nickname || !oldPassword) return;

	var user = await this.getUser(nickname)
		encryptPassword = this.encryptPassword(oldPassword, user.salt)
	if (encryptPassword === user.password) return true
	return false
}

/**
 * Check all errors before creating an account
 * @param {string} nickName nickName of the user
 * @param {string} email email of the user
 * @param {string} password password of the user
 * @param {string} password_conf second password of the user
 * @return {boolean}
 */
module.exports.checkError = function (nickName, email, password, password_conf, api) {
	var res, error = Array();

	if ((res = this.checkNickName(nickName)) !== undefined)                error.push({ "nickname": res });
	if ((res = this.checkEmail(email, api)) !== undefined)                      error.push({ "email": res });
	if (!api && (res = this.checkPassword(password, password_conf)) !== undefined) error.push({ "password": res });
	
	if (error.length ? true : false) {
		this.error = error;
		return true;
	}
	return false;
}

/**
 * Generate random salt for password security
 * @returns {string} 
 */
module.exports.generateSalt = function () {
	var salt = '',
		chaine = 'abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (var i = 0; i < 18; i++)
        salt += chaine[Math.floor(Math.random() * Math.floor(64)) % chaine.length];
    return salt;
}

/**
 * Encrypt password with md5 hash
 * @param {string} password password of the user
 * @returns {string}
 */
module.exports.encryptPassword = function (password, salt) {
	return crypto.createHash('whirlpool').update(password + salt).digest('hex');
}

/**
 * Generate random key for email validation or password reset
 * @returns {string}
 */
module.exports.generateKey = function () {
	var key = '',
		chaine = 'abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

	for (var i = 0; i < 36; i++)
		key += chaine[Math.floor(Math.random() * Math.floor(64)) % chaine.length];
	return key + crypto.createHash('md5').digest('hex');
}

/**
 * Auth
 * @param {string} nickName Nickname of the user
 * @param {string} password Password of the user
 * @return {object} { success: false/true, res: (comment) }
 */
module.exports.login = async function (nickName, password, api) {

	if (!nickName) return;

	nickName = nickName.toLowerCase();
	var request = database.selectOne(`user`, {
		'nickName': nickName
	}),
		user = request.res;
	
	// Problem with the database
	if (debug && !request.success) console.log(user.err);
	if (!request.success) return { success: false, res: 'Un problème avec la base de donnée est survenu' };

	// User not exist in the database
	if (user === undefined) return { success: false, res: 'Cet utilisateur n\'existe pas' };

	if (!api) {
		// Active Account
		if (user.tokenVerif) return { success: false, res: 'Votre compte n\'est pas encore activé'};
		
		var password_encrypt = this.encryptPassword(password, user.salt);

		// Check the password
		if (user.password === password_encrypt)
			return { success: true, res: 'Connexion réussi', id: user.id, nickname: user.nickName, authenticatedToken: user.authenticatedToken };
		return { success: false, res: 'Le mot de passe est incorrect' };
	}
	return { success: true, res: 'Connexion réussi', id: user.id, nickname: user.nickName, authenticatedToken: user.authenticatedToken };
}

/**
 * sendMail
 * @param {string} mail
 * @param {string} subject
 * @param {string} message
 */
module.exports.sendMail = function (mail, subject, message) {

	if (!mail || !subject || !message) return;

	var mailOptions = {
		from: "solarys02@gmail.com",
		to: mail,
		subject: subject,
		html: message
	};
	transporter.sendMail(mailOptions, function(error, info){
		if (error) return console.log(error);
	});
}

/**
 * activate an Account
 * @param {string} nickname
 * @param {string} token
 */
module.exports.activateAccount = async function (nickname, token) {

	if (!nickname || !token) return;

	var user = await this.getUser(nickname);
	if (user.tokenVerif === token) {
		user.tokenVerif = null;
		return { success: true, res: "Votre compte a été validé" };
	} else if (user.tokenVerif === null)
		return { success: false, res: "Votre compte est déjà validé" };
	return { success: false, res: "Impossible de valider votre compte" };
}

/**
 * send a mail for a lost password
 * @param {string} mail
 */
module.exports.forgotPass = async function (mail) {

	if (!mail) return;

	var key = this.generateKey();
	try {
		var user = await this.getUserByMail(mail);
		user.tokenLost = key;

		var message = `<a href='http://localhost:8080/changepass?nickname=${user.nickName}&key=${user.tokenLost}'>Cliquez ici</a> pour changer votre mot de passe`;
		this.sendMail(mail, "Changement de mot de passe Matcha", message);
		return true;
	} catch (err) {
		return false;
	}
}

/**
 * change the password when is lost
 * @param {string} nickname
 * @param {string} key
 * @param {string} password
 */
module.exports.changeLostPass = async function (nickname, key, password) {

	if (!nickname || !key || !password) return;

	var user = await this.getUser(nickname.toLowerCase());

	if (!user) return "Cet utilisateur n'éxiste pas";
	if (user.tokenLost !== key) return "Le token est incorrect";

	user.password = this.encryptPassword(password, user.salt);
	user.tokenLost = null;
	return;
}

/**
 * change the password on settings page
 * @param {string} nickname
 * @param {string} password
 */
module.exports.changePassword = async function (nickname, password) {

	if (!nickname || !password) return;

	var user = await this.getUser(nickname.toLowerCase())
	user.password = this.encryptPassword(password, user.salt)
}

/**
 * Change genre
 * @param {string} Nickname
 * @param {string} genre
 */ 
module.exports.changeGenre = async function (nickname, genre) {

	if (!nickname || !genre) return;

	var user = await this.getUser(nickname.toLowerCase());
	user.gender = genre;
}

/**
 * Change orientation
 * @param {string} Nickname
 * @param {string} orientation
 */ 
module.exports.changeOrientation = async function (nickname, orientation) {

	if (!nickname || !orientation) return;

	var user = await this.getUser(nickname.toLowerCase());
	user.orientation = orientation;
}

/**
 * Change desc
 * @param {string} Nickname
 * @param {string} description
 */ 
module.exports.changeDesc = async function (nickname, desc) {

	if (!nickname || !desc) return;

	var user = await this.getUser(nickname.toLowerCase());
	user.description = desc;
}

/**
 * Change tags
 * @param {string} Nickname
 * @param {string} tags
 */ 
module.exports.changeTags = async function (nickname, tags) {

	if (!nickname || !tags) return;

	var user = await this.getUser(nickname.toLowerCase())
	user.interest = JSON.stringify(tags);
}

/**
 * Change firstname
 * @param {string} Nickname
 * @param {string} firstname
 */ 
module.exports.changeFirstname = async function (nickname, firstname) {

	if (!nickname || !firstname) return;

	var user = await this.getUser(nickname.toLowerCase());
	user.firstName = firstname;
}

/**
 * Change lastname
 * @param {string} Nickname
 * @param {string} lastname
 */ 
module.exports.changeLastname = async function (nickname, lastname) {

	if (!nickname || !lastname) return;

	var user = await this.getUser(nickname.toLowerCase());
	user.lastName = lastname;
}

/**
 * Change email
 * @param {string} Nickname
 * @param {string} Email
 */ 
module.exports.changeMail = async function (nickname, email) {

	if (!nickname || !email) return;

	var user = await this.getUser(nickname.toLowerCase());
	user.email = email;
}
/**
 * Change authenticatedToken
 * @param {string} Nickname
 * @param {string} Token
 */ 
module.exports.changeAuthenticatedToken = async function (nickname, token) {

	if (!nickname || !token) return;

	var user = await this.getUser(nickname.toLowerCase());
	user.authenticatedToken = token;
}

/**
 * Change pictures
 * @param {string} nickname
 * @param {string} pictures
 */ 
module.exports.changePictures = async function (nickname, picture, index) {

	if (!nickname || !picture || index === undefined) return;

	var user = await this.getUser(nickname.toLowerCase());
		
	if (!picture) {
		if (index === '0' ) user.profilePicture = ''
		if (index === '1' ) user.picture1 = ''
		if (index === '2' ) user.picture2 = ''
		if (index === '3' ) user.picture3 = ''
		if (index === '4' ) user.picture4 = ''
		return { success: true, infos: '' }
	}
	if (picture.size > 500000) {
		fs.unlink(picture.path, (err) => { if (err) console.error(err) })
		return { success: false, infos: 'Taille de fichier supérieur à 500kb' }
	}
	var extension =  picture.originalname.split('.').reverse()[0]
	if (extension !== 'jpg' && extension !== 'png') {
		fs.unlink(picture.path, (err) => { if (err) console.error(err) })
		return { success: false, infos: 'Votre image doit être jpg/png' }
	}
	var path = '../client/public/img/uploads/' + index + '_' + user.nickName + '.' + extension
	fs.rename(picture.path, path, (err) => { if (err) console.error(err) })
	if (index === '0' ) user.profilePicture = '/img/uploads/0_' + user.nickName + '.' + extension
	if (index === '1' ) user.picture1 = '/img/uploads/1_' + user.nickName + '.' + extension
	if (index === '2' ) user.picture2 = '/img/uploads/2_' + user.nickName + '.' + extension
	if (index === '3' ) user.picture3 = '/img/uploads/3_' + user.nickName + '.' + extension
	if (index === '4' ) user.picture4 = '/img/uploads/4_' + user.nickName + '.' + extension
	return { success: true, infos: '' }
}

/**
 * Insert into table user who like and the one who get liked
 * @param {string} like
 */ 
module.exports.addLike = async function (user, like) {

	if (!user || !like) return;

    var stmt = database.prepare('INSERT INTO likes (user, like) VALUES (?, ?)');
	var res = stmt.run(user, like);
	var isRelation = await this.isRelation(user, like)

	var notifs = isRelation ? 'Tu as un nouveau match : ' + user : 'Tu plais à ' + user 
	this.setNotifications(user, like, notifs)

    return isRelation;
}

module.exports.removeLike = async function (user, like) {

	if (!user || !like) return;

    var stmt = database.prepare('DELETE FROM likes WHERE user = ? AND like = ?');
	var res = stmt.run(user, like);
	
	this.setNotifications(user, like, user + ' ne t\'aime plus désolé..')

    return res;
}

module.exports.isLike = async function (user, like) {

	if (!user || !like) return;

	var stmt = database.prepare('SELECT * FROM likes WHERE user = ? AND like = ?');
    var res = stmt.get(user, like);

    return res;
}

module.exports.isRelation = async function (user1, user2) {

	if (!user1 || !user2) return;

	var stmt = database.prepare('SELECT * FROM likes WHERE user = ? AND like = ?');
	var res = stmt.get(user1, user2);
	var res2 = stmt.get(user2, user1);
	
	if (res && res2) return true;
	return false;
}

module.exports.sendRate = async function (rate, user, user_rate) {

	if (!rate || !user || !user_rate) return;

	var stmt = database.prepare('INSERT INTO rates (user, user_rate, rate) VALUES (?, ?, ?)');
	var res = stmt.run(user, user_rate, rate);

	var stmt2 = database.prepare('UPDATE user SET popularity = ? WHERE nickName = ?')
	var rate = await this.getRates(user_rate)
	var res2 = stmt2.run(rate['AVG(rate)'], user_rate)

	return res;
}

module.exports.isRate = async function (user, user_rate) {

	if (!user || !user_rate) return;

	var stmt = database.prepare('SELECT * FROM rates WHERE user = ? AND user_rate = ?');
	var res = stmt.get(user, user_rate);
	
	return res;
}

module.exports.getRates = async function (user) {

	if (!user) return;

	var stmt = database.prepare('SELECT AVG(rate) FROM rates WHERE user_rate = ?');
	var res = stmt.get(user);
	
	return res;
}

module.exports.getPopularity = async function (user) {
	
	if (!user) return;

	var user = await this.getUser(user)
	
	return user;
}

module.exports.lastVisit = async function (nickname) {

	if (!nickname) return;

    var stmt = database.prepare('SELECT lastVisited FROM user WHERE nickName = ?');
	var res = stmt.get(nickname);

	return res;
}

module.exports.getOnline = async function (nickname) {

	if (!nickname) return;
	var stmt = database.prepare('SELECT online FROM user WHERE nickName = ?');
	var res = stmt.get(nickname);
	
	return res;
}

/**
 * Insert into user table the latitude of the user
 * @param {number} latitude
 */ 
module.exports.changeLatitude = async function (nickname, latitude) {

	if (!nickname || latitude === undefined) return;

	var user = await this.getUser(nickname.toLowerCase());
	user.latitude = latitude;
}

/**
 * Insert into user table the longitude of the user
 * @param {number} longitude
 */ 
module.exports.changeLongitude = async function (nickname, longitude) {

	if (!nickname || longitude === undefined) return;

	var user = await this.getUser(nickname.toLowerCase());
	user.longitude = longitude;
}

/**
 * 
 */
module.exports.convertRad = function(deg) {
	return ((Math.PI * deg) / 180)
}

/**
 * 
 */
module.exports.getDistance = function(latA, lngA, latB, lngB) {
	latA = this.convertRad(latA)
	latB = this.convertRad(latB)
	lngA = this.convertRad(lngA)
	lngB = this.convertRad(lngB)
	return ((6378000 * (Math.PI / 2 - Math.asin( Math.sin(latB) * Math.sin(latA) + Math.cos(lngB - lngA) * Math.cos(latB) * Math.cos(latA)))) / 1000) 
}

/**
 * Returns the age of the user
 * @param {Date} birthDate YYYY-MM-DD
 */
module.exports.getAge = function(birthday) {
	birthday = new Date(birthday)
	return new Number((new Date().getTime() - birthday.getTime()) / 31536000000).toFixed(0)
}

/**
 * Get sorted users
 * @param {Object} users users who need to be sorted
 * @param {Object} user user connected
 * @param {Object} sort the sort for the research {age, distance, tags, popularity}
 */
module.exports.getSortedUsers = async function (users, nickName, sort) {

	if (!users || !nickName || !sort) return;
	
	var sortedRes = [],
		user = await this.getUser(nickName.toLowerCase())

	users.forEach(async elmt => {
		var distance = await this.getDistance(user.latitude, user.longitude, elmt.latitude, elmt.longitude),
			age = await this.getAge(elmt.birthDate)

		if (user.block && user.block.length > 0) {
			var array = JSON.parse(user.block)
			var blocked = array.filter(elt => {
				return elt === elmt.nickName
			})
			if (blocked.length === 0) {
				if (distance <= sort.valueDistance &&
					age >= sort.valueAge[0] && age <= sort.valueAge[1] &&
					elmt.popularity >= sort.valuePopularity[0] && elmt.popularity <= sort.valuePopularity[1])
				sortedRes.push(elmt)
				if (sort.valueTags[0])
					sort.valueTags.forEach(tag => {
						if (!elmt.interest.includes(tag))
							if (sortedRes.indexOf(elmt) >= 0)
								sortedRes.pop()
					})
			}
		} else {
			if (distance <= sort.valueDistance &&
				age >= sort.valueAge[0] && age <= sort.valueAge[1] &&
					elmt.popularity >= sort.valuePopularity[0] && elmt.popularity <= sort.valuePopularity[1])
				sortedRes.push(elmt)
			if (sort.valueTags[0])
				sort.valueTags.forEach(tag => {
					if (!elmt.interest.includes(tag))
						if (sortedRes.indexOf(elmt) >= 0)
							sortedRes.pop()
				})
		}
		if (elmt.profilePicture === '')
			sortedRes.pop()
	})

	return sortedRes
}

/**
 * Get searched users
 * @param {string} nickname the nickname of the user
 * @param {string} search the result of the search
 * @param {Object} sort the sort for the research {age, distance, tags, popularity}
 */
module.exports.getSearchedUsers = async function (nickname, search, sort) {

	if (!nickname || !sort) return;

	search = search.toLowerCase()
	var stmt = database.prepare('SELECT * FROM `user` WHERE nickName LIKE ? AND nickName != ?'),
		res = stmt.all('%' + search + '%', nickname),
		sortedRes = await this.getSortedUsers(res, nickname, sort)

	return sortedRes
};

/**
 * Check birthDate and return if the user is > 18 yo
 * @param {string} birthDate
 */
module.exports.checkBirthDate = async function(birthDate) {

	if (!birthDate) return;

	var age = await this.getAge(birthDate)
	return age >= 18
}

/**
 * Change birthDate
 * @param {string} nickname
 * @param {string} birthDate
 */ 
module.exports.changeBirthDate = async function (nickname, birthDate) {

	if (!nickname || !birthDate) return;

	var user = await this.getUser(nickname.toLowerCase())
	user.birthDate = birthDate
}

module.exports.getNotifications = async function (nickname) {

	if (!nickname) return;

	var stmt = database.prepare('SELECT * FROM `notifications` WHERE receiver = ? AND new = 1'),
		res = stmt.all(nickname)

	return res
}

module.exports.setNotifications = async function (emetter, receiver, message) {

	if (!emetter || !receiver || !message) return;

	var stmt = database.prepare('INSERT INTO `notifications` (emetter, receiver, notifications, new) VALUES (?, ?, ?, 1)'),
		res = stmt.run(emetter, receiver, message)
}

module.exports.setNotificationsToNull = async function (id) {

	if (!id) return;

	var stmt = database.prepare('UPDATE `notifications` SET new = 0 WHERE id = ?'),
		res = stmt.run(id)
}


/**
 * Recommandations (minimum 15 utilisateurs)
 *  Disponible uniquement si l'utilisateur a renseigné un profil étendu
 *  Tri dans l'ordre :
 *    - Tri par orientation sexuelle
 *        -> Si non renseignée alors le résultat contiendra Homme et Femme
 *    - Tri par proximité géographique < 10km
 *        -> Si résultat < 15, on modifie a 20km
 *        -> Si résultat < 15, on modifie a 50km
 *        -> Si résultat < 15, on modifie a 200km
 *        -> Si résultat < 15, on modifie a 500km
 *    - Tri par matching centre d'intérets >= 4
 *        -> si résultat < 15, on modifie a >= 3
 *        -> si résultat < 15, on modifie a >= 2
 *        -> si résultat < 15, on modifie a >= 1
 *        -> si résultat < 15, on modifie a >= 0
 *    - Tri par score de popularité = 5
 *        -> Si résultat < 15, on modifie >= 4
 *        -> Si résultat < 15, on modifie >= 3
 *        -> Si résultat < 15, on modifie >= 2
 *        -> Si résultat < 15, on modifie >= 1
 *        -> Si résultat < 15, on modifie >= 0
 * ====> Dans tous les cas, le tri par géolocalisation/tags/âge/popularité sera de nouveau disponible
 */
/**
 * Get Recommanded users
 * @param {string} nickname the nickname of the user
 * @param {Object} sort the sort for the research {age, distance, tags, popularity}
 */
module.exports.getRecommandedUsers = async function(nickname, sort) {
	if (!nickname || !sort) return

	var user = await this.getUser(nickname),
		stmt,
		res,
		tmpRes = []

	if (user.orientation === 3) {
		stmt = database.prepare('SELECT * FROM `user` WHERE nickName != ? AND (orientation == 3 OR orientation == ?)')
		res = stmt.all(user.nickName, user.gender)
	} else {
		stmt = database.prepare('SELECT * FROM `user` WHERE nickName != ? AND (orientation == 3 OR orientation == ?) AND gender == ?')
		res = stmt.all(user.nickName, user.gender, user.orientation)
	}

	var sortDistance = [ 10, 20, 50, 200, 500 ],
		sortByDist = vue => (element, index, array) => {
			return (this.getDistance(vue.user.latitude, vue.user.longitude, element.latitude, element.longitude) <= vue.dist)
		}
	for (let i = 0; i < sortDistance.length; i++) {
		var obj = { vue: this, user: user, dist: sortDistance[i] }
		tmpRes = await res.filter(sortByDist(obj))
		if (tmpRes.length >= 15) {
			res = tmpRes
			sort.valueDistance = sortDistance[i]
			break
		}
	}

	var sortTags = [4, 3, 2, 1, 0],
		intersect = function (a, b) {
			var t
			if (b.length > a.length) t = b, b = a, a = t
			return a.filter(function (e) {
				return b.indexOf(e) > -1
			});
		},
		sortByTags = vue => (element, index, array) => {
			var res = intersect(JSON.parse(vue.user.interest), JSON.parse(element.interest))
			return (res.length >= vue.conditions)
		}
	for (let i = 0; i < sortTags.length; i++) {
		var obj = { user: user, conditions: sortTags[i] }
		tmpRes = await res.filter(sortByTags(obj))
		if (tmpRes.length >= 15) {
			sort.valueTags = []
			res = tmpRes
			break
		}
	}

	var sortPopularity = [ [5, 5], [4, 5], [3, 5], [2, 5], [1, 5], [0, 5] ],
		sortByPop = popularity => (element, index, array) => {
			return (element.popularity >= popularity[0] && element.popularity <= popularity[1])
		}
	for(let i = 0; i < sortPopularity.length; i++) {
		tmpRes = await res.filter(sortByPop(sortPopularity[i]))
		if (tmpRes.length >= 15) {
			res = tmpRes
			sort.valuePopularity = sortPopularity[i]
			break
		}
	}

	var comparePop = function(a, b) {
		if (a.popularity > b.popularity)
			return -1
		return 0
	}

	return { recommandedUsers: res.sort(comparePop), sortedOptions: sort }
}

module.exports.addBlock = async function (nickname, block) {

	if (!nickname || block === undefined) return;

	var user = await this.getUser(nickname.toLowerCase()),
		blocks = user._block ? JSON.parse(user._block) : [];
	
	blocks.push(block);
	user.block = JSON.stringify(blocks);

	return true;
}

module.exports.removeBlock = async function (nickname, block) {

	if (!nickname || block === undefined) return;

	var user = await this.getUser(nickname.toLowerCase()),
		blocks = user._block ? JSON.parse(user._block) : [];
	
	blocks.splice(blocks.indexOf(block), 1);
	user.block = JSON.stringify(blocks);

	return true;
}

module.exports.getBlocks = async function (nickname) {

	if (!nickname) return;

	var stmt = database.prepare('SELECT block FROM user WHERE nickName = ?');
	var res = stmt.get(nickname.toLowerCase());
	
	return res;
}

module.exports.reportUser = async function (emitter, receiver) {

	if (!emitter || !receiver) return;

	var reported = await this.getReportedUser(emitter, receiver)

	if (!reported) {
		var stmt = database.prepare('INSERT INTO report (emitter, receiver) VALUES (?, ?)');
		var res = stmt.run(emitter, receiver);
		return true
	}
	var stmt = database.prepare('DELETE FROM report WHERE emitter = ? AND receiver = ?');
	var res = stmt.run(emitter, receiver);
	
	return false;
}

module.exports.getReportedUser = async function (emitter, receiver) {

	if (!emitter || !receiver) return;
	
	var stmt = database.prepare('SELECT * FROM report WHERE emitter = ? AND receiver = ?')
	var res = stmt.all(emitter, receiver)

	if (res.length > 0)
		return true

	return false;
}

module.exports.addVisiters = async function (hosts, visiter) {

	if (!hosts || !visiter) return;
	
	var stmt = database.prepare('SELECT * FROM visits WHERE host = ? AND visiter = ?')
	var res = stmt.get(hosts, visiter)

	if (res) return 

	var stmt = database.prepare('INSERT INTO visits (host, visiter) VALUES (?, ?)')
	var res = stmt.run(hosts, visiter)

	this.setNotifications(visiter, hosts, visiter + ' vient de te rendre visite...')

	return res
}

module.exports.getVisiters = async function (hosts) {

	if (!hosts) return;

	var stmt = database.prepare('SELECT DISTINCT user.nickName, user.profilePicture FROM visits, user WHERE visits.host = ? AND visits.visiter = user.nickName ORDER BY visits.id DESC LIMIT 10')
	var res = stmt.all(hosts)

	return res
}

module.exports.getLikes = async function (hosts) {

	if (!hosts) return;

	var stmt = database.prepare('SELECT DISTINCT user.nickName, user.profilePicture FROM likes, user WHERE likes.like = ? AND likes.user = user.nickName ORDER BY likes.id DESC LIMIT 10')
	var res = stmt.all(hosts)

	return res
}
