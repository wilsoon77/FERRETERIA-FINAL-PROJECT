import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { InicioComponent } from './Components/inicio/inicio.component';
import { BodyComponent } from './Components/body/body.component';
import { CarritoComponent } from './Components/carrito/carrito.component';
//import { ContactComponent } from './components/contact/contact.component';




//Rutas de navegacion
const routes: Routes = [
  {path: '', redirectTo: 'login',pathMatch: 'full'},
 {path: 'login', component: LoginComponent},
 {path: 'inicio', component: InicioComponent},
 {path: 'body', component: BodyComponent},
 {path: 'carrito', component: CarritoComponent},

 //{path: '/contacto', component: ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
