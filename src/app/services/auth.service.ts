import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import {User} from '../services/model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user:string;

  constructor(public afAuth: AngularFireAuth, private router: Router,private af:AngularFirestore) { }
  async login(email: string, password: string) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(
        email,
        password
      );
     this.user=result.user.uid
      this.updateUserData(result.user);
      this.router.navigate(['/consultorio']);
      return result;
    } catch (error) {
      alert('Ha ocurrido un error ' + error);
    }
  }

  async registro(email: string, password: string) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      return result;
    } catch (error) {
      alert('Ha ocurrido un error: ' + error);
    }
    // catch (e) {
    //   const errorCodes = e.code;
    //   switch (errorCodes) {
    //     case "auth/invalid-email":
    //       const invalidEmail =  console.log("Ingrese un Email Valido");

    //       break;
    //     case "auth/email-already-in-use":
    //       const emailInUse =  console.log("Correo en Uso");
    //       break;
    //   }
    // }
  }
  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.af.doc(`users/${user.uid}`);

    const data = { 
      uid: user.uid, 
      email: user.email
    } 

    return userRef.set(data, { merge: true })

  }
}
