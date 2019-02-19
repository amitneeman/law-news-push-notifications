const firebase = require('firebase');
require('firebase/firestore');

const config = {
    apiKey: "AIzaSyCT1M0crrf_4Sg61tUesQCFA50COVC5lzs",
    authDomain: "law-news.firebaseapp.com",
    projectId: "law-news",
};

class FirebaseAdapter{
    constructor(){
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        this.db = firebase.firestore();
    }

    registerUser(token){
        this.db.collection("subscribers").doc(token).set({
            token
        });       
    }

    getRegisteredUsers(){
        return this.db.collection("subscribers").get();
    }
}

module.exports = FirebaseAdapter;
