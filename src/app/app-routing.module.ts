import { NgModule } from '@angular/core';
import { PreloadAllModules,RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { ClienteGuard } from './cliente.guard';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'product',
        loadChildren: () =>
          import('./products/products.module').then((m) => m.ProductsModule),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'admin',
        loadChildren: () =>
        import('./admin/admin.module').then((m) => m.AdminModule),
        data:{
          role:'admin'
        },
        canActivate:[ClienteGuard],
      },
      {
        path: 'cliente',
        loadChildren: () =>
          import('./cliente/Cliente.module').then((m) => m.ClienteModule),
          data:{
            role:'cliente'
          },
          canActivate:[ClienteGuard],
      },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy: PreloadAllModules,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
