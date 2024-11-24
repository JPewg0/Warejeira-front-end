export interface User {
    id?: number,
    cpf: string,
    name: string,
    email: string,
    phone_number: string,
    address: string,
    home_number: string,
    cep: string,
    city: string,
    uf: string,
    password: string,
    password_confirmation: string,
    birth_date: string,
    district: string,
    complement: string,
    //address: [{ address: string; cep: string; city: string; uf: string; district: string; complement: string; home_number: string  }]
}