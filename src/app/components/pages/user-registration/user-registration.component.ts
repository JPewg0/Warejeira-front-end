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
    ){}

    async createHandler(user: User){
      const formData = new FormData();

      formData.append("name", user.name);
      formData.append("cpf", user.cpf);
      formData.append("email", user.email);
      formData.append("phone", user.phone);
      formData.append("street", user.street);
      formData.append("number", user.number);
      formData.append("cep", user.cep);
      formData.append("city", user.city);
      formData.append("state", user.state);
      formData.append("password", user.password);
      formData.append("confirmation", user.confirmation);

      // todo

      await this.userService.createUser(formData).subscribe();

      this.messageService.add('Cadastro foi realizado com sucesso!')

      this.router.navigate(['/login']);
    }
}
