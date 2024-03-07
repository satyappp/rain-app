import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAAdHoqpvh7SJyT_xQ5ioMBK4aqRUyWWDE",
    authDomain: "hyper-umbrella-reminder.firebaseapp.com",
    projectId: "hyper-umbrella-reminder",
    storageBucket: "hyper-umbrella-reminder.appspot.com",
    messagingSenderId: "774482832200",
    appId: "1:774482832200:web:fc10c1d2915c80f125e17d",
    measurementId: "G-1LL4MJTWFT"   
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;