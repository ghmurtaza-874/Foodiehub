import type { Product } from '../types';

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=600&q=80&auto=format&fit=crop`;

export const products: Product[] = [
  // ---------- Pizza ----------
  {
    id: 'p-margherita',
    name: 'Classic Margherita Pizza',
    description:
      'Wood-fired thin crust topped with tangy tomato sauce, fresh mozzarella, basil leaves and a drizzle of olive oil.',
    image: img('1565299624946-b28f40a0ae38'),
    category: 'pizza',
    price: 1450,
    originalPrice: 1700,
    rating: 4.7,
    dietary: 'veg',
    available: true,
    prepTime: '20-25 min',
    featured: true,
  },
  {
    id: 'p-pepperoni',
    name: 'Pepperoni Feast Pizza',
    description:
      'Loaded with double pepperoni, mozzarella and our signature spiced tomato base on a hand-stretched crust.',
    image: img('1513104890138-7c749659a591'),
    category: 'pizza',
    price: 1850,
    rating: 4.8,
    dietary: 'non-veg',
    available: true,
    prepTime: '22-28 min',
    featured: true,
  },
  {
    id: 'p-chicken-tikka',
    name: 'Chicken Tikka Pizza',
    description:
      'Desi-style pizza with marinated chicken tikka chunks, capsicum, onions and a generous layer of cheese.',
    image: img('1571066811602-716837d681de'),
    category: 'pizza',
    price: 1750,
    originalPrice: 1950,
    rating: 4.6,
    dietary: 'non-veg',
    available: true,
    prepTime: '25-30 min',
    featured: false,
  },

  // ---------- Burgers ----------
  {
    id: 'b-cheeseburger',
    name: 'Classic Cheeseburger',
    description:
      'Juicy beef patty, melted cheddar, crisp lettuce, tomato, pickles and house sauce in a toasted brioche bun.',
    image: img('1568901346375-23c9450c58cd'),
    category: 'burgers',
    price: 750,
    rating: 4.7,
    dietary: 'non-veg',
    available: true,
    prepTime: '12-15 min',
    featured: true,
  },
  {
    id: 'b-double-beef',
    name: 'Double Beef Monster Burger',
    description:
      'Two flame-grilled beef patties, double cheese, caramelized onions and smoky BBQ sauce stacked tall.',
    image: img('1551782450-a2132b4ba21d'),
    category: 'burgers',
    price: 1100,
    originalPrice: 1300,
    rating: 4.9,
    dietary: 'non-veg',
    available: true,
    prepTime: '15-18 min',
    featured: true,
  },
  {
    id: 'b-crispy-chicken',
    name: 'Crispy Zinger Burger',
    description:
      'Crunchy fried chicken fillet, fresh lettuce, creamy mayo and chili sauce in a soft sesame bun.',
    image: img('1610614819513-58e34989848b'),
    category: 'burgers',
    price: 690,
    rating: 4.5,
    dietary: 'non-veg',
    available: true,
    prepTime: '10-14 min',
    featured: false,
  },

  // ---------- Biryani ----------
  {
    id: 'br-chicken',
    name: 'Chicken Dum Biryani',
    description:
      'Aromatic basmati rice slow-cooked with tender chicken, saffron, fried onions and traditional spices.',
    image: img('1565557623262-b51c2513a641'),
    category: 'biryani',
    price: 550,
    rating: 4.8,
    dietary: 'non-veg',
    available: true,
    prepTime: '20-25 min',
    featured: true,
  },
  {
    id: 'br-beef',
    name: 'Beef Biryani Special',
    description:
      'Fragrant rice layered with succulent beef chunks, whole spices and a hint of mint. Served with raita.',
    image: img('1589302168068-964664d93dc0'),
    category: 'biryani',
    price: 750,
    originalPrice: 850,
    rating: 4.6,
    dietary: 'non-veg',
    available: true,
    prepTime: '25-30 min',
    featured: false,
  },

  // ---------- Pasta ----------
  {
    id: 'pa-alfredo',
    name: 'Chicken Alfredo Pasta',
    description:
      'Creamy fettuccine in a rich parmesan Alfredo sauce with grilled chicken strips and a sprinkle of parsley.',
    image: img('1551183053-bf91a1d81141'),
    category: 'pasta',
    price: 950,
    rating: 4.7,
    dietary: 'non-veg',
    available: true,
    prepTime: '18-22 min',
    featured: true,
  },
  {
    id: 'pa-arrabbiata',
    name: 'Penne Arrabbiata',
    description:
      'Penne tossed in a spicy tomato, garlic and chili sauce with fresh basil and a drizzle of olive oil.',
    image: img('1432139555190-58524dae6a55'),
    category: 'pasta',
    price: 850,
    rating: 4.5,
    dietary: 'veg',
    available: true,
    prepTime: '15-20 min',
    featured: false,
  },
  {
    id: 'pa-carbonara',
    name: 'Spaghetti Carbonara',
    description:
      'Classic spaghetti with creamy egg sauce, smoked bacon, parmesan and cracked black pepper.',
    image: img('1481931098730-318b6f776db0'),
    category: 'pasta',
    price: 980,
    originalPrice: 1100,
    rating: 4.6,
    dietary: 'non-veg',
    available: true,
    prepTime: '18-22 min',
    featured: false,
  },

  // ---------- Chinese ----------
  {
    id: 'c-chowmein',
    name: 'Chicken Chow Mein',
    description:
      'Stir-fried noodles with chicken, shredded cabbage, carrots and soy sauce. A street-style favourite.',
    image: img('1525351484163-7529414344d8'),
    category: 'chinese',
    price: 720,
    rating: 4.6,
    dietary: 'non-veg',
    available: true,
    prepTime: '15-18 min',
    featured: true,
  },
  {
    id: 'c-kungpao',
    name: 'Kung Pao Chicken',
    description:
      'Diced chicken wok-tossed with peanuts, dried chilies and a sweet-savoury sauce. Served with rice.',
    image: img('1559054663-e8d23213f55c'),
    category: 'chinese',
    price: 890,
    rating: 4.5,
    dietary: 'non-veg',
    available: true,
    prepTime: '18-22 min',
    featured: false,
  },

  // ---------- Sandwiches ----------
  {
    id: 's-veggie-club',
    name: 'Veggie Club Sandwich',
    description:
      'Triple-decker sandwich with grilled vegetables, cheese, lettuce and house dressing. Served with fries.',
    image: img('1509722747041-616f39b57569'),
    category: 'sandwiches',
    price: 520,
    rating: 4.4,
    dietary: 'veg',
    available: true,
    prepTime: '10-14 min',
    featured: false,
  },
  {
    id: 's-grilled-chicken',
    name: 'Grilled Chicken Sandwich',
    description:
      'Marinated grilled chicken breast, caramelized onions, melted cheese and garlic mayo in a soft roll.',
    image: img('1481070414801-51fd732d7184'),
    category: 'sandwiches',
    price: 640,
    originalPrice: 720,
    rating: 4.6,
    dietary: 'non-veg',
    available: true,
    prepTime: '12-15 min',
    featured: false,
  },
  {
    id: 's-sub',
    name: 'Chicken Tikka Sub',
    description:
      'Toasted sub loaded with chicken tikka, fresh veggies, cheese and a tangy mint mayo.',
    image: img('1565958011703-44f9829ba187'),
    category: 'sandwiches',
    price: 590,
    rating: 4.5,
    dietary: 'non-veg',
    available: true,
    prepTime: '10-14 min',
    featured: false,
  },

  // ---------- Desserts ----------
  {
    id: 'd-lava-cake',
    name: 'Chocolate Lava Cake',
    description:
      'Warm chocolate cake with a molten center, dusted with cocoa and served with vanilla ice cream.',
    image: img('1601493700631-2b16ec4b4716'),
    category: 'desserts',
    price: 480,
    rating: 4.9,
    dietary: 'veg',
    available: true,
    prepTime: '10-12 min',
    featured: true,
  },
  {
    id: 'd-cheesecake',
    name: 'New York Cheesecake',
    description:
      'Creamy baked cheesecake on a buttery biscuit base, topped with a strawberry coulis.',
    image: img('1533134242443-d4fd215305ad'),
    category: 'desserts',
    price: 550,
    originalPrice: 620,
    rating: 4.7,
    dietary: 'veg',
    available: true,
    prepTime: '5-8 min',
    featured: false,
  },
  {
    id: 'd-tiramisu',
    name: 'Classic Tiramisu',
    description:
      'Layers of espresso-soaked ladyfingers and mascarpone cream dusted with bitter cocoa.',
    image: img('1551024506-0bccd828d307'),
    category: 'desserts',
    price: 600,
    rating: 4.6,
    dietary: 'veg',
    available: true,
    prepTime: '5-8 min',
    featured: false,
  },

  // ---------- Drinks ----------
  {
    id: 'dr-lime-mint',
    name: 'Fresh Lime & Mint',
    description:
      'Hand-pressed lime with mint leaves, lightly sweetened and served over crushed ice.',
    image: img('1571934811356-5cc061b6821f'),
    category: 'drinks',
    price: 280,
    rating: 4.5,
    dietary: 'veg',
    available: true,
    prepTime: '4-6 min',
    featured: false,
  },
  {
    id: 'dr-mango-smoothie',
    name: 'Mango Smoothie',
    description:
      'Thick blend of fresh mango pulp, yogurt and a touch of honey. Summer in a glass.',
    image: img('1610970881699-44a5587cabec'),
    category: 'drinks',
    price: 350,
    originalPrice: 400,
    rating: 4.8,
    dietary: 'veg',
    available: true,
    prepTime: '4-6 min',
    featured: true,
  },
  {
    id: 'dr-orange-juice',
    name: 'Fresh Orange Juice',
    description:
      'Cold-pressed oranges, nothing added. Packed with vitamin C and natural sweetness.',
    image: img('1544145945-f90425340c7e'),
    category: 'drinks',
    price: 300,
    rating: 4.4,
    dietary: 'veg',
    available: true,
    prepTime: '3-5 min',
    featured: false,
  },
  {
    id: 'dr-iced-coffee',
    name: 'Iced Caramel Coffee',
    description:
      'Double espresso over ice with milk and a swirl of caramel syrup. The perfect afternoon pick-me-up.',
    image: img('1556679343-c7306c1976bc'),
    category: 'drinks',
    price: 380,
    rating: 4.6,
    dietary: 'veg',
    available: true,
    prepTime: '4-6 min',
    featured: false,
  },

  // ---------- Healthy ----------
  {
    id: 'h-quinoa-bowl',
    name: 'Quinoa Power Bowl',
    description:
      'Protein-rich quinoa with roasted vegetables, chickpeas, avocado and a lemon-tahini dressing.',
    image: img('1512621776951-a57141f2eefd'),
    category: 'healthy',
    price: 820,
    rating: 4.7,
    dietary: 'veg',
    available: true,
    prepTime: '12-15 min',
    featured: true,
  },
  {
    id: 'h-grilled-salad',
    name: 'Grilled Chicken Salad',
    description:
      'Crisp greens, cherry tomatoes, cucumber and grilled chicken with a light vinaigrette.',
    image: img('1547592180-85f173990554'),
    category: 'healthy',
    price: 760,
    rating: 4.6,
    dietary: 'non-veg',
    available: true,
    prepTime: '10-14 min',
    featured: false,
  },
  {
    id: 'h-greek-salad',
    name: 'Greek Salad',
    description:
      'Tomatoes, cucumber, red onion, olives and feta cheese with oregano and extra-virgin olive oil.',
    image: img('1490645935967-10de6ba17061'),
    category: 'healthy',
    price: 690,
    originalPrice: 780,
    rating: 4.5,
    dietary: 'veg',
    available: true,
    prepTime: '8-10 min',
    featured: false,
  },
  {
    id: 'h-buddha-bowl',
    name: 'Buddha Bowl',
    description:
      'Brown rice, roasted sweet potato, edamame, avocado and a creamy peanut dressing.',
    image: img('1498837167922-ddd27525d352'),
    category: 'healthy',
    price: 850,
    rating: 4.7,
    dietary: 'veg',
    available: false,
    prepTime: '12-15 min',
    featured: false,
  },
];

export const getProductById = (id: string): Product | undefined =>
  products.find((p) => p.id === id);

export const getFeaturedProducts = (): Product[] =>
  products.filter((p) => p.featured && p.available);

export const getRelatedProducts = (product: Product, limit = 4): Product[] =>
  products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
