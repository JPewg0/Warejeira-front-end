import { Component } from '@angular/core';

import { Product } from '../../Product';

import { environment } from '../../../environments/environment';
import { ProductService } from '../../services/product.service';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  allProducts: Product[] = []
  products: Product[] = [] 
  baseApiUrl = environment.baseApiUrl

  faSearch = faSearch
  searchTerm: string = '';

  constructor(private productService: ProductService){ }

  ngOnInit(): void{
    this.productService.getProducts().subscribe((items) => {

      const data = items.data

      this.allProducts = data
      this.products = data
    });
  }

  search(e: Event): void {

    const target = e.target as HTMLInputElement
    const value = target.value

    this.products = this.allProducts.filter(product => {
      return product.name.toLowerCase().includes(value);
    });

  }

}
