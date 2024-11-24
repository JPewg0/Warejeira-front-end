import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http'; 

import { catchError } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}/users`;

  constructor(private http: HttpClient) {}

  // Método para criar o usuário
  createUser(formData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }

  // Método para obter os dados do usuário, agora aceita o 'userId' como parâmetro
  getUserData(userId: string): Observable<any> {
    const token = localStorage.getItem('authToken'); // Obtém o token do localStorage

    if (!token || !userId) {
      return throwError('Token ou ID não encontrados. O usuário não está autenticado.');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Faz a requisição GET com o token no cabeçalho para obter os dados do usuário
    return this.http.get<any>(`${this.apiUrl}/${userId}`, { headers }).pipe(
      catchError((error) => {
        console.error('Erro ao obter os dados do usuário:', error);
        return throwError(error); // Retorna o erro para quem chamou
      })
    );
  }

   // Método para excluir a conta do usuário
   deleteUserAccount(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userId}`);
  }

}