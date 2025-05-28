import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}/companies`;

  constructor(private http: HttpClient) {}

  // Criar empresa
  createCompany(formData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData).pipe(
      catchError(error => {
        console.error('Erro ao criar empresa:', error);
        return throwError(() => error);
      })
    );
  }

  updateCompany(id: number, formData: any): Observable<any> {
    if (!id) {
      return throwError(() => new Error('ID da empresa não fornecido.'));
    }

    // Remove o cabeçalho customizado 'id'
    // const headers = new HttpHeaders().set('id', id.toString());

    // Coloque o id na URL da requisição
    return this.http.put<any>(`${this.apiUrl}/${id}`, formData /*, { headers } se precisar de outros headers */).pipe(
      catchError(error => {
        console.error('Erro ao atualizar a empresa:', error);
        return throwError(() => error);
      })
    );
  }

  // Obter dados da empresa pelo userId
  getCompanyData(userId: string): Observable<any> {
    if (!userId) {
      return throwError(() => new Error('ID do usuário não fornecido.'));
    }

    return this.http.get<any>(`${this.apiUrl}/${userId}`).pipe(
      catchError(error => {
        console.error('Erro ao obter os dados da empresa:', error);
        return throwError(() => error);
      })
    );
  }

  // Verifica se CNPJ já está registrado
  checkCompanyExists(cnpj: string): Observable<boolean> {
    return this.http.get<{ exists: boolean }>(`${this.apiUrl}/check?cnpj=${cnpj}`).pipe(
      map(response => response.exists),
      catchError(error => {
        console.error('Erro ao verificar CNPJ:', error);
        return throwError(() => error);
      })
    );
  }
}
