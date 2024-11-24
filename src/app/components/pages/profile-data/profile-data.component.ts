import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-data',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile-data.component.html',
  styleUrl: './profile-data.component.css'
})
export class ProfileDataComponent implements OnInit {

  userData: any;

  constructor(
    private userService: UserService,  // Serviço para pegar os dados do usuário
    private route: ActivatedRoute      // Para acessar os parâmetros da URL
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    // Pega o 'id' da URL, caso tenha sido passado como parâmetro
    const userId = this.route.snapshot.paramMap.get('id') || localStorage.getItem('userId');

    if (userId) {
      // Agora o userId é passado corretamente para o método getUserData
      this.userService.getUserData(userId).subscribe(
        (response) => {
          this.userData = response.data; // Acessa a propriedade 'data'
          console.log('Dados do usuário:', this.userData); // Exibe os dados processados no console
        },
        (error) => {
          console.error('Erro ao carregar os dados do usuário', error);
        }
      );
    } 
  }
}