import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseApiUrl = environment.baseApiUrl;
  private uploadUrl = `${this.baseApiUrl}/upload`;
  private apiUrl = `${this.baseApiUrl}/products`;
  private categoriesUrl = `${this.baseApiUrl}/categories`;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getProduct(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createProduct(formData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }

  uploadImage(formData: FormData): Observable<any> {
    return this.http.post<any>(this.uploadUrl, formData);
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(this.categoriesUrl);
  }
}
