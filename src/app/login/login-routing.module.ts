import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [{ path: '', component: LoginComponent },{ path: 'login', component: LoginComponent },
{ path: 'register', component: SignUpComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
