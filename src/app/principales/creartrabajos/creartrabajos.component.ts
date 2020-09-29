import { Component, OnInit } from '@angular/core';
import{ AuthService} from '../../services/auth.service';
import {PostService} from '../../services/post.service';
import{post} from '../../services/model';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creartrabajos',
  templateUrl: './creartrabajos.component.html',
  styleUrls: ['./creartrabajos.component.scss']
})
export class CreartrabajosComponent implements OnInit {
  createForm = new FormGroup({
    TipoDeCuenta:new FormControl('')
  });
  TipoDeCuenta=this.createForm.value;

  post:post={
    Uid:this.auth.user,
    categoria:this.TipoDeCuenta,
    compania:'',
    descripcion:'',
    email:this.auth.userEmail,
    info:'',
    posicion:'',
    ubicacion:'',
    url:''
}
  constructor(private PostService:PostService,public auth:AuthService,private router: Router) { }

  ngOnInit(): void {
    console.log(this.auth.userEmail)
  }

  onSubmit(){
    console.log(this.post)
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

    this.router.navigate(['/vertrabajos']);
    
    }
}
