import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class CartComponent implements OnInit {
  cartProducts: any[] = [];
  userId: string = '89d91017-7a89-4f14-a365-5013b7720278'; // pegue do auth futuramente

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart(this.userId).subscribe({
      next: (cartItems) => {
        this.cartProducts = cartItems;
      },
      error: (err) => {
        console.error('Erro ao carregar carrinho:', err);
      }
    });
  }

  updateQuantity(item: any): void {
    const updatedItem = {
      product_id: item.product_id,
      user_id: this.userId,
      quantity: item.quantity
    };

    this.cartService.updateCartItem(updatedItem).subscribe({
      next: () => {
        console.log('Quantidade atualizada com sucesso');
      },
      error: (err) => {
        console.error('Erro ao atualizar quantidade:', err);
      }
    });
  }

  removeFromCart(item: any): void {
    this.cartService.removeCartItem(item.product_id).subscribe({
      next: () => {
        this.loadCart();
      },
      error: (err) => {
        console.error('Erro ao remover item do carrinho:', err);
      }
    });
  }

  checkout(): void {
    alert('Finalizando pedido... (implementar lógica)');
  }
}

