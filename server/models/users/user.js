/**
 * The User class
 */


class objectUser {

  /**
   * @param {string} lastName The lastname of the user
   * @param {string} firstName The firstname of the user
   * @param {string} nickName The nickname of the user
   * @param {number} gender The gender of the user
   * @param {?Date} birthDate The birthdate of the user
   * @param {string} description The description of the user
   * @param {string} interest The interest {array} of the user
   * @param {number} orientation The orientation of the user
   * @param {string} picture1 The url picture of the user
   * @param {string} picture2 The url picture of the user
   * @param {string} picture3 The url picture of the user
   * @param {string} picture4 The url picture of the user
   * @param {string} profilePicture The url profilepicture of the user
   * @param {number} latitude The latitude of the user
   * @param {number} longitude The latitude of the user
   * @param {string} email The email of the user
   * @param {string} password The password of the user
   * @param {string} salt The salt of the user
   * @param {?Date} dateCreated The creation date of the user
   * @param {string} tokenLost The key token for lost password of the user
   * @param {string} tokenVerif The key token for registration of the user
   * @param {string} block User block
   * @example
   * // Create a new User
   * var user = new User('BROGGI', 'Thomas', 'tbroggi', '1', 'tbroggi@student.le-101.fr', 'admin');
   */
	constructor(user) {
		Object.defineProperty(this, 'id', { value: user.id, enumerable: true, configurable: true });

		/**
		 * The lastname of the user
		 * @private
		 * @type {string}
		 */
		Object.defineProperty(this, '_lastName', { value: user.lastName, enumerable: true, configurable: true });

		/**
		 * The firstname of the user
		 * @private
		 * @type {string}
		 */
		Object.defineProperty(this, '_firstName', { value: user.firstName, enumerable: true, configurable: true });

		/**
		 * The nickname of the user
		 * @private
		 * @type {string}
		 */
		//check
		Object.defineProperty(this, '_nickName', { value: user.nickName, enumerable: true, configurable: true });

		/**
		 * The gender of the user
		 * @private
		 * @type {number}
		 */
		Object.defineProperty(this, '_gender', { value: user.gender, enumerable: true, configurable: true });

		/**
		 * The birthdate of the user
		 * @private
		 * @type {?Date}
		 */
		Object.defineProperty(this, '_birthDate', { value: user.birthDate, enumerable: true, configurable: true });

		/**
		 * The description of the user
		 * @private
		 * @type {string}
		 */
		Object.defineProperty(this, '_description', { value: user.description, enumerable: true, configurable: true });

		/**
		 * The interest {array} of the user
		 * @private
		 * @type {object}
		 */
		Object.defineProperty(this, '_interest', { value: user.interest, enumerable: true, configurable: true });

		/**
		 * The orientation of the user
		 * @private
		 * @type {number}
		 */
		Object.defineProperty(this, '_orientation', { value: user.orientation, enumerable: true, configurable: true });

		/**
		 * The popularity of the user
		 * @private
		 * @type {number}
		 */
		Object.defineProperty(this, '_popularity', { value: user.popularity, enumerable: true, configurable: true });

		/** The url picture1 of the user
		 * @private
		 * @type {object}
		 */
		Object.defineProperty(this, '_picture1', { value: user.picture1, enumerable: true, configurable: true });
		
		/**
		 * The url picture2 of the user
		 * @private
		 * @type {object}
		 */
		Object.defineProperty(this, '_picture2', { value: user.picture2, enumerable: true, configurable: true });
		
		/**
		 * The url picture3 of the user
		 * @private
		 * @type {object}
		 */
		Object.defineProperty(this, '_picture3', { value: user.picture3, enumerable: true, configurable: true });
		
		/**
		 * The url picture4 of the user
		 * @private
		 * @type {object}
		 */
		Object.defineProperty(this, '_picture4', { value: user.picture4, enumerable: true, configurable: true });

		/**
		 * The url profilepicture of the user
		 * @private
		 * @type {string}
		 */
		Object.defineProperty(this, '_profilePicture', { value: user.profilePicture, enumerable: true, configurable: true });

		/**
		 * The url latitude of the user
		 * @private
		 * @type {string}
		 */
		Object.defineProperty(this, '_latitude', { value: user.latitude, enumerable: true, configurable: true });
		
		/**
		 * The url longitude of the user
		 * @private
		 * @type {string}
		 */
		Object.defineProperty(this, '_longitude', { value: user.longitude, enumerable: true, configurable: true });

		/**
		 * The email of the user
		 * @private
		 * @type {string}
		 */
		//check
		Object.defineProperty(this, '_email', { value: user.email, enumerable: true, configurable: true });

		/**
		 * The password of the user
		 * @private
		 * @type {string}
		 */
		//add confirm to check
		Object.defineProperty(this, '_password', { value: user.password, enumerable: true, configurable: true });

		/**
		 * The salt of the user
		 * @private
		 * @type {string}
		 */
		Object.defineProperty(this, '_salt', { value: user.salt, enumerable: true, configurable: true });

		/**
		 * The date of the user's last visit
		 * @private
		 * @type {?Date}
		 */
		Object.defineProperty(this, '_lastVisited', { value: user.lastVisited, enumerable: true, configurable: true });

		/**
		 * is the user connected or not
		 * @private
		 * @type {?Date}
		 */
		Object.defineProperty(this, '_online', { value: user.online, enumerable: true, configurable: true });

		/**
		 * The creation date of the user
		 * @private
		 * @type {?Date}
		 */
		Object.defineProperty(this, '_dateCreated', { value: user.dateCreated, enumerable: true, configurable: true });

		/**
		 * The key token for lost password of the user
		 * @private
		 * @type {string}
		 */
		Object.defineProperty(this, '_tokenLost', { value: user.tokenLost, enumerable: true, configurable: true });

		/**
		 * The key token for registration of the user
		 * @private
		 * @type {string}
		 */
		Object.defineProperty(this, '_tokenVerif', { value: user.tokenVerif, enumerable: true, configurable: true });

		/**
		 * @private
		 * @type {string}
		 */
		Object.defineProperty(this, '_block', { value: user.block, enumerable: true, configurable: true });

		/**
		 * @private
		 * @type {string}
		 */
		Object.defineProperty(this, '_authenticatedToken', { value: user.authenticatedToken, enumerable: true, configurable: true });
	}
	
	get lastName() { return this.id };
	/**
	 * Get the value of lastName variable
	 * @returns {string}
	 */
	get lastName() { return this._lastName };
		/**
	 * Get the value of lastName variable
	 * @returns {string}
	 */
	get firstName() { return this._firstName };
		/**
	 * Get the value of nickName variable
	 * @returns {string}
	 */
	get nickName() { return this._nickName };
		/**
	 * Get the value of gender variable
	 * @returns {string}
	 */
	get gender() { return this._gender };
	/**
	 * Get the value of birthDate variable
	 * @returns {string}
	 */
	get birthDate() { return this._birthDate };
		/**
	 * Get the value of description variable
	 * @returns {string}
	 */
	get description() { return this._description };
		/**
	 * Get the value of interest variable
	 * @returns {string}
	 */
	get interest() { return this._interest };
		/**
	 * Get the value of orientation variable
	 * @returns {string}
	 */
	get orientation() { return this._orientation };
	/**
	 * Get the value of popularity variable
	 * @returns {string}
	 */
	get popularity() { return this._popularity };
	/**
	 * Get the value of picture1 variable
	 * @returns {string}
	 */
	get picture1() { return this._picture1 };
	/**
	 * Get the value of picture2 variable
	 * @returns {string}
	 */
	get picture2() { return this._picture2 };
	/**
	 * Get the value of picture3 variable
	 * @returns {string}
	 */
	get picture3() { return this._picture3 };
	/**
	 * Get the value of picture4 variable
	 * @returns {string}
	 */
	get picture4() { return this._picture4 };
	/**
	 * Get the value of profilePicture variable
	 * @returns {string}
	 */
	get profilePicture() { return this._profilePicture };
	/**
	 * Get the value of latitude variable
	 * @returns {string}
	 */
	get latitude() { return this._latitude };
	/**
	 * Get the value of longitude variable
	 * @returns {string}
	 */
	get longitude() { return this._longitude };
	/**
	 * Get the value of email variable
	 * @returns {string}
	 */
	get email() { return this._email };
	/**
	 * Get the value of password variable
	 * @returns {string}
	 */
	get password() { return this._password };
	/**
	 * Get the value of salt variable
	 * @returns {string}
	 */
	get salt() { return this._salt };
	/**
	 * Get the value of lastVisited variable
	 * @returns {string}
	 */
	get lastVisited() { return this._lastVisited };
	/**
	 * Get the value of online variable
	 * @returns {string}
	 */
	get online() { return this._online };
	/**
	 * Get the value of dateCreated variable
	 * @returns {string}
	 */
	get dateCreated() { return this._dateCreated };
	/**
	 * Get the value of tokenLost variable
	 * @returns {string}
	 */
	get tokenLost() { return this._tokenLost };
	/**
	 * Get the value of tokenVerif variable
	 * @returns {string}
	 */
	get tokenVerif() { return this._tokenVerif };
	/**
	 * @returns {string}
	 */
	get block() { return this._block };
	/**
	 * @returns {string}
	 */
	get authenticatedToken() { return this._authenticatedToken };

	/**
	 * Set the value of lastName variable
	 * @returns {string}
	 */
	set lastName(lastName) {
		var stmt = database.prepare(`UPDATE \`user\` SET lastName = ? WHERE nickName = ?`);
		stmt.run(lastName, this.nickName);
		Object.defineProperty(this, '_lastName', { value: lastName });
	};

	/**
	 * Set the value of firstName variable
	 * @returns {string}
	 */
	set firstName(firstName) {
		var stmt = database.prepare(`UPDATE \`user\` SET firstName = ? WHERE nickName = ?`);
		stmt.run(firstName, this.nickName);
		Object.defineProperty(this, '_firstName', { value: firstName });
	};

	/**
	 * Set the value of nickName variable
	 * @returns {string}
	 */
	set nickName(nickName) {
		var stmt = database.prepare(`UPDATE \`user\` SET nickName = ? WHERE nickName = ?`);
		stmt.run(nickName, this.nickName);
		Object.defineProperty(this, '_nickName', { value: nickName });
	};

	/**
	 * Set the value of gender variable
	 * @returns {string}
	 */
	set gender(gender) {
		var stmt = database.prepare(`UPDATE \`user\` SET gender = ? WHERE nickName = ?`);
		stmt.run(gender, this.nickName);
		Object.defineProperty(this, '_gender', { value: gender });
	};

	/**
	 * Set the value of birthDate variable
	 * @returns {string}
	 */
	set birthDate(birthDate) {
		var stmt = database.prepare(`UPDATE \`user\` SET birthDate = ? WHERE nickName = ?`);
		stmt.run(birthDate, this.nickName);
		Object.defineProperty(this, '_birthDate', { value: birthDate });
	};

	/**
	 * Set the value of description variable
	 * @returns {string}
	 */
	set description(description) {
		var stmt = database.prepare(`UPDATE \`user\` SET description = ? WHERE nickName = ?`);
		stmt.run(description, this.nickName);
		Object.defineProperty(this, '_description', { value: description });
	};

	/**
	 * Set the value of interest variable
	 * @returns {string}
	 */
	set interest(interest) {
		var stmt = database.prepare(`UPDATE \`user\` SET interest = ? WHERE nickName = ?`);
		stmt.run(interest, this.nickName);
		Object.defineProperty(this, '_interest', { value: interest });
	};

	/**
	 * Set the value of orientation variable
	 * @returns {string}
	 */
	set orientation(orientation) {
		var stmt = database.prepare(`UPDATE \`user\` SET orientation = ? WHERE nickName = ?`);
		stmt.run(orientation, this.nickName);
		Object.defineProperty(this, '_orientation', { value: orientation });
	};

	/**
	 * Set the value of popularity variable
	 * @returns {number}
	 */
	set popularity(popularity) {
		var stmt = database.prepare(`UPDATE \`user\` SET popularity = ? WHERE nickName = ?`);
		stmt.run(popularity, this.nickName);
		Object.defineProperty(this, '_popularity', { value: orientation });
	};

	/**
	 * Set the value of picture1 variable
	 * @returns {string}
	 */
	set picture1(picture1) {
		var stmt = database.prepare(`UPDATE \`user\` SET picture1 = ? WHERE nickName = ?`);
		stmt.run(picture1, this.nickName);
		Object.defineProperty(this, '_picture1', { value: picture1 });
	};

	/**
	 * Set the value of picture2 variable
	 * @returns {string}
	 */
	set picture2(picture2) {
		var stmt = database.prepare(`UPDATE \`user\` SET picture2 = ? WHERE nickName = ?`);
		stmt.run(picture2, this.nickName);
		Object.defineProperty(this, '_picture2', { value: picture2 });
	};

	/**
	 * Set the value of picture3 variable
	 * @returns {string}
	 */
	set picture3(picture3) {
		var stmt = database.prepare(`UPDATE \`user\` SET picture3 = ? WHERE nickName = ?`);
		stmt.run(picture3, this.nickName);
		Object.defineProperty(this, '_picture3', { value: picture3 });
	};

	/**
	 * Set the value of picture4 variable
	 * @returns {string}
	 */
	set picture4(picture4) {
		var stmt = database.prepare(`UPDATE \`user\` SET picture4 = ? WHERE nickName = ?`);
		stmt.run(picture4, this.nickName);
		Object.defineProperty(this, '_picture4', { value: picture4 });
	};

	/**
	 * Set the value of profilePicture variable
	 * @returns {string}
	 */
	set profilePicture(profilePicture) {
		var stmt = database.prepare(`UPDATE \`user\` SET profilePicture = ? WHERE nickName = ?`);
		stmt.run(profilePicture, this.nickName);
		Object.defineProperty(this, '_profilePicture', { value: profilePicture });
	};

	/**
	 * Set the value of latitude variable
	 * @returns {string}
	 */
	set latitude(latitude) {
		var stmt = database.prepare(`UPDATE \`user\` SET latitude = ? WHERE nickName = ?`);
		stmt.run(latitude, this.nickName);
		Object.defineProperty(this, '_latitude', { value: latitude });
	};

	/**
	 * Set the value of longitude variable
	 * @returns {string}
	 */
	set longitude(longitude) {
		var stmt = database.prepare(`UPDATE \`user\` SET longitude = ? WHERE nickName = ?`);
		stmt.run(longitude, this.nickName);
		Object.defineProperty(this, '_longitude', { value: longitude });
	};

	/**
	 * Set the value of email variable
	 * @returns {string}
	 */
	set email(email) {
		var stmt = database.prepare(`UPDATE \`user\` SET email = ? WHERE nickName = ?`);
		stmt.run(email, this.nickName);
		Object.defineProperty(this, '_email', { value: email });
	};

	/**
	 * Set the value of password variable
	 * @returns {string}
	 */
	set password(password) {
		var stmt = database.prepare(`UPDATE \`user\` SET password = ? WHERE nickName = ?`);
		stmt.run(password, this.nickName);
		Object.defineProperty(this, '_password', { value: password });
	};

	/**
	 * Set the value of salt variable
	 * @returns {string}
	 */
	set salt(salt) {
		var stmt = database.prepare(`UPDATE \`user\` SET salt = ? WHERE nickName = ?`);
		stmt.run(salt, this.nickName);
		Object.defineProperty(this, '_salt', { value: salt });
	};

	/**
	 * Set the value of lastVisited variable
	 * @returns {string}
	 */
	set lastVisited(lastVisited) {
		var stmt = database.prepare(`UPDATE \`user\` SET lastVisited = ? WHERE nickName = ?`);
		stmt.run(lastVisited, this.nickName);
		Object.defineProperty(this, '_lastVisited', { value: lastVisited });
	};

	/**
	 * Set the value of online variable
	 * @returns {string}
	 */
	set online(online) {
		var stmt = database.prepare(`UPDATE \`user\` SET online = ? WHERE nickName = ?`);
		stmt.run(online, this.nickName);
		Object.defineProperty(this, '_online', { value: online });
	};

	/**
	 * Set the value of dateCreated variable
	 * @returns {string}
	 */
	set dateCreated(dateCreated) {
		var stmt = database.prepare(`UPDATE \`user\` SET dateCreated = ? WHERE nickName = ?`);
		stmt.run(dateCreated, this.nickName);
		Object.defineProperty(this, '_dateCreated', { value: dateCreated });
	};

	/**
	 * Set the value of tokenLost variable
	 * @returns {string}
	 */
	set tokenLost(tokenLost) {
		var stmt = database.prepare(`UPDATE \`user\` SET tokenLost = ? WHERE nickName = ?`);
		stmt.run(tokenLost, this.nickName);
		Object.defineProperty(this, '_tokenLost', { value: tokenLost });
	};
	
	/**
	 * Set the value of tokenVerif variable
	 * @returns {string}
	 */
	set tokenVerif(tokenVerif) {
		var stmt = database.prepare(`UPDATE \`user\` SET tokenVerif = ? WHERE nickName = ?`);
		stmt.run(tokenVerif, this.nickName);
		Object.defineProperty(this, '_tokenVerif', { value: tokenVerif });
	};
		
	/**
	 * @returns {string}
	 */
	set block(block) {
		var stmt = database.prepare(`UPDATE \`user\` SET block = ? WHERE nickName = ?`);
		stmt.run(block, this.nickName);
		Object.defineProperty(this, '_block', { value: block });
	};
		
	/**
	 * @returns {string}
	 */
	set authenticatedToken(authenticatedToken) {
		var stmt = database.prepare(`UPDATE \`user\` SET authenticatedToken = ? WHERE nickName = ?`);
		stmt.run(authenticatedToken, this.nickName);
		Object.defineProperty(this, '_authenticatedToken', { value: authenticatedToken });
	};

	/**
	 * Validate email of the user and add him to the database
	 */
	//
	validateEmail() {
		this.setTokenVerif(null);
	}

	/**
	 * Get all informations of the user
	 */
	get() {
		return {
			"id": this.id,
			"lastName": this.lastName,
			"firstName": this.firstName,
			"nickName": this.nickName,
			"gender": this.gender,
			"birthDate": this.birthDate,
			"description": this.description,
			"interest": this.interest,
			"orientation": this.orientation,
			"popularity": this.popularity,
			"picture1": this.picture1,
			"picture2": this.picture2,
			"picture3": this.picture3,
			"picture4": this.picture4,
			"profilePicture": this.profilePicture,
			"latitude": this.latitude,
			"longitude": this.longitude,
			"email": this.email,
			"password": this.password,
			"salt": this.salt,
			"online": this.online,
			"lastVisited": this.lastVisited,
			"dateCreated": this.dateCreated,
			"tokenLost": this.tokenLost,
			"tokenVerif": this.tokenVerif,
			"block": this.block,
			"authenticatedToken": this.authenticatedToken
		};
	}

}

module.exports = objectUser;