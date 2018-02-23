import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: './modules/home/index.module#HomeModule',
    data: {
      preload: true
    }
  }
];

export const routing = RouterModule.forRoot(routes);
