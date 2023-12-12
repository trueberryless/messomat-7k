import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { Data, Fan } from '@app/_models';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Data[]> {
    return this.http.get<Data[]>(`${this.apiUrl}/all`);
  }

  getStatus() {
    return firstValueFrom(this.http.get<Fan>(`${this.apiUrl}/status`));
  }

  setFan(on: number) {
    this.http.get<Fan>(`${this.apiUrl}/set_fan?on=${on}`);
  }
}
