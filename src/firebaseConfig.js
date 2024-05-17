import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey:  import.meta.env.VITE_API_KEY,
  authDomain: 'exclusive-ecommerce-app-8d6fd.firebaseapp.com',
  projectId: 'exclusive-ecommerce-app-8d6fd',
  storageBucket: 'exclusive-ecommerce-app-8d6fd.appspot.com',
  messagingSenderId: '456024014933',
  appId: '1:456024014933:web:daa79a27e87610a72f94dc',
  measurementId: 'G-44LB4N40SK',
  databaseURL:
    'https://exclusive-ecommerce-app-8d6fd-default-rtdb.europe-west1.firebasedatabase.app',
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const database = getDatabase(app);

export { firebaseConfig, auth, database };
