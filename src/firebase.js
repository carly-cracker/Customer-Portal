
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA5LPWOAUYH3mTW8Jzx-_cB2oKalHyQTik",
  authDomain: "customer-portal-15866.firebaseapp.com",
  projectId: "customer-portal-15866",
  storageBucket: "customer-portal-15866.appspot.com",
  messagingSenderId: "1031493570334",
  appId: "1:1031493570334:web:55a511b4a06d3888d7c30f",
  measurementId: "G-78JV5M4NV6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
