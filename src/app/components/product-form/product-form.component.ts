import { Component, EventEmitter, Input, input, Output, output, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../Product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Product>();
  @Input() btnText!: string;

  productForm!: FormGroup;
  selectedImage: string | ArrayBuffer | null = null;
  categorias: any[] = [];

  constructor(private productService: ProductService) {} // Injeção do serviço

  ngOnInit(): void {
    
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      stock_quantity: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl(''),
    });

    this.loadCategories();
  }

  // Carregar categorias usando o serviço
  loadCategories(): void {
    this.productService.getCategories().subscribe(
      (data) => {
        console.log('Categorias recebidas:', data); // Verifique o console para ver as categorias
        this.categorias = data.categories; // Popula o array com as categorias da API
      },
      (error) => {
        console.error('Erro ao carregar categorias:', error);
      }
    );
  }

  // Manipulação do arquivo de imagem
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result; // Atualiza a imagem visualizada
        this.productForm.patchValue({ image: file }); // Atualiza o valor do formulário
      };
      reader.readAsDataURL(file); // Lê a imagem e converte para URL
    }
  }

  // Envio do formulário
  submit(): void {
    if (this.productForm.invalid) {
      return;
    }

    console.log(this.productForm.value);
    this.onSubmit.emit(this.productForm.value); // Emite o valor do formulário
  }
}