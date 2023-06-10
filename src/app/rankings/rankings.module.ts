import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RankingsRoutingModule } from './rankings-routing.module';
import { RankingsComponent } from './rankings.component';
import { FormsModule } from '@angular/forms';
import { GenreComponent } from './genre/genre.component';
import { GenreAppsComponent } from './genre-apps/genre-apps.component';
import { AppCompComponent } from './app-comp/app-comp.component';
import { AppDetailsComponent } from './app-details/app-details.component';

@NgModule({
  declarations: [
    RankingsComponent,
    GenreComponent,
    GenreAppsComponent,
    AppCompComponent,
    AppDetailsComponent,
  ],
  imports: [
    CommonModule,
    RankingsRoutingModule,
    FormsModule,
  ]
})
export class RankingsModule { }
