import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public isAdmin: any =null;
  public isPoster: any =null;
  public IsUser: any =null;
  constructor(public AuthService:AuthService, private router: Router) { }
  public userId:string =null;

  ngOnInit(): void {
    this.getCurrentUser()
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
             this.IsUser=this.isAdmin.hasOwnProperty('User')
           }
         )
      }
    }  
    )
  }
  async onLogout() {
    try {
      this.AuthService.logout();
  
      this.router.navigate(['/login']);
    } catch (error) {
      alert('Ha ocurrido un error: ' + error);
    }
  }
}
