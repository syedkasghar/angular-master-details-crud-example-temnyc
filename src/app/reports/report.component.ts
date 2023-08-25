import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../_services';
import { MustMatch } from '../_helpers';
import { ReportsService } from '../_services';
@Component({ templateUrl: 'report.component.html' })
export class ReportComponent implements OnInit {
  //form: FormGroup;
  //id: string;
  //isAddMode: boolean;
  deviceIncidents = null;
  //submitted = false;

  constructor(private deviceIncidentService: ReportsService) {}

  ngOnInit() {
    console.log('inceidents');
    this.deviceIncidentService
      .getAll()
      .pipe(first())
      .subscribe(
        (deviceIncidentss) => (this.deviceIncidents = deviceIncidentss)
      );

    // console.log(this.incidents);
  }

  // convenience getter for easy access to form fields
}
