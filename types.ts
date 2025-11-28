export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string; 
  duration: string;
  rating: number;
  imageUrl: string;
  popular?: boolean;
  bestseller?: boolean;
}

export interface CartItem extends Service {
  quantity: number;
}

export interface BookingDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  date: string;
  time: string;
  notes: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}