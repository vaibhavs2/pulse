export type Restaurant = {
  averageRating: string;
  distance: string;
  name: string;
  imageUrl: string;
  id: string;
};
export type CuisineItem = {
  imageUrl: string;
  name: string;
  price: number;
  itemId: string;
};
export type RestaurantCuisine = {
  name: string;
  id: string;
  data: Array<CuisineItem>;
};

export type CartCuisineItem = CuisineItem & {count: number; cusineId: string};
export type Cart = {
  shopId: string;
  items: Array<CartCuisineItem>;
};
