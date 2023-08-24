import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { IncidentService } from '../_services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
  incidents = null;

  constructor(private incidentService: IncidentService) {}

  ngOnInit() {
    console.log('inceidents');
    this.incidentService
      .getAll()
      .pipe(first())
      .subscribe((incidents) => (this.incidents = incidents));

    console.log(this.incidents);
  }
}
