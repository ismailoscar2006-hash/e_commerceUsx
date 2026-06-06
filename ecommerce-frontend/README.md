# TechStore - E-commerce Frontend

A modern, responsive React 19 + Vite e-commerce frontend for the TechStore electronics store.

## Features

### Public Features
- ✅ Home page with hero section, categories, and featured products
- ✅ Product listing with pagination
- ✅ Product search and filtering by category
- ✅ Detailed product pages
- ✅ User authentication (Login/Register)
- ✅ Shopping cart management
- ✅ Checkout and order placement
- ✅ Order history and tracking
- ✅ User profile management

### Admin Features
- ✅ Admin dashboard with statistics
- ✅ Product management (CRUD)
- ✅ Category management (CRUD)
- ✅ Order management with status updates
- ✅ User management and viewing
- ✅ Stock monitoring

## Tech Stack

- **React 19** - Modern UI library
- **Vite** - Next-generation build tool
- **React Router DOM v7** - Client-side routing
- **Axios** - HTTP client for API requests
- **Material UI (MUI)** - Professional UI component library
- **Context API** - State management
- **Emotion** - CSS-in-JS styling

## Project Structure

```
src/
├── api/
│   └── axiosConfig.js        # Axios instance with interceptors
├── components/
│   ├── Navbar.jsx             # Navigation bar
│   ├── Footer.jsx             # Footer component
│   ├── ProductCard.jsx        # Product display card
│   ├── CategoryFilter.jsx     # Category filter component
│   ├── AdminSidebar.jsx       # Admin sidebar navigation
│   ├── ProtectedRoute.jsx     # Route protection component
│   ├── LoadingSpinner.jsx     # Loading indicator
│   └── EmptyState.jsx         # Empty state display
├── context/
│   ├── AuthContext.jsx        # Authentication context
│   └── CartContext.jsx        # Shopping cart context
├── hooks/
│   ├── useAuth.js             # Authentication hook
│   └── useCart.js             # Cart hook
├── layouts/
│   ├── MainLayout.jsx         # Main page layout
│   └── AdminLayout.jsx        # Admin page layout
├── pages/
│   ├── HomePage.jsx           # Home page
│   ├── ProductsPage.jsx       # Products listing
│   ├── ProductDetailsPage.jsx # Product details
│   ├── LoginPage.jsx          # Login page
│   ├── RegisterPage.jsx       # Registration page
│   ├── CartPage.jsx           # Shopping cart
│   ├── CheckoutPage.jsx       # Checkout
│   ├── OrdersPage.jsx         # Order history
│   ├── ProfilePage.jsx        # User profile
│   └── admin/
│       ├── AdminDashboard.jsx # Admin dashboard
│       ├── AdminProducts.jsx  # Product management
│       ├── AdminCategories.jsx # Category management
│       ├── AdminOrders.jsx    # Order management
│       └── AdminUsers.jsx     # User management
├── services/
│   ├── authService.js         # Authentication API calls
│   ├── productService.js      # Product API calls
│   ├── categoryService.js     # Category API calls
│   ├── cartService.js         # Cart API calls
│   ├── orderService.js        # Order API calls
│   └── adminService.js        # Admin API calls
├── theme.js                   # Material UI theme
├── main.jsx                   # Application entry point
├── App.jsx                    # Main App component
└── index.css                  # Global styles
```

## Installation

### Prerequisites
- Node.js 18+ and npm/yarn installed
- Backend API running at `http://127.0.0.1:8000`

### Setup Steps

1. **Clone the repository**
```bash
cd c:\Users\hp\Desktop\e\ecommerce-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
```bash
cp .env.example .env
```

4. **Update .env if needed**
```env
VITE_API_URL=http://127.0.0.1:8000/api
```

5. **Start development server**
```bash
npm run dev
```

The application will open at `http://localhost:3000`

## Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## API Integration

The frontend communicates with the Laravel backend API. Ensure the backend is running:

```bash
# In the backend directory
cd ../ecommerce-backend
php artisan serve
```

### API Endpoints Used

**Authentication:**
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/profile` - Get user profile
- `PUT /auth/profile` - Update profile

**Products:**
- `GET /products` - List products (with pagination, search, filters)
- `GET /products/{id}` - Get product details
- `POST /products` - Create product (admin)
- `PUT /products/{id}` - Update product (admin)
- `DELETE /products/{id}` - Delete product (admin)

**Categories:**
- `GET /categories` - List categories
- `GET /categories/{id}` - Get category details
- `POST /categories` - Create category (admin)
- `PUT /categories/{id}` - Update category (admin)
- `DELETE /categories/{id}` - Delete category (admin)

**Cart:**
- `GET /cart` - Get shopping cart
- `POST /cart/add` - Add item to cart
- `PUT /cart/items/{id}` - Update cart item
- `DELETE /cart/items/{id}` - Remove item from cart
- `DELETE /cart/clear` - Clear cart

**Orders:**
- `GET /orders` - Get user's orders
- `GET /orders/{id}` - Get order details
- `POST /orders` - Place order

**Admin:**
- `GET /admin/users` - Get all users (admin)
- `GET /admin/orders` - Get all orders (admin)
- `PUT /admin/orders/{id}/status` - Update order status (admin)
- `GET /admin/stock` - Get stock status (admin)

## Authentication

The application uses JWT tokens stored in localStorage. Authentication is handled via:

1. **AuthContext** - Manages user authentication state
2. **Axios Interceptors** - Automatically attach Bearer token to requests
3. **ProtectedRoute** - Restricts access to authenticated/admin routes

### Demo Credentials

```
Admin Account:
  Email: admin@example.com
  Password: password

Client Account:
  Email: client@example.com
  Password: password
```

## State Management

### AuthContext
- Manages user authentication state
- Stores user data and token in localStorage
- Provides login, register, logout, and profile update functions

### CartContext
- Manages shopping cart state
- Provides functions to fetch, add, update, remove items, and clear cart
- Calculates cart total and item count

## Material UI Theme

Custom Material UI theme with:
- **Primary Color**: #1976d2 (Blue)
- **Secondary Color**: #ff9800 (Orange)
- **Custom Components**: Styled buttons, cards, and inputs

## Responsive Design

The application is fully responsive and optimized for:
- **Mobile** (320px and up)
- **Tablet** (768px and up)
- **Desktop** (1024px and up)

## Features Breakdown

### Customer Features

**Home Page**
- Hero section with search bar
- Product categories display
- Featured products showcase
- Call-to-action buttons

**Products Browsing**
- Product grid with pagination
- Search functionality
- Category filtering
- Product cards with images, prices, stock status

**Product Details**
- Large product image
- Detailed description
- Price and stock information
- Add to cart with quantity selector
- Stock warnings

**Shopping Cart**
- View all cart items
- Update quantities
- Remove items
- Clear cart
- Order summary with totals

**Checkout**
- Order summary
- Delivery address input
- Shipping method display
- Payment method display (COD)
- Order confirmation

**Orders**
- Order history with pagination
- Order details view
- Order status tracking (Pending, Confirmed, Delivered)
- Item-level details for each order

**Profile**
- View user information
- Update name, email, phone, address
- Account creation date
- Account type display

### Admin Features

**Dashboard**
- Statistics cards (Users, Products, Orders, Low Stock)
- Quick overview of store metrics

**Product Management**
- Add new products
- Edit existing products
- Delete products
- Manage product categories, prices, stock

**Category Management**
- Add new categories
- Edit category names
- Delete categories

**Order Management**
- View all orders
- Filter by status
- Update order status (Pending → Confirmed → Delivered)
- View order details and items

**User Management**
- View all registered users
- See user details and roles
- Monitor user accounts

## Error Handling

- API errors are caught and displayed in alerts
- Form validation errors are shown inline
- Network errors trigger user-friendly messages
- Unauthorized access (401) redirects to login
- Protected routes prevent unauthorized access

## Performance Optimizations

- Code splitting with React Router
- Lazy loading of images
- Pagination for large data sets
- Efficient API requests
- Memoization where beneficial

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Tips

### Using Axios for API Calls

```javascript
import api from '../api/axiosConfig'

// GET request
const response = await api.get('/products')

// POST request
const response = await api.post('/cart/add', {
  product_id: 1,
  quantity: 2
})

// Authenticated requests automatically include Bearer token
```

### Using Context Hooks

```javascript
import { useAuth } from '../hooks/useAuth'
import { useCart } from '../hooks/useCart'

function MyComponent() {
  const { user, login, logout } = useAuth()
  const { cart, addToCart, removeItem } = useCart()
  
  // Use in component...
}
```

### Creating New Pages

1. Create page file in `src/pages/`
2. Use `MainLayout` for public pages
3. Use `ProtectedRoute` for authenticated pages
4. Use `AdminLayout` for admin pages
5. Add route in `App.jsx`

## Troubleshooting

### "Cannot POST /api/..." Error
- Ensure backend is running: `php artisan serve`
- Check API URL in `.env`
- Verify CORS configuration in backend

### Cart/Orders not saving
- Check localStorage in browser DevTools
- Verify authentication token is present
- Check API responses for errors

### Admin pages not accessible
- Verify user is logged in with admin role
- Check token validity
- Look at browser console for errors

## Production Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy `dist/` folder to web server

3. Update API URL in `.env.production`

4. Configure web server for SPA routing

## Support

For issues or questions:
1. Check browser console for errors
2. Verify backend is running
3. Check Network tab in DevTools for API issues
4. Review logs in browser console

## License

MIT License - Feel free to use for any purpose

---

**Status**: ✅ Production Ready

**Version**: 1.0.0

**Last Updated**: 2026-06-06
