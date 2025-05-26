import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { CompanyService } from '../../../services/company.service';

@Component({
  selector: 'app-your-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './your-profile.component.html',
  styleUrl: './your-profile.component.css'
})
export class YourProfileComponent {

  userId: string | null = null; // Variável para armazenar o ID do usuário

  constructor(
    private authService: AuthService,  // Serviço de autenticação
    private userService: UserService,
    private companyService: CompanyService, // Serviço que lida com os dados do usuário
    private router: Router            // Para navegação
  ) {}

  ngOnInit(): void {
    // Pega o 'userId' do localStorage ou outra fonte de dados
    this.userId = localStorage.getItem('userId');  // Ajuste conforme o seu fluxo
    if (this.userId) {
      console.log('User ID recuperado do localStorage:', this.userId);
    } else {
      console.warn('User ID não encontrado no localStorage');
    }
}

  // Método para chamar o logout e redirecionar para a página de login
  onLogout(): void {
    this.authService.logout().subscribe(() => {
      // Após o logout, redireciona para a página de login
      this.router.navigate(['/login']);
    });
  }

  goToCompany(): void {
    if (!this.userId) {
      console.error('ID do usuário não encontrado');
      return;
    }

    this.companyService.getCompanyData(this.userId).subscribe({
      next: () => this.router.navigate(['/your-company']),
      error: () => this.router.navigate(['/company-registration'])
    });
  }

  // Método para excluir a conta
  onDeleteAccount(): void {
    if (confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')) {
      if (this.userId) {
        this.userService.deleteUserAccount(this.userId).subscribe(
          () => {
            console.log('Conta excluída com sucesso');
            // Após excluir, desloga o usuário e redireciona para a página de login
            this.authService.logout().subscribe(() => {
              this.router.navigate(['/login']); // Redireciona para o login
            });
          },
          (error) => {
            console.error('Erro ao excluir a conta:', error);
            alert('Erro ao excluir a conta. Tente novamente mais tarde.');
          }
        );
      } else {
        alert('ID do usuário não encontrado!');
      }
    }
  }
}