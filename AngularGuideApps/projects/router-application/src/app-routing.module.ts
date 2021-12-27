import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './app/home/home.component';
import { PageNotFoundComponent } from './app/page-not-found/page-not-found.component';
import { EditServerComponent } from './app/servers/edit-server/edit-server.component';
import { ServerComponent } from './app/servers/server/server.component';
import { ServersComponent } from './app/servers/servers.component';
import { UserComponent } from './app/users/user/user.component';
import { UsersComponent } from './app/users/users.component';
import { AuthGuard } from './auth-gaurd.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'users',
    component: UsersComponent,
    children: [{ path: ':id/:name', component: UserComponent }],
  },
  {
    path: 'servers',
    component: ServersComponent,
    canActivate: [AuthGuard],
    children: [
      { path: ':id', component: ServerComponent },
      { path: ':id/edit', component: EditServerComponent },
    ],
  },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
