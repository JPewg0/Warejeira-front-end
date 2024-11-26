import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private baseApiUrl = environment.baseApiUrl
  private apiUrl = `${this.baseApiUrl}api/moments`;

  constructor(private http: HttpClient) { }

  createCompany(formData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }
}
