import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HelpComponent } from './help/help.component';
import { StartComponent } from './start/start.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/start'
  },
  {
    path: 'start',
    component: StartComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'help',
    component: HelpComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
