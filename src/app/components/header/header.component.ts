import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Product } from '../../Product';

import { environment } from '../../../environments/environment';
import { ProductService } from '../../services/product.service';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { RouterLink } from '@angular/router';

import { AuthService } from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent{

  allProducts: Product[] = [];
  products: Product[] = [];
  baseApiUrl = environment.baseApiUrl;
  
  faSearch = faSearch;
  searchTerm: string = '';
  
  // Variável para verificar se o usuário está autenticado
  isAuthenticated: boolean = false;

  constructor(
    private productService: ProductService,
    private authService: AuthService  // Injeção do AuthService
  ) {}

  ngOnInit(): void {
    // Verifica se o usuário está autenticado
    this.isAuthenticated = this.authService.isAuthenticated();

    // Requisita os produtos da API
    this.productService.getProducts().subscribe((items) => {
      const data = items.data;
      this.allProducts = data;
      this.products = data;
    });
  }

  search(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.products = this.allProducts.filter(product => {
      return product.name.toLowerCase().includes(value.toLowerCase()); // Adicionando toLowerCase para a busca ficar insensível a maiúsculas
    });
  }

}
