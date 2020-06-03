import * as firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyBzncraq1-mpKL1Qsyzo0HVmcDnWuSCc8c",
    authDomain: "talkessentials-7b3ba.firebaseapp.com",
    databaseURL: "https://talkessentials-7b3ba.firebaseio.com",
    projectId: "talkessentials-7b3ba",
    storageBucket: "talkessentials-7b3ba.appspot.com",
    messagingSenderId: "1089141085507",
    appId: "1:1089141085507:web:217c8dff83d51c9b824bf6",
    measurementId: "G-2XS4EDDRCZ"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();
export const db = firebase.database();
