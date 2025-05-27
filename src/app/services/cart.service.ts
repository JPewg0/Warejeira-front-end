import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CartItem } from '../Cart';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}/cart_products`;

  // Subject para o contador do carrinho
  private cartItemCount = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCount.asObservable(); // Exposto para os componentes

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Token não encontrado. O usuário não está autenticado.');
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Atualiza o contador a partir da API
  updateCartItemCount(userId: string): void {
    this.getCart(userId).subscribe(items => {
      const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
      this.cartItemCount.next(totalQuantity);
    });
  }

  getCart(userId: string): Observable<CartItem[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<{ data: CartItem[] }>(`${this.apiUrl}/user/${userId}`, { headers })
      .pipe(map(response => response.data));
  }

  addToCart(productId: number, quantity: number, userId: string): Observable<CartItem> {
    const headers = this.getAuthHeaders();
    const cartItem: CartItem = { product_id: productId, quantity, user_id: userId };
    return this.http.post<CartItem>(this.apiUrl, { cart_product: cartItem }, { headers }).pipe(
      tap(() => this.updateCartItemCount(userId))
    );
  }

  updateCartItem(item: CartItem): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/${item.id}`, { cart_product: item }, { headers }).pipe(
      tap(() => this.updateCartItemCount(item.user_id!))
    );
  }

  removeCartItem(cartItemId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/${cartItemId}`, { headers });
  }
}