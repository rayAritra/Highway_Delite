# 🎫 BookIt - Travel Experience Booking Platform

A modern, fullstack web application for discovering and booking unique travel experiences across India. Built with Next.js, TypeScript, and PostgreSQL.

![BookIt Banner](./public/banner.png)

## 🌟 Features

### Core Functionality
- 🔍 **Browse & Search** - Explore diverse travel experiences with advanced filtering
- 📅 **Real-time Availability** - Check live slot availability with seat counts
- 💳 **Seamless Booking** - Complete booking flow with form validation
- 🎟️ **Promo Codes** - Apply discount codes at checkout
- ✉️ **Booking Confirmation** - Instant confirmation with unique booking reference
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop

### User Experience
- ⚡ Fast page loads with Next.js optimization
- 🎨 Pixel-perfect design matching Figma specifications
- 🦴 Skeleton loaders for smooth data fetching
- 🔔 Toast notifications for user feedback
- ♿ Accessible with semantic HTML and ARIA labels
- 🎯 Intuitive navigation with breadcrumbs

### Advanced Features
- 🔒 Prevent double-booking with slot validation
- 💰 Dynamic pricing with automatic calculations
- 🏷️ Multi-type promo code support (percentage & flat discounts)
- 🖼️ Image optimization with Next.js Image component
- 🔄 Debounced search for better performance
- 📊 Rating and review system

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: Custom components with Lucide React icons
- **Forms**: React Hook Form
- **Validation**: Zod
- **State Management**: React Hooks

### Backend
- **API**: Next.js API Routes
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Validation**: Zod schemas

### Deployment
- **Hosting**: Vercel
- **Database**: Railway / Supabase
- **CDN**: Vercel Edge Network

---

## 📁 Project Structure

```
bookit/
├── app/
│   ├── (routes)/
│   │   ├── page.tsx                      # Home page
│   │   ├── experiences/
│   │   │   └── [id]/page.tsx            # Experience details
│   │   ├── checkout/page.tsx            # Checkout page
│   │   └── confirmation/
│   │       └── [bookingId]/page.tsx     # Booking confirmation
│   ├── api/
│   │   ├── experiences/
│   │   │   ├── route.ts                 # List experiences
│   │   │   └── [id]/
│   │   │       ├── route.ts             # Get experience details
│   │   │       └── slots/route.ts       # Get available slots
│   │   ├── bookings/route.ts            # Create booking
│   │   ├── promo/
│   │   │   └── validate/route.ts        # Validate promo code
│   │   └── health/route.ts              # Health check
│   ├── layout.tsx                        # Root layout
│   └── globals.css                       # Global styles
├── components/
│   ├── ui/                               # Reusable UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── experience/                       # Experience components
│   │   ├── experience-card.tsx
│   │   ├── image-gallery.tsx
│   │   ├── date-picker.tsx
│   │   └── time-slot-selector.tsx
│   ├── checkout/                         # Checkout components
│   │   ├── checkout-form.tsx
│   │   ├── booking-summary.tsx
│   │   └── promo-code-input.tsx
│   └── layout/                           # Layout components
│       ├── header.tsx
│       ├── footer.tsx
│       └── breadcrumb.tsx
├── lib/
│   ├── prisma.ts                         # Prisma client instance
│   ├── utils.ts                          # Utility functions
│   └── validations.ts                    # Zod validation schemas
├── prisma/
│   ├── schema.prisma                     # Database schema
│   └── seed.ts                           # Seed data script
├── public/                               # Static assets
├── .env.example                          # Environment variables template
├── .gitignore
├── next.config.js
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/bookit.git
cd bookit
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your configuration:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/bookit"

# App URL (for development)
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Optional: For production
# NEXT_PUBLIC_API_URL="https://your-domain.com"
```

4. **Set up the database**
```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed the database with sample data
npx prisma db seed
```

5. **Start the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📊 Database Schema

### Experience
- Stores travel experience information
- Fields: title, description, category, price, rating, location, images, duration, host details

### Slot
- Manages time slots for each experience
- Tracks available and booked seats
- Unique constraint on experience + date + time

### Booking
- Records user bookings
- Generates unique booking reference
- Stores user details and payment information

### PromoCode
- Manages discount codes
- Supports percentage and flat discounts
- Active/inactive toggle

---

## 🔌 API Endpoints

### Experiences

**GET `/api/experiences`**
- Returns list of experiences with pagination
- Query params: `category`, `search`, `page`, `limit`
- Response: `{ experiences: Experience[], total: number }`

**GET `/api/experiences/[id]`**
- Returns single experience with full details
- Includes slots for next 30 days

**GET `/api/experiences/[id]/slots?date=YYYY-MM-DD`**
- Returns available time slots for specific date
- Shows remaining seats for each slot

### Bookings

**POST `/api/bookings`**
- Creates a new booking
- Validates slot availability and prevents double-booking
- Generates unique booking reference
- Body:
```json
{
  "experienceId": "string",
  "slotId": "string",
  "userName": "string",
  "userEmail": "string",
  "userPhone": "string",
  "guestsCount": number,
  "specialRequests": "string (optional)",
  "promoCode": "string (optional)",
  "totalPrice": number
}
```

### Promo Codes

**POST `/api/promo/validate`**
- Validates promo code and calculates discount
- Body: `{ code: string, baseAmount: number }`
- Response: `{ valid: boolean, discount: number, message: string }`

**Available Promo Codes:**
- `SAVE10` - 10% discount
- `FLAT100` - ₹100 flat discount
- `FIRST20` - 20% discount (first-time users)

### Health Check

**GET `/api/health`**
- Returns API health status
- Used for monitoring and uptime checks

---

## 🎨 Design System

### Colors
```css
Primary: #3B82F6 (Blue)
Secondary: #10B981 (Green)
Accent: #F59E0B (Amber)
Neutral: #6B7280 (Gray)
Background: #FFFFFF
Text: #111827
```

### Typography
- Font Family: Inter (system-ui fallback)
- Headings: font-bold
- Body: font-normal
- Small text: text-sm

### Spacing Scale
- Uses Tailwind's default spacing (4px base unit)
- Container max-width: 1280px
- Section padding: py-12 to py-20

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

---

## 🧪 Sample Data

The seed script populates the database with 15 diverse travel experiences:

1. **Sunrise Himalayan Trek** - Adventure (Manali)
2. **Jaipur Heritage Food Walk** - Food (Jaipur)
3. **Kerala Backwater Houseboat** - Nature (Alleppey)
4. **Goa Scuba Diving Adventure** - Adventure (Goa)
5. **Varanasi Spiritual Tour** - Culture (Varanasi)
6. **Mumbai Street Food Safari** - Food (Mumbai)
7. **Rajasthan Desert Safari** - Adventure (Jaisalmer)
8. **Gokarna Beach Yoga Retreat** - Wellness (Gokarna)
9. **Coorg Coffee Plantation Tour** - Nature (Coorg)
10. **Mysore Palace Night Tour** - Culture (Mysore)
11. **Rishikesh River Rafting** - Adventure (Rishikesh)
12. **Kolkata Heritage Walk** - Culture (Kolkata)
13. **Andaman Snorkeling Experience** - Adventure (Andaman)
14. **Udaipur Lake Palace Dinner** - Food (Udaipur)
15. **Darjeeling Tea Garden Tour** - Nature (Darjeeling)

All images sourced from Unsplash (royalty-free).

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Push code to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Import to Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repository
- Configure environment variables
- Deploy!

3. **Set up Database**
- Use Railway or Supabase for PostgreSQL
- Update `DATABASE_URL` in Vercel environment variables
- Run migrations: `npx prisma migrate deploy`

4. **Environment Variables**
Add these in Vercel dashboard:
```
DATABASE_URL=your_production_database_url
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

### Build Commands
```bash
# Production build
npm run build

# Start production server
npm start

# Run type checking
npm run type-check

# Lint code
npm run lint
```

---

## 📸 Screenshots

### Home Page
![Home Page](./docs/screenshots/home.png)
*Browse experiences with category filters and search*

### Experience Details
![Details Page](./docs/screenshots/details.png)
*View details, select dates, and check availability*

### Checkout
![Checkout Page](./docs/screenshots/checkout.png)
*Complete booking with form validation*

### Confirmation
![Confirmation Page](./docs/screenshots/confirmation.png)
*Booking confirmation with reference number*

---

## 🎯 Key Features Implementation

### Slot Management
- Real-time seat availability tracking
- Prevents overbooking with database constraints
- Shows color-coded availability (green/amber/red)

### Form Validation
- Client-side validation with Zod
- Server-side validation for security
- Real-time error messages
- Required field indicators

### Promo Code System
- Supports multiple discount types
- Real-time validation feedback
- Automatic price recalculation
- Prevents invalid code usage

### Responsive Design
- Mobile-first approach
- Touch-friendly UI elements
- Sticky CTAs on mobile
- Collapsible filters

---

## 🔒 Security Considerations

- Input validation on both client and server
- SQL injection prevention via Prisma
- XSS protection with React
- Environment variables for sensitive data
- CORS configuration
- Rate limiting on API routes (recommended for production)

---

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check database URL format
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# Test connection
npx prisma db push
```

### Build Errors
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

### Prisma Issues
```bash
# Reset database (⚠️ deletes all data)
npx prisma migrate reset

# Regenerate client
npx prisma generate
```

---

## 🚀 Future Enhancements

- [ ] User authentication and profiles
- [ ] Payment gateway integration (Razorpay/Stripe)
- [ ] Email notifications
- [ ] Reviews and ratings system
- [ ] Wishlist functionality
- [ ] Host dashboard for managing experiences
- [ ] Advanced search with filters (price range, duration)
- [ ] Map view of experiences
- [ ] Multi-language support
- [ ] PWA capabilities for offline access
- [ ] Admin panel for content management
- [ ] Analytics dashboard
- [ ] Social media sharing
- [ ] Chat with host feature

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- Design inspiration from various travel booking platforms
- Images from [Unsplash](https://unsplash.com)
- Icons from [Lucide React](https://lucide.dev)
- Built with [Next.js](https://nextjs.org) and [Tailwind CSS](https://tailwindcss.com)

---

## 📞 Support

For support, email your.email@example.com or open an issue in the GitHub repository.

---

**⭐ If you found this project helpful, please give it a star on GitHub!**