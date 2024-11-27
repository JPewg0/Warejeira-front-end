import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Product } from '../Product';
import { Response } from '../Response';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseApiUrl = environment.baseApiUrl;
  private uploadUrl = `${this.baseApiUrl}/upload`;
  private apiUrl = `${this.baseApiUrl}/products`;
  private categoriesUrl = `${this.baseApiUrl}/categories`; // URL para categorias

  constructor(private http: HttpClient) { }

  // Método para buscar todos os produtos
  getProducts(): Observable<Response<Product[]>> {
    return this.http.get<Response<Product[]>>(this.apiUrl);
  }

  // Método para buscar um produto pelo ID
  getProduct(id: number): Observable<Response<Product>> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Response<Product>>(url);
  }

  // Método para criar um produto
  createProduct(formData: any): Observable<any> {
    const token = localStorage.getItem('authToken'); // Obtém o token do localStorage

    if (!token) {
      return throwError('Token não encontrado. O usuário não está autenticado.');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<any>(this.apiUrl, formData, { headers });
  }

  // Método para upload de imagem
  uploadImage(formData: FormData): Observable<any> {
    const token = localStorage.getItem('authToken'); // Obtém o token do localStorage

    if (!token) {
      return throwError('Token não encontrado. O usuário não está autenticado.');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.uploadUrl}`, formData, { headers });
  }

  // Método para buscar categorias
  getCategories(): Observable<any> {
    return this.http.get<any[]>(this.categoriesUrl); // Retorna o objeto com 'categories'
  }
}

