import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {Route, RouterModule} from '@angular/router';
import {SharedModule} from "../../shared/shared.module";
import {CardsSectionComponent} from './home/cards-section/cards-section.component';
import { CustomMaterialModule } from 'src/app/CustomMaterial.module';

const iniciaRouter: Route[] = [
  {
      path     : '',
      component: HomeComponent
  },

];

@NgModule({
  declarations: [
    HomeComponent,
    CardsSectionComponent
  ],
  imports: [
    RouterModule.forChild(iniciaRouter),
    CommonModule,
    SharedModule,
    CustomMaterialModule
  ]
})
export class InicioModule { }
