import { Brand } from "./Brand";
import { Category } from "./Category";

export interface Item {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  quantity: number;
  brandId: number;
  categoryId: number;
  brand?: Brand;
  category?: Category;
}
