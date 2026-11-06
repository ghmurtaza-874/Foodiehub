# FoodieHub 🍔

> **Good Food. Great Mood. Delivered Fresh.**

A complete, premium-quality **frontend-only** food ordering web application built with Vite, React, TypeScript and Bootstrap 5.

This is a **frontend demo**. All cart, checkout, payment, authentication and order operations are simulated entirely in the browser using React state and `localStorage`. No real orders are placed, no real payments are processed, and no real authentication happens.

---

## Tech Stack

| Layer | Choice |
| --- | --- |
| Build tool | Vite 8 |
| UI framework | React 19 |
| Language | TypeScript (strict) |
| Styling | Bootstrap 5 + plain CSS (custom design system) |
| Icons | lucide-react |
| Routing | react-router-dom 7 |
| State | React Context + `useLocalStorage` custom hook |
| Persistence | browser `localStorage` |

> No Tailwind, no Material UI, no backend, no AJAX, no real payment gateway.

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
# → http://localhost:5173

# 3. Production build
npm run build

# 4. Preview the production build
npm run preview
```

Requires Node.js 18+ (tested on Node 24).

---

## Features

### Pages (14 routes)
- `/` Home — hero, categories, featured products, about, testimonials
- `/menu` Food Menu — search, category filter, dietary filter, sort, product grid
- `/product/:id` Product Details — large image, quantity selector, related products
- `/favorites` Favorites — saved items, move to cart
- `/cart` Shopping Cart — quantity controls, coupon, totals, empty state
- `/checkout` Checkout — customer info, delivery option, payment method, order summary
- `/order/:id` Order Confirmation — unique order ID, summary, print option
- `/orders` Order History — persisted demo orders
- `/login` & `/register` Demo account (localStorage only, no real auth)
- `/profile` Customer profile + logout
- `/about` About FoodieHub
- `/contact` Contact form (demo submission)
- `*` 404 Not Found

### Shopping Cart (React Context + localStorage)
- Add / remove / increase / decrease quantity
- Quantity cannot drop below 1
- Adding an existing product increases its quantity
- Unavailable products cannot be added
- Subtotal, delivery fee, discount, grand total — recalculated instantly
- Persists across refresh; restored on load
- Empty cart state + "Continue shopping"

### Pricing & Coupons (PKR)
Reusable pricing utility (`src/utils/pricing.ts`).

| Code | Discount | Min. subtotal |
| --- | --- | --- |
| `WELCOME10` | 10% off | — |
| `FOODIE15` | 15% off | PKR 1,500 |
| `SAVE200` | PKR 200 off | PKR 1,000 |

Validation:
- Coupon must exist
- Same coupon cannot be applied twice
- Discount cannot exceed the eligible subtotal
- Success and error messages via toast

### Checkout & Validation
Centralized validation in `src/utils/validation.ts` with TypeScript interfaces for form values and errors.

- Full name (3–60 chars, name characters only)
- Email (valid structure, trimmed)
- Phone (Pakistani formats: `03XXXXXXXXX`, `+923XXXXXXXXX`, `923XXXXXXXXX`, normalized for display)
- Address (10–250 chars)
- City (min 2 chars)
- Area (required)
- Postal code (validated when provided)
- Delivery instructions (optional, max 250 chars)

Validation behaviour:
- Validates on blur and on submit
- Inline errors beside each field
- `aria-invalid` + `aria-describedby` for accessibility
- Scrolls to the first invalid field on submit
- **No `alert()` / `confirm()`** — all feedback via toasts and inline errors

### Payment Methods (demo only)
- Cash on Delivery
- Card payment — **clearly labeled demo fields**, fake sample data only, no real card data collected
- Wallet payment — demo UI

### Order Confirmation
- Unique demo order ID (`FH-XXXXXXXX-XXXX`)
- Full order summary (items, customer, address, totals, payment method)
- Estimated delivery time (illustrative)
- "Print Order Summary" option
- Persisted to `localStorage` order history
- Clear notice: *"This is a frontend demo. No real order has been sent to a restaurant."*

### Favorites
- Add / remove favorites from product cards and product details
- Favorites count badge in navbar
- Favorites page with empty state
- Add favorite directly to cart

### Demo Account
- Login & registration pages (localStorage only)
- Password visibility toggle
- Password confirmation
- Profile page + logout
- **No real authentication** — clearly labeled as demo. Passwords are not stored.

---

## Project Structure

```
src/
  assets/
  components/
    layout/        Navbar, Footer
    home/          Hero, CategorySection, FeaturedProducts, About, Testimonials
    products/      ProductCard, ProductGrid, ProductDetails, ProductFilters
    cart/          CartItem, CartSummary
    checkout/      CheckoutForm, OrderSummary, PaymentMethods
    account/       LoginForm, RegisterForm
    common/        Button, Input, Modal, Toast, EmptyState, PasswordInput, Rating, ScrollToTop
  context/         CartContext, FavoritesContext, AuthContext, OrdersContext, ToastContext
  hooks/           useLocalStorage
  pages/           HomePage, MenuPage, FavoritesPage, CartPage, CheckoutPage,
                   OrderSuccessPage, LoginPage, RegisterPage, ProfilePage,
                   AboutPage, ContactPage, OrdersPage, NotFoundPage
  data/            products (29 items), categories, coupons
  types/           index.ts
  utils/           validation, pricing, formatCurrency, storage
  styles/          variables.css, global.css, components.css
  App.tsx
  main.tsx
```

---

## Design System

| Token | Value |
| --- | --- |
| Primary orange | `#FF6B35` |
| Secondary orange | `#F4511E` |
| Warm cream | `#FFF9F1` |
| Dark charcoal | `#242424` |
| Soft gray | `#F3F4F6` |
| Accent yellow | `#FFC857` |
| Success | `#16A34A` |
| Error | `#DC2626` |

Typography: **Poppins** (headings) + **Inter** (body), loaded from Google Fonts.
Food photography: real Unsplash CDN URLs.

---

## Accessibility

- Semantic HTML5 throughout
- Keyboard-accessible interactions
- Visible focus indicators
- Meaningful `alt` attributes on images
- Accessible modal behaviour (focus trap, Esc to close)
- Proper `<label>` associations
- `aria-invalid` / `aria-describedby` on form fields
- `prefers-reduced-motion` support

---

## Manual Test Checklist

### Cart
- [x] Add one product
- [x] Add same product again (quantity increments)
- [x] Increase / decrease quantity (cannot go below 1)
- [x] Remove product
- [x] Clear cart
- [x] Refresh — cart persists

### Menu
- [x] Search by name
- [x] Filter by category
- [x] Sort by price asc / desc
- [x] Sort by rating
- [x] Filter veg / non-veg
- [x] Empty search results state

### Coupons
- [x] Valid coupon applies discount
- [x] Invalid coupon shows error
- [x] Duplicate coupon rejected
- [x] Discount cannot exceed subtotal

### Validation
- [x] Empty name, invalid email, invalid phone, short address, missing city,
      invalid postal code, missing payment selection — all blocked
- [x] Valid complete checkout succeeds

### Orders
- [x] Empty cart cannot proceed to checkout
- [x] Valid order generates unique ID
- [x] Order history persists

### Responsive
- [x] Mobile (single column, compact navbar, touch targets)
- [x] Tablet (two-column grid)
- [x] Desktop (3–4 column grid, two-column checkout)

---

## Notes for Future Backend Integration

The frontend is structured so a real backend can be slotted in without redesign:
- All data access goes through typed modules in `src/data/` and `src/context/`
- `localStorage` persistence is isolated in `src/hooks/useLocalStorage.ts` and `src/utils/storage.ts`
- Validation lives in `src/utils/validation.ts` and can be reused server-side
- Order shape (`Order` interface) matches what a real order API would return

---

## Disclaimer

This is a **frontend demo** for educational/portfolio purposes.
- No real food is ordered.
- No real payment is processed.
- No real account is created.
- Do **not** enter real card numbers or personal data into the demo payment fields.

---

© FoodieHub — Frontend Demo.
