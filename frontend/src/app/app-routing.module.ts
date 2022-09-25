import { TasksComponent } from './tasks/tasks.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { LoginComponent } from './login/login.component';
import { CreateUserComponent } from './login/create-user/create-user.component';
import { AuthGuard } from './login/guard/auth-guard';
import { RegisteredUsersComponent } from './registered-users/registered-users.component';
import { DragDropComponent } from './shared/components/drag-drop/drag-drop.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'create', component: CreateUserComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [AuthGuard],
  },
  { path: 'usuariosRegistrados', component: RegisteredUsersComponent },
  { path: 'dragdrop', component: DragDropComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
