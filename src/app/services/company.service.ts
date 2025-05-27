import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}/companies`;

  constructor(private http: HttpClient) { }

  createCompany(formData: any): Observable<any> {
    const token = localStorage.getItem('authToken');

    if (!token) {
      return throwError(() => new Error('Token não encontrado. O usuário não está autenticado.'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(this.apiUrl, formData, { headers });
  }

  updateCompany(id: any, formData: any): Observable<FormData> {
    const token = localStorage.getItem('authToken');

    if (!token) {
      return throwError(() => new Error('Token não encontrado. O usuário não está autenticado.'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<FormData>(`${this.apiUrl}/${id}`, formData, { headers }).pipe(
      catchError((error) => {
        console.error('Erro ao atualizar a conta do usuário:', error);
        return throwError(() => error);
      })
    );
  }

  getCompanyData(userId: string): Observable<any> {
    const token = localStorage.getItem('authToken');

    if (!token || !userId) {
      return throwError(() => new Error('Token ou ID não encontrados.'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(`${this.apiUrl}/${userId}`, { headers }).pipe(
      catchError((error) => {
        console.error('Erro ao obter os dados da empresa:', error);
        return throwError(() => error);
      })
    );
  }
}
