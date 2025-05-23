import { Component, OnInit, OnDestroy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { Product } from '../../Product';

import { environment } from '../../../environments/environment';
import { ProductService } from '../../services/product.service';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { RouterLink, Router } from '@angular/router';

import { AuthService } from '../../services/authentication.service';

import { SearchService } from '../../services/search.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  allProducts: Product[] = [];
  products: Product[] = [];
  baseApiUrl = environment.baseApiUrl;
  
  faSearch = faSearch;
  searchTerm: string = '';

  // Variável para verificar se o usuário está autenticado
  isAuthenticated: boolean = false;

  private authSubscription?: Subscription;  // Adicionando o `?` para indicar que a variável pode ser indefinida

  constructor(
    private productService: ProductService,
    private authService: AuthService,  // Injeção do AuthService
    private searchService: SearchService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Assine o observable do estado de autenticação
    this.authSubscription = this.authService.isAuthenticated$.subscribe((authState) => {
      this.isAuthenticated = authState;
    });

    // Requisita os produtos da API
    this.productService.getProducts().subscribe((items) => {
      const data = items.data;
      this.allProducts = data;
      this.products = data;
    });
  }

  ngOnDestroy(): void {
    // Desinscreva-se do observable para evitar vazamentos de memória
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  search(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;
  
    this.searchTerm = value;
  
    // Atualiza o serviço com o termo
    this.searchService.updateSearch(value);
  
    // Redireciona para /home com o termo como query param
    this.router.navigate(['/home'], { queryParams: { q: value } });
  }  
}