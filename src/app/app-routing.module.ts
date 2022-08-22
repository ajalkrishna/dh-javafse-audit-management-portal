import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NoPageComponent } from './no-page/no-page.component';
import { RouteGuard } from './route.guard';

const routes: Routes = [
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule),canActivate:[RouteGuard] },
  {path:"login",component:LoginComponent},
  {path:"",redirectTo:"login",pathMatch:"full"},
  {path:"**",component:NoPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
