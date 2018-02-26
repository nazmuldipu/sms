import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CookieModule } from 'ngx-cookie';
import { AppComponent } from './app.component';
import { ServiceModule } from './services/service.module';
import { HttpModule } from '@angular/http';


const appRoutes: Routes = [
  { path: 'home', loadChildren: 'app/home/home.module#HomeModule'},
  { path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule'},
  { path: '**', redirectTo: '/home/index' }
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    CookieModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
