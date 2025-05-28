import { Component } from '@angular/core';
import { CompanyFormComponent } from "../../company-form/company-form.component";
import { Company } from '../../../Company';
import { CompanyService } from '../../../services/company.service';
import { MessagesService } from '../../../services/messages.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company-registration',
  standalone: true,
  imports: [CompanyFormComponent],
  templateUrl: './company-registration.component.html',
  styleUrl: './company-registration.component.css'
})
export class CompanyRegistrationComponent {
  btnText = "Cadastrar";
  userId!: string;

  constructor(
    private companyService: CompanyService, 
    private messagesService: MessagesService,
    private route: ActivatedRoute,
    private router: Router,
    private activateRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') || '';

    if (this.userId) {
      console.log(this.userId)
    }
  }
  

  async createHandler(company: Company) {
    console.log('Endereços recebidos:', company.addresses);
    
    const companyData = {
      user_id: this.userId,
      name: company.name,
      email: company.email,
      cnpj: company.cnpj,
      phone_number: company.phone_number,
      addresses: company.addresses?.map(address => ({
        address: address.address,
        cep: address.cep,
        city: address.city,
        complement: address.complement,
        district: address.district,
        home_number: address.home_number,
        uf: address.uf
      })) || []  // fallback para array vazio, mas importante saber se entra vazio aqui
    };

    const phoenixFormattedData = { company: companyData };
    
    console.log('Dados enviados:', phoenixFormattedData);
    
    this.companyService.createCompany(phoenixFormattedData).subscribe({
      next: () => {
        // Redireciona somente se a API retornar sucesso (HTTP 2xx)
        this.router.navigate(['/your-company']);
      },
      error: (error) => {
        console.error('Erro ao criar empresa:', error);
        this.router.navigate(['/your-profile']);
        
        // Se for erro 500, verifica se a empresa foi criada
        if (error.status === 500) {
          this.companyService.checkCompanyExists(phoenixFormattedData.company.cnpj).subscribe({
            next: (exists) => {
              if (exists) {
                this.router.navigate(['/your-profile']);
              } else {
                this.messagesService.add('Falha no servidor. Tente novamente.');
              }
            }
          });
        } else {
          this.messagesService.add('Erro ao criar empresa');
          this.router.navigate(['/your-profile']);
        }
      }
    });
  }
}