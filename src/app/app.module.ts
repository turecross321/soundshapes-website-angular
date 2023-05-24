import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarButtonComponent } from './components/navbar-button/navbar-button.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LevelsPageComponent } from './pages/levels-page/levels-page.component';
import { AlbumsPageComponent } from './pages/albums-page/albums-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { SetEmailPageComponent } from './components/set-email-page/set-email-page.component';
import { SetPasswordPageComponent } from './components/set-password-page/set-password-page.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarButtonComponent } from './components/sidebar-button/sidebar-button.component';
import { PrimaryButtonComponent } from './components/primary-button/primary-button.component';
import { UserFollowButtonComponent } from './components/user-follow-button/user-follow-button.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { LevelsComponent } from './components/levels/levels.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { DropdownButtonComponent } from './components/dropdown-button/dropdown-button.component';
import { ClickOutsideDirective } from './directives/clicked-outside';
import { LevelViewComponent } from './components/level-view/level-view.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { UserStatisticsComponent } from './components/user-statistics/user-statistics.component';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LevelPageComponent } from './pages/level-page/level-page.component';
import { LevelStatisticsComponent } from './components/level-statistics/level-statistics.component';
import { DifficultyViewerComponent } from './components/difficulty-viewer/difficulty-viewer.component';
import { LevelInteractionButtonComponent } from './components/level-interaction-button/level-interaction-button.component';
import { LevelEditableNameComponent } from './components/level-editable-name/level-editable-name.component';
import { ReportButtonComponent } from './components/report-button/report-button.component';
import { ResetPasswordPageComponent } from './pages/reset-password-page/reset-password-page.component';
import { SendPasswordSessionComponent } from './components/send-password-session/send-password-session.component';
import { AuthorizationPageComponent } from './pages/authorization-page/authorization-page.component';
import { IpViewComponent } from './components/ip-view/ip-view.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavbarButtonComponent,
    HomePageComponent,
    LevelsPageComponent,
    AlbumsPageComponent,
    UsersPageComponent,
    LoginPageComponent,
    ErrorPageComponent,
    RegisterPageComponent,
    UserPageComponent,
    SetEmailPageComponent,
    SetPasswordPageComponent,
    StepperComponent,
    SidebarComponent,
    SidebarButtonComponent,
    PrimaryButtonComponent,
    UserFollowButtonComponent,
    InputFieldComponent,
    LevelsComponent,
    DropdownComponent,
    DropdownButtonComponent,
    ClickOutsideDirective,
    LevelViewComponent,
    StatisticComponent,
    UserStatisticsComponent,
    IconButtonComponent,
    LevelPageComponent,
    LevelStatisticsComponent,
    DifficultyViewerComponent,
    LevelInteractionButtonComponent,
    LevelEditableNameComponent,
    ReportButtonComponent,
    ResetPasswordPageComponent,
    SendPasswordSessionComponent,
    AuthorizationPageComponent,
    IpViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
