import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LayoutComponent } from './layout.component';

import { LoginFormComponent } from './login-form.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, LoginRoutingModule],
  //declarations: [LayoutComponent, ListComponent],
  declarations: [LayoutComponent, LoginFormComponent],
})
export class LoginModule {}
