# FraudShield AI - Complete Setup and Deployment Guide

This guide provides step-by-step instructions to set up, build, and deploy the FraudShield AI application for both development and production environments.

## Table of Contents

1. [System Requirements](#system-requirements)
2. [Backend Setup (FastAPI)](#backend-setup-fastapi)
3. [Frontend Setup (Angular)](#frontend-setup-angular)
4. [Running the Application](#running-the-application)
5. [Building for Production](#building-for-production)
6. [Troubleshooting](#troubleshooting)
7. [Project Architecture](#project-architecture)

## System Requirements

### Backend Requirements

- **Python**: 3.10 or newer
- **pip**: Python package manager (comes with Python)
- **Virtual Environment** (recommended): `python -m venv`

### Frontend Requirements

- **Node.js**: Latest LTS version (16.x or newer recommended)
- **npm**: Comes bundled with Node.js
- **Angular CLI**: Install globally with `npm install -g @angular/cli`

### System Requirements

- **OS**: Linux, macOS, or Windows (with WSL2 recommended)
- **RAM**: 4GB minimum (8GB recommended)
- **Disk Space**: 2GB for dependencies and build artifacts

## Backend Setup (FastAPI)

### Step 1: Navigate to Backend Directory

```bash
cd /home/ubuntu/fraudshield-ai/backend
```

### Step 2: Create a Python Virtual Environment (Optional but Recommended)

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

This will install the following packages:

- **fastapi**: Web framework for building APIs
- **uvicorn**: ASGI server to run the FastAPI application
- **pydantic**: Data validation library
- **websockets**: WebSocket support for real-time communication

### Step 4: Verify Installation

```bash
python -c "import fastapi; print(fastapi.__version__)"
```

### Step 5: Run the Backend Server

```bash
uvicorn main:app --reload
```

The backend will start on `http://127.0.0.1:8000`. The `--reload` flag enables hot-reloading for development.

**Expected Output:**

```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started server process [12345]
INFO:     Waiting for application startup.
```

## Frontend Setup (Angular)

### Step 1: Navigate to Frontend Directory

```bash
cd /home/ubuntu/fraudshield-ai/frontend/fraudshield-dashboard
```

### Step 2: Install Node Dependencies

```bash
npm install
```

This command will install all dependencies listed in `package.json`, including Angular, Angular Material, Chart.js, and other libraries.

### Step 3: Verify Installation

```bash
ng version
```

This should display the Angular CLI version and other information.

### Step 4: Run the Development Server

```bash
ng serve
```

The frontend will start on `http://localhost:4200`. The application will automatically reload when you make code changes.

**Expected Output:**

```
✔ Compiled successfully.
✔ Built successfully.

Application bundle generated successfully. 1.23 MB

Initial Chunk Files | Names         | Size
bundle.js           | main          | 1.23 MB

Build at: 2024-01-15T10:30:45.123Z - Hash: abc123def456 - Time: 12345ms

** Angular Live Development Server is listening on localhost:4200 **

✔ Compiled successfully.
```

## Running the Application

### Prerequisites

Before running the application, ensure both the backend and frontend servers are running:

1. **Backend**: Running on `http://127.0.0.1:8000`
2. **Frontend**: Running on `http://localhost:4200`

### Step 1: Start the Backend

In a terminal, navigate to the backend directory and run:

```bash
cd /home/ubuntu/fraudshield-ai/backend
uvicorn main:app --reload
```

### Step 2: Start the Frontend

In a separate terminal, navigate to the frontend directory and run:

```bash
cd /home/ubuntu/fraudshield-ai/frontend/fraudshield-dashboard
ng serve
```

### Step 3: Access the Application

Open your web browser and navigate to `http://localhost:4200`. You should see the FraudShield AI dashboard with a live transaction feed.

### Features to Test

1. **Live Transaction Monitor**: Watch real-time transactions stream in from the backend.
2. **Risk Meter**: See the risk score update for each transaction.
3. **AI Explanation**: Click on a transaction to see why it was flagged or approved.
4. **Behavior Analytics**: Navigate to the "Behavior Analytics" page to see user spending patterns.
5. **Fraud Map**: View transaction locations on a world map.
6. **Attack Simulator**: Go to the "Attack Simulator" page and click "Simulate Fraud Attack" to inject fraudulent transactions.

## Building for Production

### Frontend Production Build

To create an optimized production build of the Angular application:

```bash
cd /home/ubuntu/fraudshield-ai/frontend/fraudshield-dashboard
ng build --configuration production
```

This will create a `dist/fraudshield-dashboard` directory with optimized, minified files ready for deployment.

### Backend Production Deployment

For production deployment of the FastAPI backend, use a production ASGI server like Gunicorn with Uvicorn:

```bash
pip install gunicorn
gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

This configuration:

- Uses 4 worker processes for better concurrency
- Binds to all network interfaces on port 8000
- Uses Uvicorn as the ASGI worker class

### Environment Configuration

Update the WebSocket URL in `src/environments/environment.prod.ts` to point to your production server:

```typescript
export const environment = {
  production: true,
  wsUrl: 'wss://your-production-domain.com/transactions/live'
};
```

Note: Use `wss://` (WebSocket Secure) for production deployments over HTTPS.

## Troubleshooting

### Backend Issues

#### Issue: `ModuleNotFoundError: No module named 'fastapi'`

**Solution**: Ensure you've installed the requirements:

```bash
pip install -r requirements.txt
```

#### Issue: Port 8000 is already in use

**Solution**: Use a different port:

```bash
uvicorn main:app --reload --port 8001
```

Then update the proxy configuration in the frontend.

#### Issue: WebSocket connection fails

**Solution**: Ensure the backend is running and check the browser console for errors. The WebSocket URL should be `ws://127.0.0.1:8000/transactions/live`.

### Frontend Issues

#### Issue: `npm ERR! code ERESOLVE`

**Solution**: Use the legacy peer deps flag:

```bash
npm install --legacy-peer-deps
```

#### Issue: Port 4200 is already in use

**Solution**: Use a different port:

```bash
ng serve --port 4300
```

#### Issue: Proxy not working

**Solution**: Ensure the proxy configuration in `src/proxy.conf.json` points to the correct backend URL:

```json
{
  "/api": {
    "target": "http://127.0.0.1:8000",
    "secure": false,
    "pathRewrite": {
      "^/api": ""
    }
  }
}
```

### General Issues

#### Issue: Application loads but no transactions appear

**Solution**: 

1. Check that the backend is running and generating transactions
2. Open the browser's Developer Tools (F12) and check the Console tab for errors
3. Check the Network tab to see if WebSocket connections are being established
4. Verify the WebSocket URL in `src/environments/environment.ts`

## Project Architecture

### Backend Architecture

The backend is organized into four main files:

- **main.py**: FastAPI application with WebSocket endpoint and REST API routes
- **models.py**: Pydantic models for data validation and serialization
- **transaction_simulator.py**: Generates mock transactions with realistic data
- **fraud_engine.py**: Rule-based fraud detection and risk scoring

### Frontend Architecture

The frontend follows Angular best practices with the following structure:

- **app.module.ts**: Main application module with all imports and declarations
- **app-routing.module.ts**: Application routing configuration
- **core/**: Services for API communication and WebSocket handling
- **components/**: Reusable UI components for different features
- **pages/**: Page-level components for different routes
- **shared/**: Shared models and utilities

### Data Flow

1. Backend generates a transaction every 2-5 seconds
2. Transaction is scored using the fraud engine
3. Transaction and risk score are broadcast via WebSocket
4. Frontend receives the data and updates the UI in real-time
5. User can interact with the dashboard to view details and simulate attacks

## Next Steps

1. **Customize Fraud Rules**: Modify `fraud_engine.py` to add your own fraud detection rules
2. **Add Database Integration**: Connect to Supabase for persistent data storage
3. **Implement Authentication**: Add user authentication using Supabase Auth
4. **Deploy to Cloud**: Deploy the application to AWS, Google Cloud, or Azure
5. **Add More Visualizations**: Extend the dashboard with additional charts and analytics

## Support

For issues or questions, refer to the official documentation:

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Angular Documentation](https://angular.io/docs)
- [Angular Material Documentation](https://material.angular.io/)
