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

async createHandler(formValue: any) {
  const userData = {
    name: formValue.name,
    email: formValue.email,
    cpf: formValue.cpf,
    phone_number: formValue.phone_number,
    birth_date: formValue.birth_date,
    password: formValue.password,
    password_confirmation: formValue.password_confirmation,
    addresses: [
      {
        address: formValue.address,
        cep: formValue.cep,
        city: formValue.city,
        complement: formValue.complement,
        district: formValue.district,
        home_number: formValue.home_number,
        uf: formValue.uf
      }
    ]
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