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
  
    var em = email;
    var pass = password;
    var tc = TipoDeCuenta;
    var nom = nombre;
    var expresion = /\w+@\w+\.+[a-z]/;

    if(em === "" || nom === "" || pass === "" || tc === ""){

     alert("Todos los campos son obligatorios");
     return false;

    }else if(nom.length>30){
    
      alert("El nombre es muy largo");
      return false;

    }else if(!expresion.test(em)){

      alert("El correo es invalido");
      return false;

    }else if(pass.search(/[0-9]/) === -1){ 
      
      alert("La contraseña debe incluir al menos un numero");
      return false;

    }else if(pass.search(/[a-z]/) === -1){ 
      
      alert("La contraseña debe incluir al menos una letra");
      return false;

    }else{

      try {
        const user = await this.authService.registro(email, password,nombre,TipoDeCuenta);
        if (user) {
          this.router.navigate(['/verificacion-email']);
        }
      } catch (error) {
        alert('Ha ocurrido un error: ' + error);
      }

    }

  }
} 
