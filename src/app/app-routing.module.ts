import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module')
      .then(m => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module')
      .then(m => m.LoginPageModule),
    canActivate: [NoAuthGuard]
  },
  {
    path: 'itinerary',
    loadChildren: () => import('./pages/itinerary/itinerary.module')
      .then(m => m.ItineraryPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'packing-list',
    loadChildren: './pages/packing-list/packing-list.module#PackingListPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'guides',
    loadChildren: './pages/guides/guides.module#GuidesPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'faq',
    loadChildren: './pages/faq/faq.module#FaqPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'documents',
    loadChildren: './pages/documents/documents.module#DocumentsPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    loadChildren: './pages/register/register.module#RegisterPageModule',
    canActivate: [NoAuthGuard]
  },
  {
    path: 'trip-codes',
    loadChildren: './pages/trip-codes/trip-codes.module#TripCodesPageModule',
    canActivate: [NoAuthGuard]
  },
  {
    path: 'privacy-policy',
    loadChildren: './pages/privacy-policy/privacy-policy.module#PrivacyPolicyPageModule'
  },
  {
    path: 'waiver',
    loadChildren: './pages/waiver/waiver.module#WaiverPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'personal-info',
    loadChildren: './pages/personal-info/personal-info.module#PersonalInfoPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'update-personal-info',
    loadChildren: './pages/update-personal-info/update-personal-info.module#UpdatePersonalInfoPageModule'
  },
  {
    path: 'reset-password/:token',
    loadChildren: './pages/reset-password/reset-password.module#ResetPasswordPageModule',
    canActivate: [NoAuthGuard]
  },
  {
    path: 'forgot-password',
    loadChildren: './pages/forgot-password/forgot-password.module#ForgotPasswordPageModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
