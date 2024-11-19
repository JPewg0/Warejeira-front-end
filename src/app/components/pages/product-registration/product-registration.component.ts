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

  async createHandler(product: Product){
    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("cpf", product.category);
    formData.append("email", product.price);
    formData.append("phone", product.description);

    // todo

    await this.productService.createProduct(formData).subscribe();

    this.messageService.add('Cadastro foi realizado com sucesso!')

    this.router.navigate(['/login']);
  }
}

