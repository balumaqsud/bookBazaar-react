import {
  ProductCategory,
  ProductStatus,
  ProductType,
} from "../data/enums/product.enum";

export interface Product {
  _id: string;
  productStatus: ProductStatus;
  productCategory: ProductCategory;
  productType: ProductType;
  productName: string;
  productPrice: number;
  productLeftCount: number;
  productDesc?: string;
  productImages: string[];
  productView: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface ProductInquiry {
  order: string;
  page: number;
  limit: number;
  productType: ProductType;
  productCategory?: ProductCategory;
  search?: string;
}
