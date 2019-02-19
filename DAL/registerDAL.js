const firebaserAdapter = require('../adapters/firebaseAdapter');

let adapter = new firebaserAdapter();

const registerSubscriber = (token) => {
    adapter.registerUser(token);
}

module.exports = {
    registerSubscriber
}