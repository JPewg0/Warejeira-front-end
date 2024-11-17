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

  async createHandler(company: Company){
    const formData = new FormData();

    formData.append("name", company.name);
    formData.append("cpf", company.cnpj);
    formData.append("email", company.email);
    formData.append("phone", company.phone);
    formData.append("street", company.street);
    formData.append("number", company.number);
    formData.append("cep", company.cep);
    formData.append("city", company.city);
    formData.append("state", company.state);
    formData.append("password", company.password);
    formData.append("confirmation", company.confirmation);

    // todo

    await this.companyService.createCompany(formData).subscribe();

    this.messageService.add('Cadastro foi realizado com sucesso!')

    this.router.navigate(['/login']);
  }
}
