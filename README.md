# Trove Investment Portfolio Dashboard

A responsive web application for tracking investment portfolios, built with React and Next.js. Features a login screen, net worth overview, sector allocation visualization, account summaries, and detailed holdings/transactions views.

## 🚀 Live Demo

[View Deployed App](https://trovefinancedashboard.netlify.app/login) 

## 📁 Repository

[GitHub Repository](https://github.com/phartex/Trove-finance-Assessment) 

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + Custom CSS Variables
- **State Management**: React Context API + TanStack Query
- **Charting**: Pure CSS (no external chart library)
- **Icons**: SVG (inline)
- **Build Output**: Static Export

---

## 🚀 How to Run the Project Locally

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation & Setup

1. **Clone the repository:**
```bash
git clone https://github.com/phartex/Trove-finance-Assessment.git
cd trove-finance-dashboard
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run the development server:**
```bash
npm run dev
```

4. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

### Demo Credentials
- **Email**: Any valid email format (e.g., user@example.com)
- **Password**: Any password with at least 6 characters

### Build for Production

```bash
npm run build
```

The static export will be generated in the `dist/` folder and can be deployed to any static hosting service.

---

## 🏗️ Approach & Architectural Decisions

### 1. Service Layer Pattern
Created a dedicated service layer (`portfolioService.ts`) that:
- Wraps JSON data in async functions (simulating API calls)
- Handles all data transformation and business logic in one place
- Centralizes data quirks handling (see below)
- Makes components pure, testable, and unaware of data source
- Simulates realistic API latency (800ms delays) for better UX testing

### 2. State Management Strategy
- **Authentication**: React Context API for global auth state (simple, no prop drilling)
- **Server State**: TanStack Query for data fetching, caching, and loading/error states
- **Local State**: React useState for component-specific UI state (filters, toggles)
- **No Redux**: Unnecessary for this scope; Context + TanStack Query is sufficient

### 3. CSS-First Design Approach
- No UI component libraries (Material-UI, Chakra, etc.)
- Custom CSS variables for the Trove v3 design system
- Tailwind CSS for utility classes only
- Demonstrates raw CSS skills as per assessment requirements
- Pure CSS allocation bar (no Chart.js, D3, etc.)

### 4. Component Architecture
- **Single Responsibility**: Each component does one thing well
- **Composition**: Small components composed together (NetWorthCard, AllocationBar, etc.)
- **Props-Down, Events-Up**: Clear data flow with callbacks
- **Loading Boundaries**: Every data fetch has loading and error states
- **Memoization**: useMemo for expensive calculations (filters, allocations)

### 5. Responsive Design
- Mobile-first approach with Tailwind breakpoints
- Flexible grid layouts that adapt from mobile to desktop
- Touch-friendly tap targets on mobile devices
- Optimized spacing for smaller screens

---

## 🔧 How Data Quirks Were Handled

The application intentionally handles several data anomalies from the provided JSON:

### 1. NVDA (NVIDIA) - `currentPrice: 0`
**Decision**: Treat as "Price Unavailable"
- Current value displays as "N/A" instead of "$0.00"
- Gain/loss calculations are skipped entirely
- Badge indicator shows "Price Unavailable" status with special styling
- Rationale: A price of $0 is unrealistic for NVIDIA stock, indicating missing/unavailable data rather than an actual zero value
- **User Impact**: Users see clear indication that price data is unavailable rather than misleading $0 value

### 2. DIS (Disney) - `shares: 0`
**Decision**: Treat as "Closed Position" (excluded from portfolio)
- Completely filtered out from holdings list
- Not included in total portfolio value calculation
- Not shown in sector allocation breakdown
- Rationale: 0 shares means the position has been closed/sold and should not appear in current holdings
- **User Impact**: Clean holdings list showing only active positions

### 3. Transaction Status - "PENDING"
**Decision**: Visually distinct with special styling
- Orange/yellow badge background (`bg-orange-500`)
- Clock icon indicator for visual recognition
- Border highlight on transaction card
- Rationale: Pending transactions need visual distinction from completed ones as they represent incomplete actions
- **User Impact**: Users can immediately identify which transactions are still processing

### 4. Transaction Status - "FAILED"
**Decision**: Error styling with clear visual indication
- Red badge background (`bg-red-500`)
- X icon indicator for failure state
- Red left border on transaction card for emphasis
- Negative visual weight draws attention
- Rationale: Failed transactions need immediate visual attention as they may require user action
- **User Impact**: Users can quickly spot and address failed transactions

### 5. Negative Returns
**Decision**: Proper formatting with consistent negative signage
- Red color coding for all losses (text-negative)
- Minus (-) prefix on all negative values
- No double negatives (e.g., "-5%" not "--5%")
- Consistent formatting across all percentage displays
- Rationale: Financial data must be unambiguous; negative values should be immediately recognizable
- **User Impact**: Clear, professional presentation of losses without confusion

---

## 🔮 What Would Be Improved or Added With More Time

### 1. Testing & Quality Assurance
- **Unit Tests**: Jest + React Testing Library for all service functions
- **Component Tests**: Snapshot testing for UI components
- **Integration Tests**: End-to-end flows with Cypress/Playwright
- **Error Boundary Testing**: Ensure graceful error handling

### 2. Enhanced Data Visualization
- **Historical Charts**: Trend lines showing portfolio value over time
- **Interactive Charts**: Click sectors to see breakdowns
- **Performance Metrics**: Time-weighted returns, Sharpe ratio
- **Comparison Charts**: Benchmark against market indices

### 3. User Experience Improvements
- **Skeleton Screens**: Better loading states than spinners
- **Page Transitions**: Smooth animations between routes
- **Toast Notifications**: For actions (order placed, settings saved)
- **Keyboard Navigation**: Full accessibility support
- **Screen Reader Support**: ARIA labels and semantic HTML

### 4. Data & State Management
- **Real-time Updates**: WebSocket integration for live price updates
- **Optimistic Updates**: UI updates before server confirmation
- **Offline Support**: Service worker for offline viewing
- **Data Persistence**: localStorage for user preferences (balance visibility, filters)

### 5. Additional Features
- **Portfolio Rebalancing**: Suggestions based on target allocations
- **Tax Loss Harvesting**: Identify opportunities to reduce taxes
- **Dividend Tracking**: Track and project dividend income
- **Export Functionality**: PDF/CSV reports for tax season
- **Multi-Currency**: Support for international portfolios



---

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
│   └── page.tsx               # Login form with validation
├── services/
│   ├── Portfolio_data.json    # Mock data
│   └── portfolioService.ts    # Data fetching & processing
├── globals.css                # Global styles & CSS variables
├── layout.tsx                 # Root layout with providers
└── page.tsx                   # Entry point with auth routing
public/
└── images/                    # Wireframe reference images
```

---

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

---

## ✨ Features

### Login Screen
- Email and password form validation
- Real-time validation feedback
- Password visibility toggle (eye icon)
- Loading state with spinner animation
- Error handling for invalid inputs

### Dashboard
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
  - Proper handling of pending and failed transactions

---

## 👨‍💻 Author

Built as part of the Trove Frontend Engineer Assessment.

## 📄 License

MIT License
