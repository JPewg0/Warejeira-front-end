export interface Product {
  id?: number;
  name: string;
  categories: number[];
  company_id: number; // ← ADICIONE ESTA LINHA
  stock_quantity: number;
  price: number;
  description?: string;
  image?: File;
  image_url?: string;
}
