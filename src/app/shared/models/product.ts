import { CleaningFee } from "./cleaningFee";

export class Product {
  $key: string;
  productId: number;
  productName: string;
  productCategory: string;
  productPrice: number;
  productDescription: string;
  productImageUrl: string;
  productAdded: number;
  productQuatity: number;
  quantity: number;
  ratings: number;
  favourite: boolean;
  productSeller: string;
  nameAr: string;
  nameEn: string;
  price: number;
  details: string;
  updated_at: Date;
  id: number;
  imgUrl: string;
  img_data: Blob;
  category: string;
  cleaningFee: CleaningFee;
}
