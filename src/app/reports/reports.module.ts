import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { LayoutComponent } from './layout.component';

import { ReportComponent } from './report.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, ReportsRoutingModule],
  //declarations: [LayoutComponent, ListComponent],
  declarations: [LayoutComponent, ReportComponent],
})
export class ReportsModule {}
