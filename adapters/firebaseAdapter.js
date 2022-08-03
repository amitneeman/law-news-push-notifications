const firebase = require('firebase-admin');
require('firebase-admin/firestore');



class FirebaseAdapter {
    constructor() {
        if (!firebase.apps.length) {
            var serviceAccount = {
                "type": "service_account",
                "project_id": "law-news",
                "private_key_id": "77c284aa8b5aa2477b3a6d84a05090577dd1c1a8",
                "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCQG4oMo9C8s7kp\nq4wPbP8Rin6KprcAMSN6vhkpoVTWZot+xtKyAhKXm4pzUsOg90Jc4dlgEPNuRx5Z\ndU8BXgLhRz7BqAVBwmGON/i63FffZd0eD3bBQOSiLbS5UeJsPBTW3jMhnLCnKb36\nk17pGS3BUvAuDxHMMRwtQSdwb2NVPN64kNDifYNmtL6TiomGtthw97K7ALkdODm6\nciqAQqZcJbmv+GJ45Lsb4wPdSv5G/HXhhOzFGQkQGdx5pD+nY+x24ZADaYKDKxp3\nbn/4GrXEwLgZmKe6KP2HvfNkZrTNVR9E/n1d4r23Geu8YnIErd/T/pN/j+5llrIE\nZ48kF14DAgMBAAECggEAFsKywCJTgqpkMWet3HXbp3qXV/DS8I3SS72gncmka6SQ\nnbprZsAbDaT8bhCBY3gKHD9zpM+okx9adMipbM7bZ5doGxAdnHBGFj9S4riQjHE7\nRlcs64MDWXYcmDSNrYijxfgcXU+xOwXFwsDp+akHaARgePXaWsTa7W7f+sstBjY1\nTgRhyHSb9NPtcZKGWg173h6cTDWen3auHaeuvzAeQQ8Cef6NRvecDvq2J+pvj80j\nn9vP/1SY+LuHzCPeLKw3XKYamnJAMSqP7LnGPnSJjP/oW20TXRHT3EsM27AVBp4J\nqXLc2UsKdiTb7wrhuCA+AzgPPh49Hqlinhi3lNg7OQKBgQDCIhA6dRGYsKOP0PMb\nkMhISUOeaOi5S+/z3waitOhHZGz/tPX7S0kKNsAFVnH7GoQb+8MMRHWV0/VmtOYn\nHz6UfN1A+++qMa1waTyytcD/uRlmXqmSHXazE73Y7yKfzEVql6RJq6rZj2yfILD7\njUG0IJf4Ojxf5SBJRjfWz6nLnQKBgQC+CECJcntdNYnLIKwoINIylFBsl+OlXvBv\nf1LJ4ZcgV5NxOBi0WoYscO1Y7lxgYeYAfd9cZ+RQgM9+KSmSq1q9LtUp1/Hgvdjy\nj/IRg3mXJF/JJwBtO9Ebx/FVrDjDDM60ElHcJC+JtLC8LR8UmiWoF0Q3vsXclTmP\nzrL0nL+uHwKBgAn/VRSdmMVjO1kZqptdzmKimz/aKTn5pibJ8n6IkHm0u0RD3nMN\ngnprLWJY/E+xIuKKCZZlJCUOIFIkuMGFA2UENSS2lLYQDt1+HekaIRFKR/uUnmju\n6YD5YEp+rirKizydCJHerFK95xsexN5/fMW48/qNjTRnCU2ctx1x3k2lAoGAatwP\nFntm/boeezgrNwGF0eVu+DHNVG/3umsZreaKaih1A+Ssl7aT3qe+ABVBov1KLhqa\nIMdXLyHQDDyvYQe0pc+RFM+W928qcPQbBlgtZp2Qs3eYGNTbOMkNX8TRwnUQQ1hN\n6gH7LW+LNrYU1Sv9YvF6bfJ8JxdO4Bw2q7D9ZLcCgYB+I42Jik4SCPl/am5dZp2q\nDWbQAyrW699+K51z2hQi9NtVSdCSxABUNuaAD6oMFjvmyBSl3G5tCBUqQN/X9qVs\nNkFA7HSGVe/6CtDH/fNVNalrtmuPxeZxdv0hg5PKkNeo/a1KFmy+ate/YguD/mjt\n10Q0+16LxSGghv26IeT/Wg==\n-----END PRIVATE KEY-----\n",
                "client_email": "firebase-adminsdk-ut59v@law-news.iam.gserviceaccount.com",
                "client_id": "100922644639755071499",
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
                "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
                "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ut59v%40law-news.iam.gserviceaccount.com"
            }

            firebase.initializeApp({
                credential: firebase.credential.cert(serviceAccount),
                databaseURL: "https://law-news.firebaseio.com"
            });
        }
        this.db = firebase.firestore();
    }

    registerUser(token) {
        this.db.collection("push_subs").doc(token).set({
            token
        });
    }

    getRegisteredUsers() {
        return this.db.collection("push_subs").get();
    }
}

module.exports = FirebaseAdapter;
