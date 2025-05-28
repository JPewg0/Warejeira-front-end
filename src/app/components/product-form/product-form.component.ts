import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../Product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Product>();
  @Input() btnText!: string;

  productForm!: FormGroup;
  selectedImage: string | ArrayBuffer | null = null;
  categorias: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]), // categoria única
      price: new FormControl('', [Validators.required]),
      stock_quantity: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      image: new FormControl(''),
      product_id: new FormControl('')
    });

    this.loadCategories();
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe(
      (data) => {
        this.categorias = data.data;
      },
      (error) => {
        console.error('Erro ao carregar categorias:', error);
      }
    );
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
        this.productForm.patchValue({ image: file });
      };
      reader.readAsDataURL(file);
    }
  }

  submit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const formValue = this.productForm.value;

    // Converte category (string) para array de números
    const categories = [Number(formValue.category)];

    // Converte price e stock_quantity para números (ajuste para seu formato de número)
    const price = parseFloat(
      formValue.price
        .replace(/\./g, '') // remove pontos (milhares)
        .replace(',', '.')  // troca vírgula por ponto decimal
    );

    const stock_quantity = Number(formValue.stock_quantity.replace(/\./g, ''));

    const product: Product = {
      name: formValue.name,
      categories: categories,
      company_id: 9, // ou outro valor dinâmico, se tiver
      price: price,
      stock_quantity: stock_quantity,
      description: formValue.description,
      image: formValue.image // arquivo para enviar na etapa da imagem
    };

    this.onSubmit.emit(product);
  }

}
