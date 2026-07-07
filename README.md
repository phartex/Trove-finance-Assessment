# Trove Investment Portfolio Dashboard

A responsive web application for tracking investment portfolios, built with React and Next.js. Features a login screen, net worth overview, sector allocation visualization, account summaries, and detailed holdings/transactions views.

## 🚀 Live Demo

[View Deployed App](https://your-deployment-url.vercel.app) *(Update with your actual deployment URL)*

## 📁 Repository

[GitHub Repository](https://github.com/yourusername/trove-finance-dashboard) *(Update with your actual repository URL)*

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + Custom CSS Variables
- **State Management**: React Context API
- **Charting**: Pure CSS (no external chart library)
- **Icons**: SVG (inline)
- **Build Output**: Static Export

## ✨ Features

### 1. Login Screen
- Email and password form validation
- Real-time validation feedback
- Loading state with spinner animation
- Error handling for invalid inputs
- **Demo credentials**: Any valid email format + password (min 6 characters)

### 2. Dashboard
- **Net Worth Card**: Total portfolio value with percentage change indicator
  - Hide/show balance toggle for privacy
  - Color-coded gains (green) and losses (red)
- **Allocation Bar**: Horizontal stacked bar chart showing sector distribution
  - Interactive legend with values
  - Color-coded by sector
- **Account Summary**: Breakdown by sector with position counts
- **Holdings & Transactions**: Tabbed interface
  - Stocks tab with search and sector filters
  - Orders tab with type filters (All/Buy/Sell)

### 3. Data Handling
- Service layer simulates async API calls
- Loading and error states throughout
- No direct JSON imports in components

## 📊 Data Quirks Handling

The application intentionally handles several data anomalies from the provided JSON:

### 1. NVDA (NVIDIA) - `currentPrice: 0`
**Decision**: Treat as "Price Unavailable"
- Current value displays as "N/A"
- Gain/loss calculations are skipped
- Badge indicator shows "Price Unavailable" status
- Rationale: A price of 0 is unrealistic for NVIDIA stock, indicating missing/unavailable data

### 2. DIS (Disney) - `shares: 0`
**Decision**: Treat as "Closed Position" (excluded from portfolio)
- Filtered out from holdings list entirely
- Not included in total portfolio value calculation
- Not shown in sector allocation
- Rationale: 0 shares means the position has been closed/sold

### 3. Transaction Status - "PENDING"
**Decision**: Visually distinct with special styling
- Orange/yellow badge background
- Clock icon indicator
- Border highlight on transaction card
- Rationale: Pending transactions need visual distinction from completed ones

### 4. Transaction Status - "FAILED"
**Decision**: Error styling with clear visual indication
- Red badge background
- X icon indicator
- Red left border on transaction card
- Negative visual weight
- Rationale: Failed transactions need immediate visual attention

### 5. Negative Returns
**Decision**: Proper formatting with negative signage
- Red color coding for losses
- Minus (-) prefix on all negative values
- No double negatives (e.g., "-5%" not "--5%")
- Consistent formatting across all percentage displays

## 🎨 Design System

### Colors (Trove v3)
- **Primary**: `#059A83` (Trove Green)
- **Success**: `#10AE17` (Gains/Positive)
- **Negative**: `#BF221C` (Losses/Errors)
- **Accent Blue**: `#00B6DF`
- **Purple**: `#7B79C9`
- **Cream**: `#F2C891`
- **Text Default**: `#13342F`
- **Text Neutral**: `#687D7A`
- **Border**: `#DBDFDF`
- **Background**: `#F5F1EE`

### Typography
- Font: Inter (system fallback)
- Net Worth: 26-28px, semi-bold
- Card Values: 14px, medium
- Labels: 11-12px, neutral color

### Spacing & Layout
- Card border-radius: 14-16px
- Generous whitespace throughout
- Responsive grid layouts
- Mobile-first approach

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/trove-finance-dashboard.git
cd trove-finance-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
```

The static export will be generated in the `dist/` folder.

### Deploy

This project is configured for static export and can be deployed to:
- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop the `dist/` folder
- **GitHub Pages**: Use the `dist/` folder

## 📁 Project Structure

```
app/
├── components/
│   ├── NetWorthCard.tsx      # Net worth display with toggle
│   ├── AllocationBar.tsx      # Sector allocation visualization
│   ├── AccountList.tsx        # Account summary cards
│   ├── StocksTab.tsx          # Holdings list with filters
│   └── OrdersTab.tsx          # Transaction list with filters
├── context/
│   └── AuthContext.tsx        # Authentication state management
├── dashboard/
│   └── page.tsx               # Main dashboard page
├── login/
│   └── page.tsx               # Login form
├── services/
│   ├── Portfolio_data.json    # Mock data
│   └── portfolioService.ts    # Data fetching & processing
├── globals.css                # Global styles & CSS variables
├── layout.tsx                 # Root layout with providers
└── page.tsx                   # Entry point with auth routing
public/
└── images/                    # Wireframe reference images
```

## 🎯 Architectural Decisions

### 1. Service Layer Pattern
Created a dedicated service layer (`portfolioService.ts`) that:
- Wraps JSON data in async functions (simulating API calls)
- Handles all data transformation and business logic
- Centralizes data quirks handling
- Makes components pure and testable

### 2. CSS-First Approach
- No UI component libraries used
- Custom CSS variables for the Trove design system
- Tailwind for utility classes only
- Demonstrates CSS skills as requested

### 3. State Management
- React Context for authentication (simple, no prop drilling)
- Local state for component-specific data (filters, toggles)
- No global state library needed for this scope

### 4. Component Architecture
- Small, focused components with single responsibilities
- Props-down, events-up pattern
- Memoization for expensive calculations (filters, allocations)
- Loading and error states at every data boundary

## 🔮 Future Improvements

Given more time, I would add:

1. **Real-time Updates**: WebSocket integration for live price updates
2. **Charts**: More sophisticated charting (trend lines, historical performance)
3. **Animations**: Page transitions, data loading skeletons
4. **Testing**: Unit tests for service layer, component integration tests
5. **Accessibility**: ARIA labels, keyboard navigation, screen reader support
6. **Performance**: Virtualization for large lists, code splitting
7. **Data Persistence**: Local storage for user preferences (balance visibility)
8. **Mobile App**: React Native version or PWA capabilities
9. **Dark Mode**: Theme switching based on user preference
10. **Export**: PDF/CSV export of portfolio reports

## 📝 Notes

- The application handles all intentional data quirks as specified
- No external charting library used - allocation bar built with pure CSS
- Fully responsive across desktop, tablet, and mobile
- All colors strictly follow the Trove v3 design system
- Loading states simulate realistic API delays (800ms)

## 👨‍💻 Author

Built as part of the Trove Frontend Engineer Assessment.

## 📄 License

MIT License
