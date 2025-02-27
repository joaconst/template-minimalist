import { Product, Category } from './types';

export const categories: Category[] = [
  { id: '1', name: 'All', slug: 'all' },
  { id: '2', name: 'Clothing', slug: 'clothing' },
  { id: '3', name: 'Accessories', slug: 'accessories' },
  { id: '4', name: 'Home', slug: 'home' },
  { id: '5', name: 'Tech', slug: 'tech' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Minimalist Watch',
    description: 'A sleek, minimalist watch with a leather strap.',
    price: 149.99,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    featured: true,
  },
  {
    id: '2',
    name: 'Simple White T-Shirt',
    description: 'A comfortable, plain white t-shirt made from organic cotton.',
    price: 29.99,
    category: 'clothing',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
    featured: true,
  },
  {
    id: '3',
    name: 'Ceramic Mug',
    description: 'A handcrafted ceramic mug in a minimalist design.',
    price: 19.99,
    category: 'home',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d',
    featured: true,
  },
  {
    id: '4',
    name: 'Wireless Earbuds',
    description: 'Sleek wireless earbuds with noise cancellation.',
    price: 99.99,
    category: 'tech',
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb',
    featured: true,
  },
  {
    id: '5',
    name: 'Linen Shirt',
    description: 'A breathable linen shirt perfect for summer days.',
    price: 59.99,
    category: 'clothing',
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10',
    featured: false,
  },
  {
    id: '6',
    name: 'Minimalist Backpack',
    description: 'A sleek backpack with multiple compartments.',
    price: 79.99,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
    featured: false,
  },
  {
    id: '7',
    name: 'Desk Lamp',
    description: 'A modern desk lamp with adjustable brightness.',
    price: 49.99,
    category: 'home',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c',
    featured: false,
  },
  {
    id: '8',
    name: 'Bluetooth Speaker',
    description: 'A portable Bluetooth speaker with premium sound quality.',
    price: 129.99,
    category: 'tech',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1',
    featured: false,
  },
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getAllProducts = (): Product[] => {
  return products;
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'all') return products;
  return products.filter(product => product.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};