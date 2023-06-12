import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AlbumsPageComponent } from './pages/albums-page/albums-page.component';
import { LevelsPageComponent } from './pages/levels-page/levels-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { LevelPageComponent } from './pages/level-page/level-page.component';
import { ResetPasswordPageComponent } from './pages/reset-password-page/reset-password-page.component';
import { AuthorizationPageComponent } from './pages/authorization-page/authorization-page.component';
import { RemoveAccountPageComponent } from './pages/remove-account-page/remove-account-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'levels',
    component: LevelsPageComponent,
  },
  {
    path: 'albums',
    component: AlbumsPageComponent,
  },
  {
    path: 'users',
    component: UsersPageComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  {
    path: 'resetPassword',
    component: ResetPasswordPageComponent,
  },
  {
    path: 'removeAccount',
    component: RemoveAccountPageComponent,
  },
  {
    path: 'user/:username',
    component: UserPageComponent,
  },
  {
    path: 'level/:levelId',
    component: LevelPageComponent,
  },
  { path: 'me', component: UserPageComponent },
  { path: 'authorization/:filter', component: AuthorizationPageComponent },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
