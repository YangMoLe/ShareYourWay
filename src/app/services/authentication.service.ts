import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

var database = firebase.database();

function writeUserData(memberID, name, email, imageUrl){
  firebase.database().ref('members/' + memberID).set({
    mName: name,
    email: email,
    iUrl: imageUrl
  });
}

@Injectable()

export class AuthenticateService {

  constructor() { }

  

  registerUser(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
          
          
    })
  }

  loginUser(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))

    })
  }
  logoutUser() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        firebase.auth().signOut()
          .then(() => {
            console.log("LOG out")
            resolve();
          }).catch((error) => {
            reject();
          });
      }
    })
  }


  userDetails(){
    return firebase.auth().currentUser;
  }

}
