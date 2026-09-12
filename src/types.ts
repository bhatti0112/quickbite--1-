export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  restaurantId: string;
  restaurantName: string;
  ingredients: string[];
  calories: number;
  prepTime: string;
  isPopular?: boolean;
  isSpicy?: boolean;
  isVegetarian?: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  image: string;
  address: string;
  city: string;
  isFeatured?: boolean;
  tags: string[];
  bannerImage: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
  itemCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  specialInstructions?: string;
  selectedOptions?: string[];
}

export interface PromoCode {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  minSubtotal: number;
  description: string;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  apt?: string;
  city: string;
  zipCode: string;
  paymentMethod: 'card' | 'applepay' | 'googlepay' | 'cash';
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  discount: number;
  tip: number;
  total: number;
  createdAt: string;
  status: 'confirmed' | 'preparing' | 'on_the_way' | 'delivered';
  estimatedDeliveryTime: string;
}

export interface CityOption {
  name: string;
  state: string;
  zip: string;
  deliveryTimeBonus: string;
}
