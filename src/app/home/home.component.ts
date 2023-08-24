import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../_models';
import { AuthenticationService } from '../_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
  user?: User | null;
  constructor(private authService: AuthenticationService) {
    this.authService.user.subscribe((x) => (this.user = x));
  }

  ngOnInit() {
    //this.user = this.authService.userValue;

    console.log(this.user.firstName);
  }
}
