import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { TableComponent } from './table/table';
import { CreateComponent } from './create/create';
import { DetailComponent } from './detail/detail';

export const routes: Routes = [{
    path: "",
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: "table",
    component: TableComponent
  },
  {
    path: "create",
    component: CreateComponent
  },
  {
    path: "member/:id",
    component: DetailComponent
  }];