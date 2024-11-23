import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Product } from '../Product';
import { Response } from '../Response';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseApiUrl = environment.baseApiUrl
  private apiUrl = `${this.baseApiUrl}/products`;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Response<Product[]>>{
    return this.http.get<Response<Product[]>>(this.apiUrl);
  }

  getProduct(id: number): Observable<Response<Product>>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Response<Product>>(url);
  }

  createProduct(formData: FormData): Observable<FormData>{
    return this.http.post<FormData>(this.apiUrl, formData);
  }
}
