import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ServiceComponent } from './service/service.component';
import { AboutComponent } from './about/about.component';


@NgModule({
  declarations: [
    ServiceComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule
  ]
})
export class ServicesModule { }
