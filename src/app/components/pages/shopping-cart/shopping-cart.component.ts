import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit {
  cartProducts: any[] = [];
  userId: string = '89d91017-7a89-4f14-a365-5013b7720278'; // pegue do auth futuramente

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  increaseQuantity(item: any): void {
    if (item.quantity < item.product.data.stock_quantity) {
      item.quantity++;
      this.updateQuantity(item);
    }
  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateQuantity(item);
    }
  }

  loadCart(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('Usuário não está logado.');
      return;
    }

    this.cartService.getCart(userId).subscribe({
      next: (cartItems) => {
        this.cartProducts = cartItems.map((item: any) => {
          return {
            ...item,
            name: item.product.name,
            price: item.product.price,
            image_url: item.product.image_url,
            description: item.product.description
          };
        });

        console.log('Carrinho carregado:', this.cartProducts);

        if (this.cartProducts.length === 0) {
          console.warn('Carrinho vazio');
        }
      },
      error: (err) => {
        console.error('Erro ao carregar carrinho:', err);
      }
    });
  }

  updateQuantity(item: any): void {
    const updatedItem = {
      id: item.id, // <-- ESSENCIAL
      product_id: item.product_id,
      user_id: this.userId,
      quantity: item.quantity
    };

    if (!updatedItem.id) {
      console.error('ID do item está indefinido. Não é possível atualizar.');
      return;
    }

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
    if (!item.id) {
      console.error('ID do item do carrinho é indefinido');
      return;
    }

    this.cartService.removeCartItem(item.id).subscribe({
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

