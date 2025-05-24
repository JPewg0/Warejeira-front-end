import { Component } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

import { User } from '../../../User';

import { UserService } from '../../../services/user.service';

import { CommonModule } from '@angular/common';
import { UserFormComponent } from "../../user-form/user-form.component";

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, UserFormComponent],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent {
  user!: User;
  btnText: string = 'Editar';
  userId!: string; // Definido para armazenar o ID do usuário vindo da URL

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtendo o id diretamente da URL
    const profileId = this.route.snapshot.paramMap.get('profileId');
    this.userId = this.route.snapshot.paramMap.get('userId') || ''; // Atribuindo o valor do parâmetro userId da URL

    // Se o userId existir, busque os dados do usuário
    if (this.userId) {
      this.userService.getUserData(this.userId).subscribe((item) => {
        this.user = item.data;
      });
    }
  }

  editHandler(userData: User) {
    // Verificando se o userId foi obtido corretamente
    if (!this.userId) {
      console.error('ID do usuário não encontrado na URL');
      return;
    }

    const userDataToUpdate = {
      name: userData.name,
      email: userData.email,
      cpf: userData.cpf,
      phone_number: userData.phone_number,
      birth_date: userData.birth_date,
      password: userData.password,  // Isso pode ser opcional dependendo da lógica de atualização
      password_confirmation: userData.password_confirmation,  // Caso queira permitir a alteração da senha
      address: {
        address: userData.addresses,  // Endereço do usuário
        cep: userData.cep,
        city: userData.city,
        complement: userData.complement,
        district: userData.district,
        home_number: userData.home_number,
        uf: userData.uf
      }
    };

    const formData = new FormData();

    // Preenche o FormData com os dados para envio na requisição
    formData.append('name', userDataToUpdate.name);
    formData.append('email', userDataToUpdate.email);
    formData.append('cpf', userDataToUpdate.cpf);
    formData.append('phone_number', userDataToUpdate.phone_number);
    formData.append('birth_date', userDataToUpdate.birth_date);
    formData.append('password', userDataToUpdate.password || '');  // Caso queira permitir a senha como opcional
    formData.append('password_confirmation', userDataToUpdate.password_confirmation || '');
    formData.append('address', JSON.stringify(userDataToUpdate.address));  // Serializando o objeto de endereço como JSON

    // Agora, chame o método de atualização, passando o id e os dados formatados
    this.userService.updateUser(this.userId, formData).subscribe(
      (response) => {
        console.log('Usuário atualizado com sucesso!', response);
        this.router.navigate(['/users']); // Navega para a lista de usuários após sucesso
      },
      (error) => {
        console.error('Erro ao atualizar o usuário:', error);
      }
    );
  }
} 