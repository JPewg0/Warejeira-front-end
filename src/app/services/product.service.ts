import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Product } from '../Product';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseApiUrl = environment.baseApiUrl
  private apiUrl = `${this.baseApiUrl}api/moments`;

  constructor(private http: HttpClient) { }

  createProduct(formData: FormData): Observable<FormData>{
    return this.http.post<FormData>(this.apiUrl, formData);
  }
}
