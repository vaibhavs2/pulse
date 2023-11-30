import { Product, ReturnData } from '../types';
import { makeNetowrkRequest } from './NetworkRequest';

class ProductService {
  readonly PRODUCT_ENDPOINT = 'https://dummyjson.com';

  async getProducts(
    skip: number = 0,
    limit: number = 20,
  ): Promise<ReturnData<{ products: Array<Product>; haveMore: boolean }>> {
    const url = new URL(`products?skip=${skip}&limit=${limit}`, this.PRODUCT_ENDPOINT);
    const response = await makeNetowrkRequest(url.href);
    let haveMore = false;
    if (response.errorMessage) {
      return { data: { products: [], haveMore }, errorMessage: response.errorMessage };
    }
    if (response.data.total > skip + response.data.products.length) {
      haveMore = true;
    }
    return {
      data: { products: response.data.products, haveMore },
      errorMessage: undefined,
    };
  }

  async getProductDetail(productId: string): Promise<ReturnData<Product>> {
    const url = new URL(`products/${productId}`, this.PRODUCT_ENDPOINT);
    const response = await makeNetowrkRequest(url.href);
    if (response.errorMessage) {
      return { data: undefined, errorMessage: response.errorMessage };
    }
    return { data: response.data, errorMessage: undefined };
  }
}

export const userProductService = new ProductService();
