import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import {User} from '../services/model';
import { async } from '@angular/core/testing';
import { map } from "rxjs/operators";
import{PostService} from '../services/post.service'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user:string;
  public userEmail:string;
public Tipo:string;
public typeAdmin: boolean;
  public typePoster: boolean;
public UserId:string;
public UserID:string;
public isAdminn: any =null;
  public isPoster: any =null;
  public IsUser:boolean;
  constructor(public afAuth: AngularFireAuth, private router: Router,private af:AngularFirestore,public PostService:PostService) { }
  async login(email: string, password: string) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(
        email,
        password
      );
     this.user=result.user.uid;
     this.userEmail=result.user.email
      console.log(this.userEmail)
      this.getCurrentUser();
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
      this.PostService.IsUser=false;
      this.isAdminn =null;
      this.isPoster=null;
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
  isUser(){
    this.IsUser=true;
    this.router.navigate(['/vertrabajos']);
  } 
  isAdmin(userId){
    return this.af.doc<User>(`users/${userId}`).valueChanges();
  }
  isAuth(){
    return this.afAuth.authState.pipe(map(auth=>auth));
  }
   getCurrentUser(){
    this.isAuth().subscribe(
    auth=>{
      if(auth){
        this.UserID=auth.uid;
        console.log(this.UserID)
         this.isAdmin(this.UserID).subscribe(
           userrole=>{
             this.isAdminn= Object.assign({},userrole.role)
             this.typeAdmin=this.isAdminn.hasOwnProperty('Admin')
             this.isPoster= Object.assign({},userrole.role)
             this.typePoster=this.isPoster.hasOwnProperty('Poster')
            
             console.log(`admin:${this.isAdmin}  poster:${this.isPoster}  User:${this.IsUser}` )
           }
         )
      }
    }  
    )

  }
}
