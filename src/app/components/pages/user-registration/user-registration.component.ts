import { Component, } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../../User';
import { UserFormComponent } from "../../user-form/user-form.component";
import { UserService } from '../../../services/user.service';
import { MessagesService } from '../../../services/messages.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, UserFormComponent],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent {
  btnText = "Cadastrar";

  constructor(
    private userService: UserService,
    private messageService: MessagesService,
    private router: Router
  ) { }

  async createHandler(user: User) {
    const userData = {
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      phone_number: user.phone_number,
      birth_date: user.birth_date,
      password: user.password,
      password_confirmation: user.password_confirmation,
      address: {
        address: user.address,
        cep: user.cep,
        city: user.city,
        complement: user.complement,
        district: user.district,
        home_number: user.home_number,
        uf: user.uf
      }
    };

    const phoenixFormattedData = {
      user: userData  // Mantém a estrutura esperada pelo Phoenix
    };

    await this.userService.createUser(phoenixFormattedData).subscribe({
      next: (response) => console.log('Sucesso:', response),
      error: (error) => console.error('Erro:', error)
    });;

    this.router.navigate(['/login']);

  }

}
