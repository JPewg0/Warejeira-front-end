import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessagesService } from '../../../services/messages.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup; // Formulário de login
  showPassword: boolean = false;  // Variável para controlar a visibilidade da senha
  message: string | null = null; // Mensagem de erro ou sucesso

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messagesService: MessagesService
  ) {
    // Inicializa o formulário com validações
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Validação de email
      password: ['', [Validators.required]] // Validação de senha
    });
  }

  // Método para alternar a visibilidade da senha
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword; // Alterna entre 'text' e 'password'
  }

  // Método de envio do formulário
  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value; // Extrai os valores do formulário

      // Chama o serviço de autenticação
      this.authService.authenticateUser(email, password).subscribe(isAuthenticated => {
        if (isAuthenticated) {
          // Se a autenticação for bem-sucedida, exibe a mensagem e navega para a página inicial
          this.messagesService.add('Login realizado com sucesso!');
          this.router.navigate(['/']); // Redireciona para a página principal
        } else {
          // Se falhar, exibe a mensagem de erro
          this.messagesService.add('E-mail ou senha inválidos.');
        }
      });
    } else {
      // Se o formulário for inválido, exibe uma mensagem de erro
      this.messagesService.add('Preencha todos os campos corretamente.');
    }
  }
}