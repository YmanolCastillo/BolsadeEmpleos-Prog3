import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  async onLogin() {
    const { email, password } = this.loginForm.value;

    try {
      const user = await this.authService.login(email, password);
      this.authService.login(email, password);
      if (user) {
        this.router.navigate(['/vertrabajos']);
      }
    } catch (error) {
      //alert('Ha ocurrido un error: ' + error);
    }
  }
}
