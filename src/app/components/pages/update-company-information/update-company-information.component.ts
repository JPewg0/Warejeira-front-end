import { Component } from '@angular/core';
import { CompanyService } from '../../../services/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from '../../../Company';
import { Address } from '../../../User';
import { CompanyFormComponent } from "../../company-form/company-form.component";

@Component({
  selector: 'app-update-company-information',
  standalone: true,
  imports: [CompanyFormComponent],
  templateUrl: './update-company-information.component.html',
  styleUrl: './update-company-information.component.css'
})



export class UpdateCompanyInformationComponent {
  company!: Company;
  userId!: string;

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

ngOnInit(): void {
  this.userId = this.route.snapshot.paramMap.get('userId') || '';

  if (this.userId) {
    this.companyService.getCompanyData(this.userId).subscribe((response) => {
      const userResponse = response.data;

      const firstAddress: Address = {
        address: userResponse.addresses.data[0]?.address || '',
        cep: userResponse.addresses.data[0]?.cep || '',
        city: userResponse.addresses.data[0]?.city || '',
        uf: userResponse.addresses.data[0]?.uf || '',
        district: userResponse.addresses.data[0]?.district || '',
        complement: userResponse.addresses.data[0]?.complement || '',
        home_number: userResponse.addresses.data[0]?.home_number || ''
      };

      this.company = {
        id: userResponse.id,
        name: userResponse.name || '',
        cnpj: userResponse.cnpj || '',
        email: userResponse.email || '',
        phone_number: userResponse.phone_number || '',
        addresses: [firstAddress]
      };
    });
  }
}

  editHandler(formValue: any) {
  const companyData: Company = {
    name: formValue.name,
    cnpj: formValue.cnpj,
    email: formValue.email,
    phone_number: formValue.phone_number,
    addresses: [
      {
        address: formValue.address,
        cep: formValue.cep,
        city: formValue.city,
        uf: formValue.uf,
        district: formValue.district,
        complement: formValue.complement,
        home_number: formValue.number
      }
    ]
  };

    const phoenixFormattedData = {
      company: companyData  // Mantém a estrutura esperada pelo Phoenix
    };

    this.companyService.updateCompany(this.company.id, phoenixFormattedData).subscribe(
      (response) => {
        console.log('Empresa atualizado com sucesso!', response);
        this.router.navigate(['/your-company']);
      },
      (error) => {
        console.error('Erro ao atualizar o empresa:', error);
      }
    );
  }
}