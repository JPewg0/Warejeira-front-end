import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Product } from '../Product';
import { Response } from '../Response';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}/products`;
  private categoriesUrl = `${this.baseApiUrl}/categories`; // URL para categorias

  constructor(private http: HttpClient) {}

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
    return this.http.post<any>(this.apiUrl, formData);
  }

  // Método para upload de imagem
  uploadImage(formData: FormData): Observable<any> {
    const headers = new HttpHeaders(); // Não defina o `Content-Type` manualmente.
    return this.http.post<any>(`${this.apiUrl}/upload-image`, formData, { headers });
  }

  // Método para buscar categorias
  getCategories(): Observable<any> {
    return this.http.get<any[]>(this.categoriesUrl); // Retorna o objeto com 'categories'
  }
}

