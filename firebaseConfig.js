import {FB_APIKEY,FB_AUTHDOMAIN,FB_PROJECTID,FB_STORAGEBUCKET,FB_MESSAGINGSENDERID,FB_APPID,FB_MEASUREMENTID}from '@env';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: FB_APIKEY,
    authDomain: FB_AUTHDOMAIN,
    projectId: FB_PROJECTID,
    storageBucket: FB_STORAGEBUCKET,
    messagingSenderId: FB_MESSAGINGSENDERID,
    appId: FB_APPID,
    measurementId: FB_MEASUREMENTID
  };

firebase.initializeApp(firebaseConfig);
const storage=firebase.storage();
export {storage,firebase as default};

