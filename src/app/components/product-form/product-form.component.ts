import { Component, EventEmitter, Input, input, Output, output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../Product';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  @Output() onSubmit = new EventEmitter<Product>();
  @Input() btnText!: string;

  productForm!: FormGroup;
  selectedImage: string | ArrayBuffer | null = null; // Variável para armazenar a imagem selecionada

  constructor(){}

  ngOnInit(): void{
    this.productForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      stock: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl(''),
    });
  }

  // Getters para facilitar o acesso aos controles do formulário
  get name(){
    return this.productForm.get('name')!;
  }

  get category(){
    return this.productForm.get('category')!;
  }

  get price(){
    return this.productForm.get('price')!;
  }
  
  get stock(){
    return this.productForm.get('stock')!;
  }

  get description(){
    return this.productForm.get('description')!;
  }

  // Manipulação do arquivo de imagem
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result; // Atualiza a imagem visualizada
        this.productForm.patchValue({image: file}); // Atualiza o valor do formulário
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
