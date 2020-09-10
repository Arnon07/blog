import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'

let firebaseConfig = {
    apiKey: "AIzaSyDhWMOv9-ITA_alc17QJnxgLE93iApYSds",
    authDomain: "reactapp-824d2.firebaseapp.com",
    databaseURL: "https://reactapp-824d2.firebaseio.com",
    projectId: "reactapp-824d2",
    storageBucket: "reactapp-824d2.appspot.com",
    messagingSenderId: "924699564370",
    appId: "1:924699564370:web:851d1845c37392c0a1028b",
    measurementId: "G-Q4GQZTD1X7"
  };

class Firebase{
    constructor(){
        app.initializeApp(firebaseConfig);

        this.app = app.database();
    }

    login(email, password){
    return app.auth().signInWithEmailAndPassword(email, password)

    }

    logout(){
        return app.auth().signOut();
    }

    async register(nome, email, password){
        await app.auth().createUserWithEmailAndPassword(email, password)

        const uid = app.auth().currentUser.uid;

        return app.database().ref('usuarios').child(uid).set({
            nome: nome
        })

    }

    isInicialized(){
        return new Promise(resolve =>{
            app.auth().onAuthStateChanged(resolve);
        })
    }

    getCurrent(){
        return app.auth().currentUser && app.auth().currentUser.email
    }

    async getUserName(callback){
        if(!app.auth().currentUser){
            return null;
        }

        const uid = app.auth().currentUser.uid;
        await app.database().ref('usuarios').child(uid).once('value').then(callback);
    }
}

export default new Firebase();