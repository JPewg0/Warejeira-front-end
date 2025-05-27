import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { catchError } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseApiUrl = environment.baseApiUrl
  private apiUrl = `${this.baseApiUrl}/orders`;

  constructor(private http: HttpClient) { }

  createReport(): Observable<Blob> {
    const token = localStorage.getItem('authToken');

    if (!token) {
      return throwError(() => new Error('Token não encontrado. O usuário não está autenticado.'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.apiUrl}/export-stream`, {
      headers,
      responseType: 'blob'
    });
  }
}