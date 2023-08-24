import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { IncidentsRoutingModule } from './incidents-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, IncidentsRoutingModule],
  //declarations: [LayoutComponent, ListComponent],
  declarations: [LayoutComponent, ListComponent, AddEditComponent],
})
export class IncidentsModule {}
