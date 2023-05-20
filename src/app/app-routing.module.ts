import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AlbumsPageComponent } from './pages/albums-page/albums-page.component';
import { LevelsPageComponent } from './pages/levels-page/levels-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { UserPageComponent } from './pages/user-page/user-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, data: { animation: 'isRight' } },
  {
    path: 'levels',
    component: LevelsPageComponent,
    data: { animation: 'isRight' },
  },
  {
    path: 'albums',
    component: AlbumsPageComponent,
    data: { animation: 'isRight' },
  },
  {
    path: 'users',
    component: UsersPageComponent,
    data: { animation: 'isRight' },
  },
  {
    path: 'login',
    component: LoginPageComponent,
    data: { animation: 'isRight' },
  },
  {
    path: 'register',
    component: RegisterPageComponent,
    data: { animation: 'isRight' },
  },
  {
    path: 'resetPassword',
    component: ResetPasswordComponent,
    data: { animation: 'isRight' },
  },
  {
    path: 'user/:username',
    component: UserPageComponent,
    data: { animation: 'isRight' },
  },
  { path: 'me', component: UserPageComponent, data: { animation: 'isRight' } },
  { path: '**', component: ErrorPageComponent, data: { animation: 'isRight' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
