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
  loginForm: FormGroup;
  showPassword: boolean = false; // Variável para controlar a visibilidade da senha

  constructor(
    private fb: FormBuilder,
    private messagesService: MessagesService,  // Mantém privado
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Getter para acessar a mensagem no template
  get message() {
    return this.messagesService.message;
  }

  // Método para alternar a visibilidade da senha
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword; // Alterna a visibilidade da senha
  }

  // Método de envio do formulário
  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Verificando as credenciais no db.json
      this.authService.authenticateUser(email, password).subscribe(isAuthenticated => {
        if (isAuthenticated) {
          this.messagesService.add('Login realizado com sucesso!');
          // Redireciona para a página principal ou outra página
          this.router.navigate(['/']);
        } else {
          this.messagesService.add('E-mail ou senha inválidos.');
        }
      });
    } else {
      this.messagesService.add('Preencha todos os campos corretamente.');
    }
  }
}