import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../shared/login/login.component";
import {PagesComponent} from "../pages/pages.component";

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'pages',
    component: PagesComponent,
    children:
      [
        {
          path: 'dashboard',
          loadChildren:  () => import('../pages/inicio/inicio.module').then(m => m.InicioModule),
        },
        {
          path: 'create',
          loadChildren:  () => import('../pages/create/create.module').then(m => m.CreateModule),
        },
        {
          path: 'status',
          loadChildren:  () => import('../pages/estado/estado.module').then(m => m.EstadoModule),
        },
      ],
    // canActivate: [AuthenticationGuard]
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
