import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { ServiceComponent } from './service/service.component';

const routes: Routes = [
  {path:"",component:ServiceComponent,children:[
    {path:"about",component:AboutComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
