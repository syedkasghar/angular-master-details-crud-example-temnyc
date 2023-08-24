import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { AuthGuard } from './helpers';
import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';

const loginModule = () =>
  import('./login/login.module').then((x) => x.LoginModule);

const usersModule = () =>
  import('./users/users.module').then((x) => x.UsersModule);

const devicesModule = () =>
  import('./devices/devices.module').then((x) => x.DevicesModule);

const incidentsModule = () =>
  import('./incidents/incidents.module').then((x) => x.IncidentsModule);

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', loadChildren: loginModule },
  { path: 'devices', loadChildren: devicesModule, canActivate: [AuthGuard] },
  {
    path: 'incidents',
    loadChildren: incidentsModule,
    canActivate: [AuthGuard],
  },
  { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
