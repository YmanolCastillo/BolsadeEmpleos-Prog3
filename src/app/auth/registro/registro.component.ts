import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    nombre: new FormControl(''),
    TipoDeCuenta:new FormControl('')
  });
TipoDeCuenta=this.registerForm.value;
  name:string;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.TipoDeCuenta)
    this.onItemChange(this.TipoDeCuenta.valueOf())
  }

  onItemChange(value){
    
    console.log(" Value is : ", value );
 }
  async onRegister() {
    const { email, password,TipoDeCuenta,nombre } = this.registerForm.value;
  
    try {
      const user = await this.authService.registro(email, password,nombre,TipoDeCuenta);
      if (user) {
        this.router.navigate(['/login']);
      }
    } catch (error) {
      alert('Ha ocurrido un error: ' + error);
    }
  }
} 
