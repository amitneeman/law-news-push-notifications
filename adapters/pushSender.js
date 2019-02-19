const axios = require('axios');
const { Expo } = require('expo-server-sdk');
const firebaserAdapter = require('../adapters/firebaseAdapter');
let adapter = new firebaserAdapter();

let expo = new Expo();

const extractTokens = async () => {
    try {
        tokens = await adapter.getRegisteredUsers();
    } catch (err) {
        console.log(err);
        return [];
    }
    tokens = tokens.docs.map((doc) => doc.data().token);
    return tokens;
}

const sendNotification = async (title, body, data) => {
    let messages = [];
    let tokens = await extractTokens();
    for (let pushToken of tokens) {
        if (!Expo.isExpoPushToken(pushToken)) {
            console.error(`Push token ${pushToken} is not a valid Expo push token`);
            continue;
        }
        messages.push({
            to: pushToken,
            sound: 'default',
            title: title,
            body: body,
            data: { withSome: 'data' },
        })
    }
    let chunks = expo.chunkPushNotifications(messages);
    for (let chunk of chunks) {
        try {
            let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
            console.log(ticketChunk);
        } catch (error) {
            console.error(error);
        }
    }

    return "done sending";
}


module.exports = {
    sendNotification
}