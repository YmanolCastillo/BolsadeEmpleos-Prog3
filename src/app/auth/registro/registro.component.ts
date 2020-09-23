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
  });
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  async onRegister() {
    const { email, password } = this.registerForm.value;
  
    try {
      const user = await this.authService.registro(email, password);
      if (user) {
        this.router.navigate(['/login']);
      }
    } catch (error) {
      alert('Ha ocurrido un error: ' + error);
    }
  }
} 
