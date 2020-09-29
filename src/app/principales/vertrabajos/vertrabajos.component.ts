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
  
  public userId:string =null;
  borrador:post;

  posts:post[];
  constructor(public DB:AngularFirestore,public AuthService:AuthService,public PostService:PostService) { }

  filterPost = "";

  ngOnInit(): void {
    if(this.AuthService.isAdminn||this.AuthService.isPoster){
      this.getposts();
    }
  else{
    this.getPostForUsers()
  }

  }
  selectedPost(borrar:post):void{

    this.borrador=borrar;
    console.log(this.borrador)
  }

  getposts(){
     if(this.AuthService.typeAdmin){
      this.PostService.getposts().subscribe(post=>{
        this.posts=post;
        console.log('veo lo de admin');
      }

        )
    }
    else{
    this.PostService.getposts().subscribe(post=>{
      this.posts=post.filter(post=>  post.Uid==this.AuthService.UserID)
      console.log('veo lo de poster');
      
    }
    

      )
  }

  }
getPostForUsers(){
  this.PostService.getposts().subscribe(post=>{
    this.posts=post;
    console.log('veo lo de user');
  }

    )
}
  deletePost(event, post:post){
    console.log(this.borrador)
  this.PostService.deletepost(post)
  
  }
  update(){
    this.PostService.updatepost(this.borrador)
  }
}
