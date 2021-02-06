import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'landing',
    loadChildren: './pages/landing/landing.module#LandingPageModule'
  },
  {
    path: 'page',
    loadChildren: './pages/page/page.module#PagePageModule'
  },
  {
    path: 'explore',
    loadChildren: './pages/explore/explore.module#ExplorePageModule'
  },
  {
    path: 'me',
    loadChildren: './pages/me/me.module#MePageModule'
  },
  {
    path: 'forgot-password',
    loadChildren: './pages/forgot-password/forgot-password.module#ForgotPasswordPageModule'
  },
  {
    path: 'settings',
    loadChildren: './pages/settings/settings.module#SettingsPageModule'
  },
  {
    path: 'matches',
    loadChildren: './pages/matches/matches.module#MatchesPageModule'
  },
  {
    path: 'chat',
    loadChildren: './pages/chat/chat.module#ChatPageModule'
  },
  {
    path: 'page',
    loadChildren: () => import('./pages/page/page.module').then(m => m.PagePageModule)
  },
  {
    path: 'edit-media',
    loadChildren: () => import('./pages/edit-media/edit-media.module').then(m => m.EditMediaPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./pages/notifications/notifications.module').then(m => m.NotificationsPageModule)
  },
  {
    path: 'edit-user',
    loadChildren: () => import('./pages/edit-user/edit-user.module').then(m => m.EditUserPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./pages/change-password/change-password.module').then(m => m.ChangePasswordPageModule)
  },
  {
    path: 'user-photos',
    loadChildren: () => import('./pages/user-photos/user-photos.module').then(m => m.UserPhotosPageModule)
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./pages/contact-us/contact-us.module').then( m => m.ContactUsPageModule)
  },
  {
    path: 'filter-results',
    loadChildren: () => import('./pages/filter-results/filter-results.module').then( m => m.FilterResultsPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'register-steps',
    loadChildren: () => import('./pages/register-steps/register-steps.module').then( m => m.RegisterStepsPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
