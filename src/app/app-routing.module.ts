import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path: "welcome",component:WelcomeComponent},
  {
     path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  },
  { path: 'rankings', loadChildren: () => import('./rankings/rankings.module').then(m => m.RankingsModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
