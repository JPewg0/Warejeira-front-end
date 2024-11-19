import { Component, EventEmitter, Input, input, Output, output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Company } from '../../Company';



@Component({
  selector: 'app-company-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,],
  templateUrl: './company-form.component.html',
  styleUrl: './company-form.component.css'
})
export class CompanyFormComponent {
  @Output() onSubmit = new EventEmitter<Company>;
  @Input() btnText!: string

  userForm!: FormGroup;

  constructor(){}

  ngOnInit(): void{
    this.userForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      cnpj: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
      cep: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
    })
  }

  get name(){
    return this.userForm.get('name')!;
  }

  get cnpj(){
    return this.userForm.get('cpf')!;
  }

  get email(){
    return this.userForm.get('email')!;
  }
  
  get phone(){
    return this.userForm.get('phone')!;
  }

  get street(){
    return this.userForm.get('street')!;
  }

  get number(){
    return this.userForm.get('number')!;
  }

  get cep(){
    return this.userForm.get('cep')!;
  }

  get city(){
    return this.userForm.get('city')!;
  }

  get state(){
    return this.userForm.get('state')!;
  }

    submit(){
      if(this.userForm.invalid){
        return;
      }

      console.log(this.userForm.value);

      this.onSubmit.emit(this.userForm.value)

    }
}


