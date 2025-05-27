import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';

import { ProductService } from '../../../services/product.service';

import { Product } from '../../../Product';

import { environment } from '../../../../environments/environment';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  product?: Product;
  baseApiUrl = environment.baseApiUrl

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productService
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

  addToCart(): void {
    console.log('Botão clicado - função addToCart chamada');
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('Usuário não está logado.'); // log extra
      alert('Você precisa estar logado para adicionar ao carrinho!');
      return;
    }

    if (!this.product) {
      console.warn('Produto ainda não carregado.'); // log extra
      alert('Produto ainda não carregado. Tente novamente mais tarde.');
      return;
    }

    this.cartService.addToCart(this.product.id, this.quantity, userId).subscribe({
      next: (res) => {
        console.log('Produto adicionado ao carrinho com sucesso:', res); // log ok
        alert('Produto adicionado ao carrinho!');
      },
      error: err => {
        console.error('Erro ao adicionar ao carrinho:', err); // log de erro
        alert('Erro ao adicionar ao carrinho.');
      }
    });
  }
}