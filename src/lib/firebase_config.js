
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const { REACT_APP_APIKEY, REACT_APP_AUTHDOMAIN, REACT_APP_PROJECTID, REACT_APP_APPID } = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_APIKEY,
  authDomain: REACT_APP_AUTHDOMAIN,
  projectId: REACT_APP_PROJECTID,
  appId: REACT_APP_APPID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;