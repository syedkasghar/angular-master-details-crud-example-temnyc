import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { DeviceIncidentss } from '../_models';

const baseUrl = `${environment.apiUrl}/reports`;

@Injectable({ providedIn: 'root' })
export class ReportsService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<DeviceIncidentss[]>(baseUrl);
  }
}
