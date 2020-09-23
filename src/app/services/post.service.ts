import { Injectable } from '@angular/core';
import {post} from "./model";
import {Observable} from "rxjs";
import { map } from "rxjs/operators";
import {AuthService} from '../services/auth.service';
import {AngularFirestore,AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class PostService {
postId:string

  PostDocument:AngularFirestoreDocument<post>;
  PostCollection:AngularFirestoreCollection<post>;
  posts:Observable<post[]>
  constructor(public DB:AngularFirestore,public AuthService:AuthService) { 
this.PostCollection=DB.collection('post');
this.posts=this.PostCollection.snapshotChanges().pipe(map(actions => actions.map(a => {

  const data = a.payload.doc.data() as post;
  const id = a.payload.doc.id;
  this.postId=id;
  return { id, ...data };
})
));
 }
 getposts(){
   
  return this.posts;
}

addpost(post:post){
  this.PostCollection.add(post);
     }
     deletepost(post:post){
     this.PostDocument=this.DB.doc(`post/${post.id}`)
     this.PostDocument.delete()
     }
     updatepost(post:post){
      this.PostDocument=this.DB.doc(`post/${post.id}`)
      this.PostDocument.update(post);

     }

  }

