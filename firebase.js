const firebase = require('firebase/app')
require('firebase/auth')

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKQr41zHLFLnGMKq0L6JBK3eLkF21WVrU",
  authDomain: "vue-slack-e5ba3.firebaseapp.com",
  databaseURL: "https://vue-slack-e5ba3-default-rtdb.firebaseio.com",
  projectId: "vue-slack-e5ba3",
  storageBucket: "vue-slack-e5ba3.appspot.com",
  messagingSenderId: "889144451606",
  appId: "1:889144451606:web:20a335878445588d09cb37"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  
  module.exports = firebase
  