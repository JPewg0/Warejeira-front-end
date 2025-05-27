import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CartItem } from '../Cart';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}/cart_products`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Token não encontrado. O usuário não está autenticado.');
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getCart(userId: string): Observable<CartItem[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<{ data: CartItem[] }>(`${this.apiUrl}/user/${userId}`, { headers })
      .pipe(map(response => response.data));
  }

  addToCart(productId: number, quantity: number, userId: string): Observable<CartItem> {
    const headers = this.getAuthHeaders();
    const cartItem: CartItem = {
      product_id: productId,
      quantity,
      user_id: userId,
    };
    return this.http.post<CartItem>(this.apiUrl, { cart_product: cartItem }, { headers });
  }

  updateCartItem(item: CartItem): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/${item.id}`, { cart_product: item }, { headers });
  }

  removeCartItem(cartItemId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/${cartItemId}`, { headers });
  }
}
