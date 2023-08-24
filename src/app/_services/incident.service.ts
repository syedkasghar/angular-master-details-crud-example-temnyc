import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Incident } from '../_models';

const baseUrl = `${environment.apiUrl}/incidents`;

@Injectable({ providedIn: 'root' })
export class IncidentService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Incident[]>(baseUrl);
  }

  getById(id: string) {
    const incident = this.http.get<Incident>(`${baseUrl}/${id}`);
    return incident;
  }

  create(params) {
    console.log('create');
    console.log(params);
    return this.http.post(baseUrl, params);
  }

  update(id: string, params) {
    return this.http.put(`${baseUrl}/${id}`, params);
  }

  delete(id: string) {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
