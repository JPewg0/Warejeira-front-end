import { Component, EventEmitter, Input, Output, } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../User';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  @Output() onSubmit = new EventEmitter<User>();
  @Input() btnText!: string;
  @Input() userData: User | null = null;

  userForm!: FormGroup;
  isEditMode: boolean = false; // Variável de controle do modo de edição

  constructor() {}

  ngOnInit(): void {
    if (this.userData) {
      this.isEditMode = true; // Modo de edição
    }
  
    // Inicializa o formulário com os dados de `userData` ou valores vazios
    this.userForm = new FormGroup({
      name: new FormControl(this.userData ? this.userData.name : '', [Validators.required]),
      cpf: new FormControl(this.userData ? this.userData.cpf : '', [Validators.required]),
      email: new FormControl(this.userData ? this.userData.email : '', [Validators.required]),
      phone_number: new FormControl(this.userData ? this.userData.phone_number : '', [Validators.required]),
      password: new FormControl(this.userData ? this.userData.password : '', [Validators.required, Validators.minLength(6)]),
      password_confirmation: new FormControl(this.userData ? this.userData.password_confirmation : '', [Validators.required, Validators.minLength(6)]),
      birth_date: new FormControl(this.userData ? this.userData.birth_date : '', [Validators.required]),
  
      // Campos de endereço
      address: new FormControl(this.userData?.address?.address || '', [Validators.required]),
      cep: new FormControl(this.userData?.address?.cep || '', [Validators.required]),
      city: new FormControl(this.userData?.address?.city || '', [Validators.required]),
      uf: new FormControl(this.userData?.address?.uf || '', [Validators.required]),
      district: new FormControl(this.userData?.address?.district || '', [Validators.required]),
      complement: new FormControl(this.userData?.address?.complement || '', [Validators.required]),
      home_number: new FormControl(this.userData?.address?.home_number?.trim() || '', [Validators.required]),
    });
    
    // Verificação dos dados após inicializar o formulário
    console.log('Dados do usuário carregados:', this.userForm.value);
  }
  

  // Métodos de acesso aos campos de formulário
  get name() {
    return this.userForm.get('name')!;
  }

  get cpf() {
    return this.userForm.get('cpf')!;
  }

  get email() {
    return this.userForm.get('email')!;
  }

  get phone_number() {
    return this.userForm.get('phone_number')!;
  }

  get password() {
    return this.userForm.get('password')!;
  }

  get password_confirmation() {
    return this.userForm.get('password_confirmation')!;
  }

  get birth_date() {
    return this.userForm.get('birth_date')!;
  }

  get address() {
    return this.userForm.get('address')!;
  }

  get cep() {
    return this.userForm.get('cep')!;
  }

  get city() {
    return this.userForm.get('city')!;
  }

  get uf() {
    return this.userForm.get('uf')!;
  }

  get district() {
    return this.userForm.get('district')!;
  }

  get complement() {
    return this.userForm.get('complement')!;
  }

  get home_number() {
    return this.userForm.get('home_number')!;
  }

  // Método para enviar o formulário
  submit(): void {
    // Verifica se o formulário é válido
    if (this.userForm.invalid) {
      console.log('Formulário inválido!');
      console.log('Status de cada campo:', this.userForm.controls); // Log para verificar o status de cada campo
      console.log('Dados recebidos em userData:', this.userData);

      return;
    }
  
    console.log('Dados do formulário enviados:', this.userForm.value);
  
    // Verifica se é uma edição ou criação
    if (this.isEditMode) {
      console.log('Editando usuário:', this.userForm.value);
    } else {
      console.log('Criando novo usuário:', this.userForm.value);
    }
  
    // Emite o evento de submit
    this.onSubmit.emit(this.userForm.value);
  }
}
