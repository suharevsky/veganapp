import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SwingModule } from 'angular2-swing';

import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../components/sharedModule';
import { ExplorePage } from './explore.page';
import { RippleLoaderComponent } from '../../components/ripple-loader/ripple-loader.component';

const routes: Routes = [
  {
    path: '',
    component: ExplorePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SwingModule,
    SharedModule,
  ],
  declarations: [ExplorePage, RippleLoaderComponent]
})
export class ExplorePageModule {}
