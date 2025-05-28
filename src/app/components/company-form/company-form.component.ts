import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Company } from '../../Company';

@Component({
  selector: 'app-company-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './company-form.component.html',
  styleUrl: './company-form.component.css'
})
export class CompanyFormComponent implements OnInit, OnChanges {
  @Input() companyData?: Company;
  @Input() btnText: string = 'Salvar';
  @Output() onSubmit = new EventEmitter<Company>();

  userForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['companyData'] && !changes['companyData'].firstChange) {
      this.initForm(); // Atualiza o formulário com os novos dados
    }
  }

  initForm(): void {
    this.userForm = new FormGroup({
      name: new FormControl(this.companyData?.name || '', Validators.required),
      cnpj: new FormControl(this.companyData?.cnpj || '', Validators.required),
      email: new FormControl(this.companyData?.email || '', Validators.required),
      phone_number: new FormControl(this.companyData?.phone_number || '', Validators.required),
      addresses: new FormArray(
        this.companyData?.addresses?.map(addr =>
          new FormGroup({
            address: new FormControl(addr.address, Validators.required),
            home_number: new FormControl(addr.home_number, Validators.required),
            cep: new FormControl(addr.cep, Validators.required),
            city: new FormControl(addr.city, Validators.required),
            uf: new FormControl(addr.uf, Validators.required),
            district: new FormControl(addr.district, Validators.required),
            complement: new FormControl(addr.complement, Validators.required),
          })
        ) || [this.createAddressGroup()]
      )
    });
  }

  createAddressGroup(): FormGroup {
    return new FormGroup({
      address: new FormControl('', Validators.required),
      home_number: new FormControl('', Validators.required),
      cep: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      uf: new FormControl('', Validators.required),
      district: new FormControl('', Validators.required),
      complement: new FormControl('', Validators.required)
    });
  }

  get addresses(): FormArray {
    return this.userForm.get('addresses') as FormArray;
  }

  addAddress(): void {
    this.addresses.push(this.createAddressGroup());
  }

  removeAddress(index: number): void {
    if (this.addresses.length > 1) {
      this.addresses.removeAt(index);
    }
  }

  submit(): void {
    if (this.userForm.invalid) {
      return;
    }

    const formValue = this.userForm.value;

    const filteredAddresses = formValue.addresses.filter((addr: any) =>
      Object.values(addr).some(value => value && value.toString().trim() !== '')
    );

    const company: Company = {
      name: formValue.name,
      cnpj: formValue.cnpj,
      email: formValue.email,
      phone_number: formValue.phone_number,
      addresses: filteredAddresses
    };

    this.onSubmit.emit(company);
  }
}
