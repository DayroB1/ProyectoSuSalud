import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyD07ZRmrm3ztbyS9FhtSYlsdfZnrflR4Lo",
    authDomain: "proyecto-2b5be.firebaseapp.com",
    databaseURL: "https://proyecto-2b5be-default-rtdb.firebaseio.com",
    projectId: "proyecto-2b5be",
    storageBucket: "proyecto-2b5be.firebasestorage.app",
    messagingSenderId: "246075451280",
    appId: "1:246075451280:web:7b38f25aba4f6d406c3515",
    measurementId: "G-ZPEPCQ8LVP"
  };
  

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  
  export { database, app };