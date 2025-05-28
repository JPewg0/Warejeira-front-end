import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}/users`;

  constructor(private http: HttpClient) {}

  // Criar usuário
  createUser(formData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }

  // Obter dados do usuário
  getUserData(userId: string): Observable<any> {
    if (!userId) {
      return throwError(() => new Error('ID do usuário não fornecido.'));
    }

    return this.http.get<any>(`${this.apiUrl}/${userId}`).pipe(
      catchError(error => {
        console.error('Erro ao obter os dados do usuário:', error);
        return throwError(() => error);
      })
    );
  }

  // Excluir conta do usuário
  deleteUserAccount(userId: string): Observable<any> {
    if (!userId) {
      return throwError(() => new Error('ID do usuário não fornecido.'));
    }

    return this.http.delete(`${this.apiUrl}/${userId}`).pipe(
      catchError(error => {
        console.error('Erro ao excluir a conta do usuário:', error);
        return throwError(() => error);
      })
    );
  }

  // Atualizar conta do usuário
  updateUser(id: string, formData: any): Observable<any> {
    if (!id) {
      return throwError(() => new Error('ID do usuário não fornecido.'));
    }

    return this.http.put<any>(`${this.apiUrl}/${id}`, formData).pipe(
      catchError(error => {
        console.error('Erro ao atualizar a conta do usuário:', error);
        return throwError(() => error);
      })
    );
  }
}
