import { Routes } from '@angular/router';

export const slotsRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('../slots-page/slots-page.component').then(m => m.SlotsPageComponent),
  },
];
