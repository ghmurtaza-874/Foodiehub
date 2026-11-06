import type { Category } from '../types';

export const categories: Category[] = [
  { id: 'all', name: 'All', icon: '🍽️' },
  { id: 'pizza', name: 'Pizza', icon: '🍕' },
  { id: 'burgers', name: 'Burgers', icon: '🍔' },
  { id: 'biryani', name: 'Biryani', icon: '🍛' },
  { id: 'pasta', name: 'Pasta', icon: '🍝' },
  { id: 'chinese', name: 'Chinese', icon: '🥡' },
  { id: 'sandwiches', name: 'Sandwiches', icon: '🥪' },
  { id: 'desserts', name: 'Desserts', icon: '🍰' },
  { id: 'drinks', name: 'Drinks', icon: '🥤' },
  { id: 'healthy', name: 'Healthy Food', icon: '🥗' },
];

export const categoryName = (id: string): string =>
  categories.find((c) => c.id === id)?.name ?? id;
