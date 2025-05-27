import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Company } from '../../../Company';
import { CompanyService } from '../../../services/company.service';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-your-company',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './your-company.component.html',
  styleUrl: './your-company.component.css'
})
export class YourCompanyComponent implements OnInit {
  
  companyData: Company | null = null;
  isLoading: boolean = true;
  
  constructor(
    private companyService: CompanyService,
    private orderService: OrderService,
    private router: Router  // Injeção do Router
  ) {}

  ngOnInit(): void {
    this.loadCompanyData();
  }

  loadCompanyData(): void {
    const userId = localStorage.getItem('userId') || '';
    
    if (userId) {
      this.companyService.getCompanyData(userId).subscribe({
        next: (response) => {
          const companyResponse = response.data;
          
          // Pegando o primeiro endereço (assumindo que só há um)
          const firstAddress = companyResponse.addresses.data[0] || {
            address: '',
            cep: '',
            city: '',
            complement: '',
            district: '',
            home_number: '',
            uf: ''
          };
          
          // Montando o objeto de usuário no formato correto
          this.companyData = {
            id: companyResponse.id,
            name: companyResponse.name,
            email: companyResponse.email,
            cnpj: companyResponse.cnpj,
            phone_number: companyResponse.phone_number,
            addresses: [firstAddress]
          };
          
          this.isLoading = false;
          console.log('Dados da empresa:', this.companyData);
        },
        error: (error) => {
          console.error('Erro ao carregar os dados da empresa', error);
          this.isLoading = false;
        }
      });
    } else {
      console.error('UserId não encontrado no localStorage');
      this.isLoading = false;
    }
  }

  // Função para gerar relatório
  generateReport(): void {
    this.orderService.createReport().subscribe({
      next: (response: Blob) => {
        const blob = new Blob([response], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'relatorio.csv';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Erro ao gerar o relatório', err);
      }
    });
  }

  // Função para voltar ao perfil
  goBackToProfile(): void {
    this.router.navigate(['/your-profile']);
  }

  goToUpdateCompany(): void {
    this.router.navigate(['/update-company-information']);
  }
}