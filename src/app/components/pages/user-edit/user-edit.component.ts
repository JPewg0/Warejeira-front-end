import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../User';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from '../../user-form/user-form.component';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, UserFormComponent],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit {
  userDataToUpdate!: User;
  user!: User;
  btnText: string = 'Editar';
  userId!: string;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId') || '';

    console.log("ola")

    if (this.userId) {
      this.userService.getUserData(this.userId).subscribe((response) => {
        const userResponse = response.data;
        const firstAddress = userResponse.addresses.data[0] || {
          address: '',
          cep: '',
          city: '',
          complement: '',
          district: '',
          home_number: '',
          uf: ''
        };

        this.user = {
          id: userResponse.id,
          name: userResponse.name,
          email: userResponse.email,
          cpf: userResponse.cpf,
          phone_number: userResponse.phone_number,
          birth_date: userResponse.birth_date,
          password: '',
          password_confirmation: '',
          addresses: [firstAddress]
        };
      });
    }
  }

  editHandler(formValue: any) {
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

    this.userService.updateUser(this.userId, phoenixFormattedData).subscribe(
      (response) => {
        console.log('Usuário atualizado com sucesso!', response);
        this.router.navigate(['/your-profile']);
      },
      (error) => {
        console.error('Erro ao atualizar o usuário:', error);
      }
    );
  }
}