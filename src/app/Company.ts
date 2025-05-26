import { Address } from "./User";

export interface Company {
    id?: number,
    cnpj: string,
    name: string,
    email: string,
    phone_number: string,
    addresses: Address[],
}