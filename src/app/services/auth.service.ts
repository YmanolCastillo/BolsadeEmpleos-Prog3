import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import {User} from '../services/model';
import { async } from '@angular/core/testing';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user:string;
  public userEmail:string;
public Tipo:string;
public UserId:string;
  constructor(public afAuth: AngularFireAuth, private router: Router,private af:AngularFirestore) { }
  async login(email: string, password: string) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(
        email,
        password
      );
     this.user=result.user.uid;
     this.userEmail=result.user.email
      console.log(this.userEmail)
      return result;
    } catch (error) {
      alert('Ha ocurrido un error ' + error);
    }
  }

  async registro(email: string, password: string,nombre:string,TipoDeUsuario:string) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(
        email,
        password
      );
     this.UserId=result.user.uid
      this.Tipo=TipoDeUsuario;
      console.log(TipoDeUsuario)
      this.updateUserData(result.user,nombre,TipoDeUsuario);
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
  public getUser(user,nombre,TipoDeCuenta){
    switch(TipoDeCuenta){
case 'Admin':{
    let data  = { 
      nombre:nombre,
      uid: user.uid, 
      email: user.email,
     role:{
       Admin:true
     }
      }
      return data
    }
     
      
      case 'User':{
    const data  = { 
      nombre,
      uid: user.uid, 
      email: user.email,
     role:{
       User:true
     }
      }
      return data
    }
    
      case 'Poster':{
        const data  = { 
          nombre,
          uid: user.uid, 
          email: user.email,
         role:{
           Poster:true
         }
          }
          return data}
         
    }
  }
  async logout() {
    try {
      await this.afAuth.auth.signOut();
    } catch (error) {
      alert('Ha ocurrido un error: ' + error);
    }
  }
  private updateUserData(user,nombre,TipoDeCuenta) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.af.doc(`users/${user.uid}`);
   const data =this.getUser(user,nombre,TipoDeCuenta)
    return userRef.set(data, { merge: true })

  }
  isAdmin(userId){
    return this.af.doc<User>(`users/${userId}`).valueChanges();
  }
  isAuth(){
    return this.afAuth.authState.pipe(map(auth=>auth));
  }
}
