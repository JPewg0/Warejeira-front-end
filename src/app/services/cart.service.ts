import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = `${environment.baseApiUrl}/cart`; // ajuste conforme seu backend

  constructor(private http: HttpClient) {}

  // Buscar os produtos do carrinho de um usuário
  getCart(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${userId}`);
  }

  // Adicionar item ao carrinho
  addToCart(productId: number, quantity: number, userId: string): Observable<any> {
    const cartItem = {
      product_id: productId,
      quantity: quantity,
      user_id: userId
    };

    return this.http.post<any>(`${this.apiUrl}/add`, cartItem);
  }

  // Atualizar quantidade
  updateCartItem(item: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update`, item);
  }

  // Remover item do carrinho
  removeCartItem(productId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/remove/${productId}`);
  }
}
