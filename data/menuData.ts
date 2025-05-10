export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: 'starters' | 'mains' | 'desserts' | 'drinks';
  image: string;
}

export const menuData: MenuItem[] = [
  {
    id: 1,
    name: 'Greek Salad',
    description: 'Fresh vegetables, feta cheese, olives, and olive oil',
    price: 12.99,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
  },
  {
    id: 2,
    name: 'Bruschetta',
    description: 'Toasted bread topped with tomatoes, garlic, and basil',
    price: 8.99,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f',
  },
  {
    id: 3,
    name: 'Grilled Salmon',
    description: 'Fresh salmon fillet with lemon and herbs',
    price: 24.99,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2',
  },
  {
    id: 4,
    name: 'Pasta Carbonara',
    description: 'Creamy pasta with bacon and parmesan',
    price: 18.99,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3',
  },
  {
    id: 5,
    name: 'Tiramisu',
    description: 'Classic Italian dessert with coffee and mascarpone',
    price: 9.99,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9',
  },
  {
    id: 6,
    name: 'Baklava',
    description: 'Sweet pastry made of layers of filo filled with chopped nuts and honey',
    price: 6.99,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b',
  },
  {
    id: 7,
    name: 'Lemonade',
    description: 'Fresh squeezed lemonade with mint',
    price: 4.99,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859',
  },
  {
    id: 8,
    name: 'Greek Coffee',
    description: 'Traditional Greek coffee served with a small sweet treat',
    price: 3.99,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
  },
]; 