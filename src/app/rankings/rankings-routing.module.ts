import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RankingsComponent } from './rankings.component';
import { GenreAppsComponent } from './genre-apps/genre-apps.component';

const routes: Routes = [
  { path: '', component: RankingsComponent },
  { path: 'genre-apps', component: GenreAppsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RankingsRoutingModule { }
