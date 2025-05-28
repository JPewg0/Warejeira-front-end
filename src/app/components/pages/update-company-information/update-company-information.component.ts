import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../services/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from '../../../Company';
import { Address } from '../../../User';
import { CompanyFormComponent } from '../../company-form/company-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-company-information',
  standalone: true,
  imports: [CompanyFormComponent, CommonModule],
  templateUrl: './update-company-information.component.html',
  styleUrl: './update-company-information.component.css'
})
export class UpdateCompanyInformationComponent implements OnInit {
  company!: Company;
  userId: string = '';

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const routeUserId = this.route.snapshot.paramMap.get('userId');
    this.userId = routeUserId ?? localStorage.getItem('userId') ?? '';

    if (!this.userId) {
      console.error('ID de usuário não encontrado.');
      return;
    }

    this.companyService.getCompanyData(this.userId).subscribe({
      next: (response) => {
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
          id: Number(userResponse.id),  // Agora como número
          name: userResponse.name || '',
          cnpj: userResponse.cnpj || '',
          email: userResponse.email || '',
          phone_number: userResponse.phone_number || '',
          addresses: [firstAddress]
        };
      },
      error: (err) => {
        console.error('Erro ao carregar os dados da empresa:', err);
      }
    });
  }

  editHandler(formValue: any): void {
    const companyId = Number(this.company.id);
    if (isNaN(companyId)) {
      console.error('ID da empresa inválido');
      return;
    }

    const companyData = {
      name: formValue.name,
      cnpj: formValue.cnpj,
      email: formValue.email,
      phone_number: formValue.phone_number,
      user_id: this.userId,
      addresses: formValue.addresses.map((addr: any) => ({
        address: addr.address,
        cep: addr.cep.replace(/\D/g, ''), // remove caracteres não numéricos
        city: addr.city,
        uf: addr.uf,
        district: addr.district,
        complement: addr.complement,
        home_number: addr.home_number
      }))
    };

    const phoenixFormattedData = { company: companyData };

    this.companyService.updateCompany(companyId, phoenixFormattedData).subscribe({
      next: (response) => {
        console.log('Empresa atualizada com sucesso!', response);
        this.router.navigate(['/your-company']);
      },
      error: (error) => {
        console.error('Erro ao atualizar a empresa:', error);
      }
    });
  }

}
