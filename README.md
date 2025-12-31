# NY Empire Academy - Admin Panel

A production-ready admin panel for managing NY Empire Academy's educational programs, users, and payments.

## 🎯 Overview

This admin panel provides comprehensive management tools for:
- **User Management**: Create, view, edit, and delete users
- **Program Management**: Manage educational programs with full CRUD operations  
- **Payment Tracking**: Monitor payment status, history, and revenue analytics
- **Dashboard Analytics**: Real-time statistics and insights

## 🧱 Tech Stack

- **Backend**: Laravel 12 (PHP 8.2+)
- **Frontend**: Vue.js 3 with Inertia.js
- **Authentication**: Laravel Breeze
- **Styling**: Tailwind CSS 4
- **Database**: SQLite (configurable to MySQL/PostgreSQL)

## ✅ Features Implemented

### 🔐 Authentication
- Secure login/registration using Laravel Breeze
- Protected admin routes with authentication middleware
- Session-based authentication with CSRF protection

### 📊 Dashboard
- Real-time statistics (users, programs, revenue, payments)
- Recent user registrations
- Recent payment activities  
- Revenue breakdown by program
- Visual charts and metrics

### 👥 User Management
- Complete user CRUD operations
- User search and filtering
- View user program interests
- Track user payment history
- User spending analytics

### 📚 Program Management  
- Full program CRUD operations
- Program search and filtering by status/category
- Track user interest and conversion rates
- Revenue tracking per program
- Program activation/deactivation

### 💰 Payment Management
- Payment status tracking (paid/pending/failed/refunded)
- Payment search and filtering
- Date range filtering
- CSV export functionality
- Manual payment status override
- Stripe integration ready
- Payment analytics and reporting

### 🎨 Modern UI/UX
- Responsive design for all screen sizes
- Clean, professional admin interface
- Consistent design system using Tailwind CSS
- Loading states and error handling
- Pagination for large datasets

## 🚀 Quick Start

### Prerequisites
- PHP 8.2 or higher
- Composer
- Node.js 18+ and npm
- SQLite (default) or MySQL/PostgreSQL

### Installation

1. **Clone and Install Dependencies**
```bash
git clone <repository-url>
cd nyea-backend
composer install
npm install
```

2. **Environment Setup**
```bash
cp .env.example .env
php artisan key:generate
```

3. **Database Setup**
```bash
php artisan migrate
php artisan db:seed
```

4. **Build Frontend Assets**
```bash
npm run build
# or for development with hot reload
npm run dev
```

5. **Start Development Server**
```bash
php artisan serve
```

### 🔑 Default Login Credentials
- **Email**: admin@nyea.test
- **Password**: password

### 📍 Access URLs
- **Main Site**: http://localhost:8000
- **Admin Panel**: http://localhost:8000/admin
- **Login**: http://localhost:8000/login

## 📁 Project Structure

```
nyea-backend/
├── app/
│   ├── Http/Controllers/Admin/    # Admin controllers
│   └── Models/                    # Eloquent models
├── database/
│   ├── migrations/               # Database schema
│   └── seeders/                  # Sample data
├── resources/js/
│   ├── Layouts/AdminLayout.vue   # Admin layout
│   ├── Pages/Admin/              # Admin pages
│   └── Components/               # Reusable components
└── routes/web.php               # Application routes
```

## 🗄️ Database Schema

### Core Tables
- **users**: User accounts and authentication
- **programs**: Educational programs catalog
- **user_program**: User program interests (pivot table)
- **payments**: Payment transactions and status

### Relationships
- Users can be interested in multiple programs
- Users can have multiple payments
- Programs can have multiple interested users
- Programs can have multiple payments

## 🎛️ Admin Panel Features

### Dashboard (`/admin`)
- Overview statistics cards
- Recent user registrations list
- Recent payment activities
- Revenue by program table
- Quick navigation to management sections

### User Management (`/admin/users`)
- **Index**: Paginated user list with search
- **Show**: Detailed user profile with interests and payments
- **Create**: Add new users
- **Edit**: Update user information
- **Delete**: Remove users (with confirmation)

### Program Management (`/admin/programs`)
- **Index**: Program list with filtering and search
- **Show**: Program details with user interest and sales data
- **Create**: Add new educational programs
- **Edit**: Update program information
- **Delete**: Remove programs (with confirmation)

### Payment Management (`/admin/payments`)
- **Index**: Payment list with advanced filtering
- **Show**: Detailed payment information
- **Update**: Manual payment status override
- **Export**: CSV export with filtering

## 🔧 Configuration

### Environment Variables
```env
APP_NAME="NY Empire Academy Admin"
APP_URL=http://localhost:8000
DB_CONNECTION=sqlite
```

### Customization
- Modify `resources/js/Layouts/AdminLayout.vue` for layout changes
- Update `tailwind.config.js` for styling customization
- Configure payment providers in `config/services.php`

## 📱 Responsive Design

The admin panel is fully responsive and works seamlessly on:
- Desktop computers (1200px+)
- Tablets (768px - 1199px)  
- Mobile devices (320px - 767px)

## 🔐 Security Features

- CSRF protection on all forms
- Authentication middleware on admin routes
- Input validation and sanitization
- SQL injection prevention via Eloquent ORM
- XSS protection through Vue.js escaping

## 🚀 Production Deployment

### Build Assets
```bash
npm run build
```

### Environment Configuration
```env
APP_ENV=production
APP_DEBUG=false
```

### Performance Optimization
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## 🎯 Sample Data

The application includes comprehensive sample data:
- **12 Educational Programs**: Digital Marketing, E-commerce, Social Media, etc.
- **21 Users**: Including admin and test users
- **50+ Payment Records**: Various statuses and dates
- **User Program Interests**: Realistic interest tracking

## 📈 Analytics & Reporting

The admin panel provides built-in analytics:
- Total revenue tracking
- Program conversion rates
- User engagement metrics
- Payment success rates
- Growth trends over time

## 🛠️ Development Commands

```bash
# Run migrations
php artisan migrate

# Seed database
php artisan db:seed

# Create new components
php artisan make:controller Admin/NewController
php artisan make:model NewModel -m

# Frontend development
npm run dev          # Development with hot reload
npm run build        # Production build
npm run preview      # Preview production build
```

## 🎨 UI Components

Reusable components include:
- AdminLayout with navigation
- Data tables with pagination
- Search and filter forms
- Status badges and indicators
- Modal dialogs
- Form components

## 🔄 Future Enhancements

Potential improvements:
- Real-time notifications
- Advanced analytics dashboard
- Email marketing integration
- Course progress tracking
- Multi-language support
- API endpoints for mobile app

## 📞 Support

For questions or support:
- Check Laravel documentation: https://laravel.com/docs
- Vue.js documentation: https://vuejs.org/guide/
- Inertia.js documentation: https://inertiajs.com/

---

**Built with ❤️ for NY Empire Academy**
