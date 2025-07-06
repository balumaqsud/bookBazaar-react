import { serverApi } from "../../libs/config";
import { Product, ProductInquiry } from "../../libs/types/product";
import axios from "axios";

class ProductService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getProducts(input: ProductInquiry): Promise<Product[]> {
    try {
      let url = `${this.path}/product/all?order=${input.order}&page=${input.page}&limit=${input.limit}`;
      if (input.productCategory) {
        url += `&productCategory=${input.productCategory}`;
      }
      if (input.search) {
        url += `&search=${input.search}`;
      }

      const result = await axios.get(url);
      console.log("this:", result);

      return result.data;
    } catch (error) {
      console.log("error, getProducts", error);
      throw error;
    }
  }
  public async getProduct(id: string): Promise<Product> {
    try {
      let url = `${this.path}/product/${id}`;
      const result = await axios.get(url, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.log("error, getProducts", error);
      throw error;
    }
  }
}

export default ProductService;
