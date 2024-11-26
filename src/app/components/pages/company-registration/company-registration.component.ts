import { Component } from '@angular/core';
import { CompanyFormComponent } from "../../company-form/company-form.component";
import { Company } from '../../../Company';
import { CompanyService } from '../../../services/company.service';
import { MessagesService } from '../../../services/messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-registration',
  standalone: true,
  imports: [CompanyFormComponent],
  templateUrl: './company-registration.component.html',
  styleUrl: './company-registration.component.css'
})
export class CompanyRegistrationComponent {
  btnText = "Cadastrar";

  constructor(
    private companyService: CompanyService, 
    private messageService: MessagesService,
    private router: Router
  ){}

  async createHandler(company: Company) {
    const companyData = {
      name: company.name,
      email: company.email,
      cpf: company.cnpj,
      phone_number: company.phone_number,
      password: company.password,
      password_confirmation: company.password_confirmation,
      address: {
        address: company.address,
        cep: company.cep,
        city: company.city,
        complement: company.complement,
        district: company.district,
        number: company.number,
        uf: company.uf
      }
    };

    const phoenixFormattedData = {
      company: companyData  // Mantém a estrutura esperada pelo Phoenix
    };

    await this.companyService.createCompany(phoenixFormattedData).subscribe({
      next: (response) => console.log('Sucesso:', response),
      error: (error) => console.error('Erro:', error)
    });;

    this.router.navigate(['/login']);

  }

}
