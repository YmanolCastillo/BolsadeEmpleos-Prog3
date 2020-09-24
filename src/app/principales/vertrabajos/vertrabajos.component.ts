import { Component, OnInit } from '@angular/core';
import {post} from "../../services/model";
import {Observable} from "rxjs";
import { map } from "rxjs/operators";
import {AuthService} from '../../services/auth.service';
import {AngularFirestore,AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {PostService} from '../../services/post.service';
@Component({
  selector: 'app-vertrabajos',
  templateUrl: './vertrabajos.component.html',
  styleUrls: ['./vertrabajos.component.scss']
})
export class VertrabajosComponent implements OnInit {
  public isAdmin: any =null;
  public isPoster: any =null;
  public IsUser: any =null;
  public userId:string =null;
  borrador:post;

  posts:post[];
  constructor(public DB:AngularFirestore,public AuthService:AuthService,public PostService:PostService) { }

  ngOnInit(): void {
    this.getCurrentUser();
    if(this.isAdmin){
      this.PostService.getposts().subscribe(post=>{
        this.posts=post;
        console.log('veo lo de admin');
      }

        )
    }
    else if(this.isPoster){
    this.PostService.getposts().subscribe(post=>{
      this.posts=post.filter(post=>  post.Uid==this.userId)
      console.log('veo lo de poster');
      
    }
    

      )
  }
  else{
    this.PostService.getposts().subscribe(post=>{
      this.posts=post;
      console.log('veo lo de user');
    }

      )
  }

  }
  selectedPost(borrar:post):void{

    this.borrador=borrar;
    console.log(this.borrador)
  }

  getposts(){
    
  }
  getCurrentUser(){
    this.AuthService.isAuth().subscribe(
    auth=>{
      if(auth){
        this.userId=auth.uid;
        console.log(this.userId)
         this.AuthService.isAdmin(this.userId).subscribe(
           userrole=>{
             this.isAdmin= Object.assign({},userrole.role)
             this.isAdmin=this.isAdmin.hasOwnProperty('Admin')
             this.isPoster= Object.assign({},userrole.role)
             this.isPoster=this.isPoster.hasOwnProperty('Poster')
             this.IsUser= Object.assign({},userrole.role)
             this.IsUser=this.IsUser.hasOwnProperty('User')
             console.log(`admin:${this.isAdmin}  poster:${this.isPoster}  User:${this.IsUser}` )
           }
         )
      }
    }  
    )
  }
  deletepost(){
    console.log(this.borrador)
  this.PostService.deletepost(this.borrador)
  
  }
  update(){
    this.PostService.updatepost(this.borrador)
  }
}
