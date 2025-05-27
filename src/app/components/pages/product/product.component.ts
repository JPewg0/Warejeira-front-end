import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';

import { MessagesService } from '../../../services/messages.service';

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
  message: string | null = null; // Mensagem de erro ou sucesso

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private messagesService: MessagesService
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
      this.messagesService.add('Produto ainda não carregado. Tente novamente mais tarde');
    } else {
      this.messagesService.add('Quantidade máxima atingida');
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    } else {
      this.messagesService.add('A quantidade mínima é 1!');
    }
  }

  addToCart(): void {
    console.log('Botão clicado - função addToCart chamada');
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('Usuário não está logado.'); // log extra
      this.messagesService.add('Você precisa estar logado para adicionar ao carrinho');
      return;
    }

    if (!this.product) {
      console.warn('Produto ainda não carregado.'); // log extra
      this.messagesService.add('Produto ainda não carregado. Tente novamente mais tarde');
      return;
    }

    this.cartService.addToCart(this.product.id, this.quantity, userId).subscribe({
      next: (res) => {
        console.log('Produto adicionado ao carrinho com sucesso:', res); // log ok
        this.messagesService.add('Produto adicionado ao carrinho');
      },
      error: err => {
        console.error('Erro ao adicionar ao carrinho:', err); // log de erro
        this.messagesService.add('Erro ao adicionar o carrinho');
      }
    });
  }
}