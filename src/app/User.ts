export interface Address {
  address: string;
  cep: string;
  city: string;
  uf: string;
  district: string;
  complement?: string;
  home_number: string;
}

export interface User {
  id?: number;
  cpf: string;
  name: string;
  email: string;
  phone_number: string;
  password: string;
  password_confirmation?: string;
  birth_date: string;
  addresses: Address[];
}