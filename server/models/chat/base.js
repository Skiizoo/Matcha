

module.exports.getConversation = function (user1, user2) {
    var stmt = database.prepare('SELECT * FROM `conversation` WHERE nickname1 = ? AND nickname2 = ? OR nickname1 = ? AND nickname2 = ?');
    var res = stmt.get(user1, user2, user2, user1);

    return res;
};

module.exports.getConversations = function (nickname) {
    var stmt = database.prepare('SELECT * FROM `conversation` WHERE nickname1 = ? OR nickname2 = ? ORDER BY date DESC');
    var res = stmt.all(nickname, nickname);

    return res;
};

module.exports.createConversation = function (user1, user2) {
    var date = new Date().toISOString().
        replace(/T/, ' ').      // replace T with a space
        replace(/\..+/, '');
    var stmt = database.prepare('INSERT INTO conversation (nickname1, nickname2, date) VALUES (?, ?, ?)');
    var res = stmt.run(user1, user2, date);

    return res;
};

module.exports.lastMessage = function (id) {
    var stmt = database.prepare('SELECT * FROM `message` WHERE id_conversation = ? ORDER BY date DESC');
    var res = stmt.get(id);

    return res;
};

module.exports.getMessages = function (id) {
    var stmt = database.prepare('SELECT * FROM `message` WHERE id_conversation = ? ORDER BY date ASC');
    var res = stmt.all(id);

    return res;
};

module.exports.sendMessage = function (nickname, id, message, receiving) {
    var date = new Date().toISOString().
        replace(/T/, ' ').      // replace T with a space
        replace(/\..+/, '');
    var stmt = database.prepare('INSERT INTO message (id_conversation, nickname_user, content, date, receiving) VALUES (?, ?, ?, ?, ?)');
    var res = stmt.run(id, nickname, message, date, receiving);

    var stmt = database.prepare('SELECT * FROM notifications WHERE receiver = ? AND notifications = ? AND new = 1')
    var res = stmt.all(receiving, 'Tu as reçu de nouveaux messages')

    if (res.length === 0) {
        var stmt = database.prepare('INSERT INTO notifications (emetter, receiver, notifications, new) VALUES (?, ?, ?, 1)');
        var res = stmt.run(nickname, receiving, 'Tu as reçu de nouveaux messages');
    }

    var stmt = database.prepare('UPDATE conversation SET date = ? WHERE id = ?');
    var res = stmt.run(date, id);

    return res;
};