import { Injectable } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private baseApiUrl = environment.baseApiUrl
  private apiUrl = `${this.baseApiUrl}/companies`;

  constructor(private http: HttpClient) { }

  createCompany(formData: any): Observable<any> {
    const token = localStorage.getItem('authToken'); // Obtém o token do localStorage

    if (!token) {
      return throwError('Token não encontrados. O usuário não está autenticado.');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(this.apiUrl, formData, { headers });
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