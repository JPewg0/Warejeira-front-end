import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Product } from '../../../Product';

import { environment } from '../../../../environments/environment';
import { ProductService } from '../../../services/product.service';

import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  allProducts: Product[] = []
  products: Product[] = [] 
  baseApiUrl = environment.baseApiUrl

  //todo search

  constructor(
    private productService: ProductService,
    private searchService: SearchService
  ){ }

  ngOnInit(): void{
    this.productService.getProducts().subscribe((items) => {

      const data = items.data


      this.allProducts = data
      this.products = data
    });

    // Atualiza os produtos quando o valor da busca muda
    this.searchService.search$.subscribe((value) => {
      this.products = this.allProducts.filter(product =>
        product.name.toLowerCase().includes(value)
      );
    });
  }
}
