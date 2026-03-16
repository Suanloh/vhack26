# FraudShield AI - Complete Project Structure and Code Documentation

## Overview

FraudShield AI is a full-stack fraud detection dashboard built with Angular (frontend) and FastAPI (backend). This document provides a complete breakdown of all files, their purposes, and code structure.

## Directory Tree

```
fraudshield-ai/
│
├── backend/
│   ├── main.py                          # FastAPI application entry point
│   ├── models.py                        # Pydantic data models
│   ├── fraud_engine.py                  # Fraud detection and scoring logic
│   ├── transaction_simulator.py         # Mock transaction generator
│   └── requirements.txt                 # Python dependencies
│
├── frontend/
│   └── fraudshield-dashboard/
│       ├── src/
│       │   ├── app/
│       │   │   ├── core/
│       │   │   │   ├── api.service.ts                  # HTTP API service
│       │   │   │   └── websocket.service.ts            # WebSocket service
│       │   │   │
│       │   │   ├── components/
│       │   │   │   ├── transaction-monitor/
│       │   │   │   │   ├── transaction-monitor.component.html
│       │   │   │   │   ├── transaction-monitor.component.ts
│       │   │   │   │   └── transaction-monitor.component.css
│       │   │   │   │
│       │   │   │   ├── risk-meter/
│       │   │   │   │   ├── risk-meter.component.html
│       │   │   │   │   ├── risk-meter.component.ts
│       │   │   │   │   └── risk-meter.component.css
│       │   │   │   │
│       │   │   │   ├── ai-explanation/
│       │   │   │   │   ├── ai-explanation.component.html
│       │   │   │   │   ├── ai-explanation.component.ts
│       │   │   │   │   └── ai-explanation.component.css
│       │   │   │   │
│       │   │   │   ├── fraud-map/
│       │   │   │   │   ├── fraud-map.component.html
│       │   │   │   │   ├── fraud-map.component.ts
│       │   │   │   │   └── fraud-map.component.css
│       │   │   │   │
│       │   │   │   ├── behavior-profile/
│       │   │   │   │   ├── behavior-profile.component.html
│       │   │   │   │   ├── behavior-profile.component.ts
│       │   │   │   │   └── behavior-profile.component.css
│       │   │   │   │
│       │   │   │   ├── trust-score/
│       │   │   │   │   ├── trust-score.component.html
│       │   │   │   │   ├── trust-score.component.ts
│       │   │   │   │   └── trust-score.component.css
│       │   │   │   │
│       │   │   │   ├── fraud-simulator/
│       │   │   │   │   ├── fraud-simulator.component.html
│       │   │   │   │   ├── fraud-simulator.component.ts
│       │   │   │   │   └── fraud-simulator.component.css
│       │   │   │   │
│       │   │   │   └── protection-warning/
│       │   │   │       ├── protection-warning.component.html
│       │   │   │       ├── protection-warning.component.ts
│       │   │   │       └── protection-warning.component.css
│       │   │   │
│       │   │   ├── pages/
│       │   │   │   ├── dashboard/
│       │   │   │   │   ├── dashboard.component.html
│       │   │   │   │   ├── dashboard.component.ts
│       │   │   │   │   └── dashboard.component.css
│       │   │   │   │
│       │   │   │   ├── analytics/
│       │   │   │   │   ├── analytics.component.html
│       │   │   │   │   ├── analytics.component.ts
│       │   │   │   │   └── analytics.component.css
│       │   │   │   │
│       │   │   │   ├── simulator/
│       │   │   │   │   ├── simulator.component.html
│       │   │   │   │   ├── simulator.component.ts
│       │   │   │   │   └── simulator.component.css
│       │   │   │   │
│       │   │   │   └── map-page/
│       │   │   │       ├── map-page.component.html
│       │   │   │       ├── map-page.component.ts
│       │   │   │       └── map-page.component.css
│       │   │   │
│       │   │   ├── shared/
│       │   │   │   ├── models/
│       │   │   │   │   ├── live-transaction.model.ts
│       │   │   │   │   └── user-profile.model.ts
│       │   │   │   │
│       │   │   │   └── utils/
│       │   │   │
│       │   │   ├── app.component.html
│       │   │   ├── app.component.ts
│       │   │   ├── app.component.css
│       │   │   ├── app.module.ts
│       │   │   └── app-routing.module.ts
│       │   │
│       │   ├── environments/
│       │   │   ├── environment.ts
│       │   │   └── environment.prod.ts
│       │   │
│       │   ├── proxy.conf.json
│       │   ├── index.html
│       │   ├── main.ts
│       │   ├── styles.css
│       │   └── favicon.ico
│       │
│       ├── angular.json                 # Angular CLI configuration
│       ├── tsconfig.json               # TypeScript configuration
│       ├── tsconfig.app.json           # TypeScript app configuration
│       ├── tsconfig.spec.json          # TypeScript spec configuration
│       ├── package.json                # npm dependencies
│       └── package-lock.json           # npm lock file
│
├── README.md                            # Main documentation
├── SETUP_GUIDE.md                       # Detailed setup instructions
├── QUICK_START.md                       # Quick start guide
└── PROJECT_STRUCTURE.md                 # This file
```

## Backend Files

### main.py

The main FastAPI application file that sets up the server and defines all API endpoints.

**Key Components:**

- **CORS Middleware**: Allows the Angular frontend to communicate with the backend
- **ConnectionManager**: Manages WebSocket connections for broadcasting transactions
- **WebSocket Endpoint** (`/transactions/live`): Streams live transactions to connected clients
- **REST Endpoints**:
  - `POST /risk-score`: Scores a single transaction
  - `POST /simulate-attack`: Injects fraudulent transactions
  - `GET /user-profile/{user_id}`: Returns user behavioral profile
  - `GET /`: Health check endpoint

### models.py

Defines Pydantic models for data validation and serialization.

**Models:**

- **Location**: Geographic coordinates and location information
- **Transaction**: Complete transaction data including amount, location, device, etc.
- **RiskScore**: Risk assessment result with score, decision, and explanation
- **UserProfile**: User behavioral data including spending patterns and device usage
- **SimulateAttack**: Request model for fraud simulation

### fraud_engine.py

Implements the rule-based fraud detection engine.

**Fraud Rules:**

1. **High Amount**: If transaction amount > 5x average → +0.35 risk
2. **New Device**: If device type is unrecognized → +0.25 risk
3. **Foreign Location**: If transaction from outside home country → +0.25 risk
4. **High-Risk IP**: If IP matches high-risk pattern → +0.20 risk
5. **Impossible Travel**: If rapid location change detected → +0.40 risk

**Decision Logic:**

- Risk Score ≥ 0.8 → **BLOCK**
- Risk Score ≥ 0.5 → **FLAG**
- Risk Score < 0.5 → **APPROVE**

### transaction_simulator.py

Generates mock transactions for demonstration purposes.

**Features:**

- Generates realistic transaction data
- Supports both normal and fraudulent transaction generation
- Uses predefined user IDs, locations, and devices
- Includes Southeast Asian locations for regional relevance

### requirements.txt

Lists all Python dependencies:

```
fastapi
uvicorn
pydantic
websockets
```

## Frontend Files

### Core Services

#### api.service.ts

HTTP client service for REST API communication.

**Methods:**

- `getUserProfile(userId)`: Fetches user behavioral profile
- `simulateAttack(numTransactions)`: Triggers fraud attack simulation

#### websocket.service.ts

WebSocket service for real-time transaction streaming.

**Methods:**

- `getLiveTransactions()`: Returns Observable of live transactions
- `closeConnection()`: Closes WebSocket connection

### Components

#### transaction-monitor

Displays a live feed of incoming transactions with color-coded risk levels.

- **Green**: APPROVE
- **Yellow**: FLAG
- **Red**: BLOCK

#### risk-meter

Animated gauge component showing current risk score (0-100%).

#### ai-explanation

Displays the AI's reasoning for fraud decisions with a pie chart showing risk factor contributions.

#### fraud-map

Interactive world map using Leaflet showing transaction locations with markers.

#### behavior-profile

Shows user behavioral analytics including:

- Spending distribution (pie chart)
- Device usage breakdown (pie chart)
- Active hour heatmap
- Location clusters

#### trust-score

Gauge component displaying user trust score (0-100).

#### fraud-simulator

Button component to trigger fraud attack simulation.

#### protection-warning

Modal dialog warning users about suspicious transactions with options to confirm or cancel.

### Pages

#### dashboard

Main landing page combining transaction monitor, risk meter, AI explanation, and trust score.

#### analytics

Page displaying user behavior profile and spending patterns.

#### simulator

Page with fraud attack simulator button.

#### map-page

Page displaying the fraud map with all transaction locations.

### Models

#### live-transaction.model.ts

TypeScript interfaces for transaction data:

- `Location`: Geographic coordinates and city/country
- `Transaction`: Complete transaction details
- `RiskAnalysis`: Fraud detection results
- `LiveTransaction`: Combined transaction and risk analysis

#### user-profile.model.ts

TypeScript interface for user profile data:

- User ID and trust score
- Spending distribution by category
- Active hour heatmap
- Device usage breakdown
- Location clusters

### Configuration Files

#### angular.json

Angular CLI configuration including build options, serve configuration, and production settings.

#### tsconfig.json

TypeScript compiler configuration for the entire project.

#### tsconfig.app.json

TypeScript configuration specific to the application code.

#### tsconfig.spec.json

TypeScript configuration for test specifications.

#### package.json

npm dependencies and scripts:

- **Dependencies**: Angular, Material, Chart.js, Leaflet, ngx-echarts
- **Scripts**: `start`, `build`, `watch`, `test`

#### proxy.conf.json

Development server proxy configuration routing `/api` requests to the FastAPI backend.

### Environment Files

#### environment.ts

Development environment configuration with WebSocket URL pointing to local backend.

#### environment.prod.ts

Production environment configuration (requires updating with production domain).

### Global Files

#### index.html

HTML entry point for the Angular application.

#### main.ts

TypeScript entry point that bootstraps the Angular application.

#### styles.css

Global CSS styles including dark theme, Material overrides, and utility classes.

#### app.component.html

Root component template with sidenav navigation layout.

#### app.module.ts

Main Angular module declaring all components and importing required modules.

#### app-routing.module.ts

Application routing configuration defining routes for all pages.

## Data Flow

### Transaction Processing Flow

```
1. Backend generates transaction (transaction_simulator.py)
   ↓
2. Fraud engine scores transaction (fraud_engine.py)
   ↓
3. Transaction + Risk Score broadcast via WebSocket
   ↓
4. Frontend receives data (websocket.service.ts)
   ↓
5. Components update with new data
   ↓
6. UI reflects changes in real-time
```

### API Request Flow

```
1. Frontend component calls API service method
   ↓
2. API service makes HTTP request to backend
   ↓
3. Backend processes request and returns response
   ↓
4. Frontend receives response and updates component
```

## Key Technologies

### Backend

- **FastAPI**: Modern Python web framework for building APIs
- **Uvicorn**: ASGI server for running FastAPI
- **Pydantic**: Data validation and serialization
- **WebSockets**: Real-time bidirectional communication

### Frontend

- **Angular**: TypeScript-based web framework
- **Angular Material**: Material Design components
- **Chart.js**: Data visualization library
- **Leaflet**: Interactive maps
- **ngx-echarts**: Advanced charting library
- **RxJS**: Reactive programming library

## Build and Deployment

### Development

```bash
# Backend
cd backend && uvicorn main:app --reload

# Frontend
cd frontend/fraudshield-dashboard && ng serve
```

### Production

```bash
# Backend
pip install gunicorn
gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker

# Frontend
ng build --configuration production
```

## Security Considerations

1. **CORS Configuration**: Currently allows localhost only. Update for production.
2. **WebSocket Security**: Use `wss://` for production (WebSocket Secure).
3. **API Authentication**: Consider adding JWT authentication for production.
4. **Input Validation**: All inputs validated using Pydantic models.
5. **Environment Variables**: Use environment files for sensitive configuration.

## Future Enhancements

1. **Database Integration**: Add Supabase for persistent storage
2. **User Authentication**: Implement JWT-based authentication
3. **Advanced Fraud Rules**: Machine learning-based fraud detection
4. **Real Data Integration**: Connect to actual payment processors
5. **Mobile App**: React Native version for mobile platforms
6. **Analytics Dashboard**: More detailed fraud analytics and reporting
7. **Alert System**: Email/SMS notifications for high-risk transactions

---

**For more information, see README.md and SETUP_GUIDE.md**
