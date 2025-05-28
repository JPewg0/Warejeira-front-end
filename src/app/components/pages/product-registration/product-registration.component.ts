import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductFormComponent } from '../../product-form/product-form.component';
import { ProductService } from '../../../services/product.service';
import { MessagesService } from '../../../services/messages.service';
import { Product } from '../../../Product';

@Component({
  selector: 'app-product-registration',
  standalone: true,
  imports: [ProductFormComponent],
  templateUrl: './product-registration.component.html',
  styleUrl: './product-registration.component.css'
})
export class ProductRegistrationComponent implements OnInit {
  btnText = "Cadastrar Produto";
  companyId: number | null = null;

  constructor(
    private productService: ProductService,
    private messageService: MessagesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.companyId = +params['companyId'] || null;
      console.log('Company ID recebido da rota:', this.companyId);
    });
  }

  createHandler(product: Product) {
    if (!this.companyId) {
      this.messageService.add('ID da empresa não foi informado.');
      return;
    }

    const productData = {
      name: product.name,
      categories: product.categories,
      company_id: this.companyId,
      stock_quantity: product.stock_quantity,
      price: product.price,
      description: product.description,
      image_url: ''
    };

    const requestBody = { product: productData };

    this.productService.createProduct(requestBody).subscribe({
      next: (response) => {
        console.log('Produto criado com sucesso:', response);

        if (product.image instanceof File) {
          const formData = new FormData();
          formData.append('image', product.image);
          formData.append('product_id', response.data.id);

          this.productService.uploadImage(formData).subscribe({
            next: (uploadResponse) => {
              console.log('Imagem enviada com sucesso:', uploadResponse);
              this.router.navigate(['/your-company']);
            },
            error: (uploadError) => {
              console.error('Erro ao enviar imagem:', uploadError);
              this.messageService.add('Erro ao enviar imagem do produto.');
            }
          });
        } else {
          this.messageService.add('Produto criado, mas sem imagem.');
          this.router.navigate(['/your-company']);
        }
      },
      error: (error) => {
        console.error('Erro ao criar produto:', error);
        this.messageService.add('Erro ao cadastrar produto.');
      }
    });
  }
}
