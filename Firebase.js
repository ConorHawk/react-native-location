import * as firebase from 'firebase';
import 'firebase/firestore'

var config = {
    apiKey: "AIzaSyDyWEM5wGzd3vaIQjWe7lJGD3iokZ7RP0s",
    authDomain: "trade-location.firebaseapp.com",
    databaseURL: "https://trade-location.firebaseio.com",
    projectId: "trade-location",
    storageBucket: "trade-location.appspot.com",
    messagingSenderId: "179076902472"
  };
  
  firebase.initializeApp(config);
  const database = firebase.firestore();
  const settings = {
      timestampsInSnapshots: true
  }
  database.settings(settings)
  export const db = database