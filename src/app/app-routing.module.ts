import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { CreartrabajosComponent } from './principales/creartrabajos/creartrabajos.component';
import { VertrabajosComponent } from './principales/vertrabajos/vertrabajos.component';
import { EnviarCorreoComponent } from './auth/enviar-correo/enviar-correo.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'registro',
  component: RegistroComponent
},
{
  path: 'vertrabajos',
  component: VertrabajosComponent
},
{
  path: 'creartrabajos',
  component: CreartrabajosComponent
},
{
  path: 'verificacion-email',
  component: EnviarCorreoComponent,
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
