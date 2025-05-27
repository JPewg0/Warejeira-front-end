export interface CartItem {
  id?: number;          // id do item no carrinho (geralmente gerado pelo backend)
  product_id: number;   // id do produto
  quantity: number;
  user_id: string;
  name?: string;
  price?: number;
  image_url?: string;
  description?: string;
}
