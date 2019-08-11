import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
      path: 'login',
      loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'itinerary',
    loadChildren: () => import('./pages/itinerary/itinerary.module').then(m => m.ItineraryPageModule)
  },
  { path: 'packing-list', loadChildren: './pages/packing-list/packing-list.module#PackingListPageModule' },
  { path: 'guides', loadChildren: './pages/guides/guides.module#GuidesPageModule' },
  { path: 'faq', loadChildren: './pages/faq/faq.module#FaqPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
