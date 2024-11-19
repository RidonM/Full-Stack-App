const utils = require('../utils');

let tokens = new Map();

exports.getDataForToken = (token) => {
    if(!tokens.has(token)){
        return null;
    }

    const data = tokens.get(token);

    if (data.expiryDate < Date.now()){
        tokens.delete(token);
        return null;
    }

    return data;
}

exports.deleteToken = (token) => {
    tokens.delete(token);
}

exports.newTokenForUser = (userId) => {
    const token = utils.generateRandomString(60);
    const expiryDate = Date.now() + 24 * 60 * 60 * 1000;

    tokens.set(token, {
        userId: userId,
        expiryDate: expiryDate
    });

    return {token, expiryDate}
}