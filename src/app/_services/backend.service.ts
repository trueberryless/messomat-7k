import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '../_models/data';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Data[]>(`${environment.apiUrl}/all`);
  }
}
