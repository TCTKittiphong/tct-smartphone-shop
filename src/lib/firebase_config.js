
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getStorage} from 'firebase/storage';
import { getFirestore } from "firebase/firestore";

const { REACT_APP_APIKEY, REACT_APP_AUTHDOMAIN, REACT_APP_PROJECTID, REACT_APP_APPID, REACT_APP_DB, REACT_APP_ST } = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_APIKEY,
  authDomain: REACT_APP_AUTHDOMAIN,
  projectId: REACT_APP_PROJECTID,
  appId: REACT_APP_APPID,
  databaseURL: REACT_APP_DB,
  storageBucket: REACT_APP_ST
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default auth;