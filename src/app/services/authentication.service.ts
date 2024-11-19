import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private dbUrl = 'http://localhost:3000/users'; // Caminho para o arquivo JSON

  constructor(private http: HttpClient) {}

  // Método que faz a requisição para o arquivo JSON
  login(): Observable<any> {
    return this.http.get<any>(this.dbUrl);
  }

  authenticateUser(email: string, password: string): Observable<boolean> {
    return new Observable(observer => {
      this.login().subscribe(
        (users) => {
          // Verificar se os dados são um array
          console.log('Resposta do servidor:', users);
  
          // Realizar a busca no array de usuários
          const user = users.find((u: any) => u.email === email && u.password === password);
  
          if (user) {
            observer.next(true); // Login bem-sucedido
          } else {
            observer.next(false); // Credenciais inválidas
          }
  
          observer.complete();
        },
        (error) => {
          console.error('Erro ao buscar usuários:', error);
          observer.next(false); // Tratar erro de requisição
          observer.complete();
        }
      );
    });
  }
}  

