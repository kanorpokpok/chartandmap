import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmchartComponent } from './amchart/amchart.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  { path: 'map', component: MapComponent },
  { path: 'chart', component: AmchartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
