import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './security/sign-in/sign-in.component';



const routes: Routes = [
  {path:'sign-up', component: SignInComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],

exports: [RouterModule]
})
export class AppRoutingModule { }
