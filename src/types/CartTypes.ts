export type CartItem = {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
  count: number;
};

export type Cart = Array<CartItem>;
