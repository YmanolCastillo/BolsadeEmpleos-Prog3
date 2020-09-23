import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AngularFirestoreModule} from "angularfire2/firestore";
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { VertrabajosComponent } from './principales/vertrabajos/vertrabajos.component';
import { CreartrabajosComponent } from './principales/creartrabajos/creartrabajos.component';
import {AuthService} from '../app/services/auth.service';
import {environment} from "../environments/environment"

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    
    RegistroComponent,
    VertrabajosComponent,
    CreartrabajosComponent,
  
  ],
  imports: [
    BrowserModule,FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule, ReactiveFormsModule 
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
