import firebase from "firebase";
import 'firebase/firebase';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCtbj0gKiMKtjPibm8YvNlu8k4LbpKY3wI",
    authDomain: "olx-clone-6ea37.firebaseapp.com",
    projectId: "olx-clone-6ea37",
    storageBucket: "olx-clone-6ea37.appspot.com",
    messagingSenderId: "465550619473",
    appId: "1:465550619473:web:7f2c42b664568554aa1970"
};
export default firebase.initializeApp(firebaseConfig);