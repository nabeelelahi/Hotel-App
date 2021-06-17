import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyCPK4zhA4uY3FffjGaBcSWC0nnACkzGTxc",
    authDomain: "hotelapp-3d5f9.firebaseapp.com",
    databaseURL: "https://hotelapp-3d5f9-default-rtdb.firebaseio.com",
    projectId: "hotelapp-3d5f9",
    storageBucket: "hotelapp-3d5f9.appspot.com",
    messagingSenderId: "127283290966",
    appId: "1:127283290966:web:261c06bd6a9c83a8946cf7",
    measurementId: "G-C950P9PSC0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth()

  export {auth, firebase}