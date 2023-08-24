import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './_models';
import { AuthenticationService } from './_services';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
  user?: User | null;
  constructor(private authService: AuthenticationService) {
    this.authService.user.subscribe((x) => (this.user = x));
  }

  logout() {
    this.authService.logout();
  }
}
