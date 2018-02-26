import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeComponent } from './home.component';
import { IndexComponent } from './index/index.component';
import { PriceComponent } from './price/price.component';
import { NavbarComponent } from './navbar/navbar.component';

const routing = RouterModule.forChild([
  {
      path: '', component: HomeComponent,
      children: [
          { path: 'index', component: IndexComponent },
          { path: 'pricing', component: PriceComponent },
          { path: '**', redirectTo: '/home/index' }
      ]
  },
]);

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    routing
  ],
  declarations: [
    HomeComponent,
    IndexComponent,
    PriceComponent,
    NavbarComponent
  ],
  exports: [HomeComponent],
})
export class HomeModule { }
