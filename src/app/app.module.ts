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
import { DropdownButtonComponent as SelectableButtonComponent } from './components/selectable-button/selectable-button.component';
import { ClickOutsideDirective } from './directives/clicked-outside';
import { LevelViewComponent } from './components/level-view/level-view.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { UserStatisticsComponent } from './components/user-statistics/user-statistics.component';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LevelPageComponent } from './pages/level-page/level-page.component';
import { LevelStatisticsComponent } from './components/level-statistics/level-statistics.component';
import { DifficultyViewerComponent } from './components/difficulty-view/difficulty-view.component';
import { LevelEditableNameComponent } from './components/level-editable-name/level-editable-name.component';
import { ReportButtonComponent } from './components/report-button/report-button.component';
import { ResetPasswordPageComponent } from './pages/reset-password-page/reset-password-page.component';
import { SendPasswordSessionComponent } from './components/send-password-session/send-password-session.component';
import { AuthorizationPageComponent } from './pages/authorization-page/authorization-page.component';
import { IpViewComponent } from './components/ip-view/ip-view.component';
import { TimeTextComponent } from './components/time-text/time-text.component';
import { WideIconButtonComponent } from './components/wide-icon-button/wide-icon-button.component';
import { LevelLikeButtonComponent } from './components/level-like-button/level-like-button.component';
import { LevelQueueButtonComponent } from './components/level-queue-button/level-queue-button.component';
import { LogOutButtonComponent } from './components/log-out-button/log-out-button.component';
import { BannedPageComponent } from './pages/banned-page/banned-page.component';
import { PunishmentViewComponent } from './components/punishment-view/punishment-view.component';
import { RemoveAccountPageComponent } from './pages/remove-account-page/remove-account-page.component';
import { RemovalWarningComponent } from './components/removal-warning/removal-warning.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RemoveAccountFormComponent } from './components/remove-account-form/remove-account-form.component';
import { ApiClientInterceptorProvider } from "./api/api-client.interceptor";
import {NgOptimizedImage} from "@angular/common";

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
    SelectableButtonComponent,
    ClickOutsideDirective,
    LevelViewComponent,
    StatisticComponent,
    UserStatisticsComponent,
    IconButtonComponent,
    LevelPageComponent,
    LevelStatisticsComponent,
    DifficultyViewerComponent,
    LevelEditableNameComponent,
    ReportButtonComponent,
    ResetPasswordPageComponent,
    SendPasswordSessionComponent,
    AuthorizationPageComponent,
    IpViewComponent,
    TimeTextComponent,
    WideIconButtonComponent,
    LevelLikeButtonComponent,
    LevelQueueButtonComponent,
    LogOutButtonComponent,
    BannedPageComponent,
    PunishmentViewComponent,
    RemoveAccountPageComponent,
    RemovalWarningComponent,
    LoginFormComponent,
    RemoveAccountPageComponent,
    RemoveAccountFormComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgOptimizedImage,
  ],
  providers: [ApiClientInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
