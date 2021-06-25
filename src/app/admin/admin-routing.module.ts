import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DsabhboardComponent } from './components/dsabhboard/dsabhboard.component';




const routes: Routes = [
  {path: '', component:DsabhboardComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
