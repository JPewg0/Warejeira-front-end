import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { User } from '../User';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseApiUrl = environment.baseApiUrl
  private apiUrl = `${this.baseApiUrl}/users`;

  constructor(private http: HttpClient) { }

  createUser(formData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }
}
