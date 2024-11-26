import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ProductService } from '../../../services/product.service';

import { Product } from '../../../Product';

import { environment } from '../../../../environments/environment';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  product?: Product;
  baseApiUrl = environment.baseApiUrl

  constructor(
    private productServise: ProductService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productServise
    .getProduct(id)
    .subscribe((item) => (this.product = item.data));
  }

  // Método para aumentar a quantidade

  quantity: number = 1; // Quantidade inicial

  increaseQuantity(): void {
    if (this.product && this.quantity < this.product.stock_quantity) {
      this.quantity++;
    } else if (!this.product) {
      alert('Produto ainda está carregando. Tente novamente!');
    } else {
      alert('Quantidade máxima atingida!');
    }
  }
  
  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    } else {
      alert('A quantidade mínima é 1!');
    }
  }
}
