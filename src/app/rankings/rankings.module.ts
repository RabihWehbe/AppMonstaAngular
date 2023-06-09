import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RankingsRoutingModule } from './rankings-routing.module';
import { RankingsComponent } from './rankings.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RankingsComponent
  ],
  imports: [
    CommonModule,
    RankingsRoutingModule,
    FormsModule,
    BsDatepickerModule.forRoot()
  ]
})
export class RankingsModule { }
