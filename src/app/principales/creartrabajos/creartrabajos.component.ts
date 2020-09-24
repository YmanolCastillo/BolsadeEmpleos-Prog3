import { Component, OnInit } from '@angular/core';
import{ AuthService} from '../../services/auth.service';
import {PostService} from '../../services/post.service';
import{post} from '../../services/model'
@Component({
  selector: 'app-creartrabajos',
  templateUrl: './creartrabajos.component.html',
  styleUrls: ['./creartrabajos.component.scss']
})
export class CreartrabajosComponent implements OnInit {
  categoria='';
  post:post={
    Uid:this.auth.user,
    categoria:this.categoria,
    compania:'',
    descripcion:'',
    email:this.auth.userEmail,
    info:'',
    posicion:'',
    ubicacion:'',
    url:''
}
  constructor(private PostService:PostService,public auth:AuthService) { }

  ngOnInit(): void {
    console.log(this.auth.userEmail)
  }

  onSubmit(){
    if(this.post.compania !='' && this.post.descripcion !='')
    
    this.PostService.addpost(this.post);
    this.post.categoria='',
    this.post.compania='',
    this.post.descripcion='',
    this.post.email='',
    this.post.info='',
    this.post.posicion='',
    this.post.ubicacion='',
    this.post.url=''
    
    }
}
