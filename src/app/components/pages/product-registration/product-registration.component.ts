import { Component } from '@angular/core';
import { ProductFormComponent } from '../../product-form/product-form.component';
import { ProductService } from '../../../services/product.service';
import { MessagesService } from '../../../services/messages.service';
import { Router } from '@angular/router';
import { Product } from '../../../Product';

@Component({
  selector: 'app-product-registration',
  standalone: true,
  imports: [ProductFormComponent],
  templateUrl: './product-registration.component.html',
  styleUrl: './product-registration.component.css'
})
export class ProductRegistrationComponent {
  btnText = "Cadastrar Produto";

  constructor(
    private productService: ProductService, 
    private messageService: MessagesService,
    private router: Router
  ){}

  async createHandler(product: Product) {
    const productData = {
      name: product.name,
      category: product.category,
      stock_quantity: product.stock_quantity,
      price: product.price,
    };
  
    const phoenixFormattedData = {
      product: productData, // Mantém a estrutura esperada pelo backend
    };
  
    try {
      // Criar produto
      this.productService.createProduct(phoenixFormattedData).subscribe({
        next: (response) => {
          console.log('Produto criado com sucesso:', response);
  
          // Preparar `FormData` para o upload da imagem
          const formData = new FormData();
          formData.append('image', product.image); // Certifique-se de que `product.image` seja um `File` válido
  
          // Fazer upload da imagem
          this.productService.uploadImage(formData).subscribe({
            next: (uploadResponse) => {
              console.log('Imagem enviada com sucesso:', uploadResponse);
              // Navegar após concluir todo o processo
              this.router.navigate(['/login']);
            },
            error: (uploadError) => {
              console.error('Erro ao fazer upload da imagem:', uploadError);
            },
          });
        },
        error: (error) => {
          console.error('Erro ao criar o produto:', error);
        },
      });
    } catch (error) {
      console.error('Erro inesperado:', error);
    }
  }
}
