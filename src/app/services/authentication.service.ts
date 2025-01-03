import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseApiUrl = environment.baseApiUrl; // Ex: 'http://localhost:4000/api'
  private apiUrl = `${this.baseApiUrl}/login`; // URL para o login
  private logoutUrl = `${this.baseApiUrl}/logout`; // URL para o logout

  private authState = new BehaviorSubject<boolean>(this.isAuthenticated());

  isAuthenticated$ = this.authState.asObservable(); // Observable para o estad

  constructor(private http: HttpClient) {}

  // Método para autenticar o usuário
  authenticateUser(email: string, password: string): Observable<boolean> {
    const loginData = { email, password };

    // Requisição POST para o login
    return this.http.post<any>(this.apiUrl, loginData).pipe(
      map(response => {
        // Verifica se o retorno do backend contém o objeto 'data' com 'token' e 'id'
        if (response && response.data && response.data.token && response.data.id) {
          console.log('Usuário autenticado com sucesso:', response.data);
          
          // Armazenar o token e o ID no localStorage
          localStorage.setItem('authToken', response.data.token);
          localStorage.setItem('userId', response.data.id);

          this.authState.next(true); // Atualiza o estado para logado
          return true; // Login bem-sucedido
        } else {
          console.error('Falha na autenticação: Dados incompletos', response);
          this.authState.next(false); // Atualiza o estado para deslogado
          return false; // Login falhou
        }
      }),
      catchError(error => {
        console.error('Erro ao autenticar usuário:', error);
        this.authState.next(false); // Atualiza o estado para deslogado
        return of(false); // Retorna falso em caso de erro na requisição
      })
    );
  }

  // Método para verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken'); // Retorna true se o token existir
  }

  // Método para realizar o logout
  logout(): Observable<void> {
    return this.http.get<any>(this.logoutUrl).pipe(
      map(response => {
        console.log(response.msg); // Exibe "Logged out" do backend
        // Remove o token e o ID do localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        this.authState.next(false); // Atualiza o estado para deslogado
      }),
      catchError(error => {
        console.error('Erro ao realizar logout:', error);
        return of(); // Retorna um observable vazio em caso de erro
      })
    );
  }
}




