import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthenticatedGuard } from './guards/is-authenticated.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'fire'
  },
  {
    path:'auth',
    loadChildren: ()=> import('./auth/auth.module').then((module) => module.AuthModule)
  },
  {
    path: 'fire',
    canActivate: [IsAuthenticatedGuard],
    loadChildren: () => import('./fire/fire.module').then((module) => module.FireModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
