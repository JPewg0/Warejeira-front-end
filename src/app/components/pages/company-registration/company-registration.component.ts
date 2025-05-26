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
    private messageService: MessagesService,
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
    console.log(this.userId, "este é o user id")
    const companyData = {
      user_id: this.userId,
      name: company.name,
      email: company.email,
      cnpj: company.cnpj,
      phone_number: company.phone_number,
      address: [{
        address: company.address,
        cep: company.cep,
        city: company.city,
        complement: company.complement,
        district: company.district,
        number: company.number,
        uf: company.uf
      }]
    };

    const phoenixFormattedData = {
      company: companyData  // Mantém a estrutura esperada pelo Phoenix
    };

    await this.companyService.createCompany(phoenixFormattedData).subscribe({
      next: (response) => this.router.navigate(['/your-profile']),
      error: (error) => console.error('Erro:', error)
    });
  }
}