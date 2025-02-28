import { Product, Category } from './types';

export const categories: Category[] = [
  { id: '1', name: 'Todo', slug: 'all' },
  { id: '2', name: 'De sol', slug: 'clothing' },
  { id: '3', name: 'Para ver', slug: 'accessories' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Lente XXX',
    description: 'Descripccion XXXXXXXXXXXXXXxxx',
    price: 149.99,
    category: 'De sol',
    image: '/1.jpg',
    image2: '/1-1.jpg',
    featured: true,
  },
  {
    id: '2',
    name: 'Lente XXX',
    description: 'Descripccion XXXXXXXXXXXXXXxxx',
    price: 29.99,
    category: 'Para vista',
    image: '/2.jpg',
    image2: '/2-2.jpg',
    featured: true,
  },
  {
    id: '3',
    name: 'Lente XXX',
    description: 'Descripccion XXXXXXXXXXXXXXxxx',
    price: 19.99,
    category: 'De sol y para vista',
    image: '/3.jpg',
    image2: '/3-3.jpg',
    featured: true,
  },
  {
    id: '4',
    name: 'Lente XXX',
    description: 'Descripccion XXXXXXXXXXXXXXxxx',
    price: 99.99,
    category: 'De sol',
    image: '/4.jpg',
    image2: '/4-4.jpg',
    featured: true,
  },
  {
    id: '5',
    name: 'Lente XXX',
    description: 'Descripccion XXXXXXXXXXXXXXxxx',
    price: 59.99,
    category: 'De sol',
    image: '5.jpg',
    image2: '/5-5.jpg',
    featured: false,
  },
  {
    id: '6',
    name: 'Lente XXX',
    description: 'Descripccion XXXXXXXXXXXXXXxxx',
    price: 79.99,
    category: 'De vista',
    image: '6.jpg',
    image2: '/6-6.jpg',
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