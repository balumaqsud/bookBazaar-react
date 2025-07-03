//react app state

import { Member } from "./member";
import { Order } from "./order";
import { Product } from "./product";

//screen component based type state

// homepage
export interface AppRootState {
  homePage: HomePageState;
  productsPage: ProductsPageState;
  ordersPage: OrdersPageState;
}

export interface HomePageState {
  bestSellers: Product[];
  latestBooks: Product[];
  randomBook: Product[];
  featuredBook: Product[];
  topUsers: Member[];
}

// products
export interface ProductsPageState {
  admin: Member | null;
  chosenProduct: Product | null;
  products: Product[];
}

//orders
export interface OrdersPageState {
  pausedOrders: Order[];
  processOrders: Order[];
  finishedOrders: Order[];
}
