import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../_services';
import { MustMatch } from '../_helpers';

@Component({ templateUrl: 'report.component.html' })
export class ReportComponent implements OnInit {
  //form: FormGroup;
  //id: string;
  //isAddMode: boolean;
  loading = false;
  //submitted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {}

  // convenience getter for easy access to form fields
}
