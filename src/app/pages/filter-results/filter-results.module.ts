import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilterResultsPageRoutingModule } from './filter-results-routing.module';

import { FilterResultsPage } from './filter-results.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilterResultsPageRoutingModule
  ],
  declarations: [FilterResultsPage]
})
export class FilterResultsPageModule {}
