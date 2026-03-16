# FraudShield AI - Quick Start Guide

Get up and running with FraudShield AI in 5 minutes!

## Prerequisites

- Python 3.10+
- Node.js (LTS version)
- npm (comes with Node.js)

## Quick Start

### 1. Start the Backend (Terminal 1)

```bash
cd /home/ubuntu/fraudshield-ai/backend
pip install -r requirements.txt
uvicorn main:app --reload
```

You should see:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
```

### 2. Start the Frontend (Terminal 2)

```bash
cd /home/ubuntu/fraudshield-ai/frontend/fraudshield-dashboard
npm install
ng serve
```

You should see:
```
✔ Compiled successfully.
✔ Built successfully.
** Angular Live Development Server is listening on localhost:4200 **
```

### 3. Open the Application

Open your browser and go to: **http://localhost:4200**

## What You'll See

- **Dashboard**: Live transaction feed with real-time fraud detection
- **Risk Meter**: Visual gauge showing the current risk score
- **AI Explanation**: Why each transaction was approved, flagged, or blocked
- **Behavior Analytics**: User spending patterns and device usage
- **Fraud Map**: World map showing transaction locations
- **Attack Simulator**: Button to inject fraudulent transactions for demo

## Test the Features

1. **Watch Live Transactions**: Transactions appear automatically every 2-5 seconds
2. **Simulate Fraud**: Go to "Attack Simulator" and click "Simulate Fraud Attack"
3. **View Analytics**: Navigate to "Behavior Analytics" to see user profiles
4. **Check the Map**: Go to "Fraud Map" to see transaction locations

## Troubleshooting

### Backend won't start
```bash
# Check if port 8000 is in use
lsof -i :8000
# Use a different port
uvicorn main:app --reload --port 8001
```

### Frontend won't start
```bash
# Clear npm cache and reinstall
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
ng serve
```

### No transactions appearing
1. Check browser console (F12) for errors
2. Verify backend is running on http://127.0.0.1:8000
3. Check Network tab to see WebSocket connection

## Project Structure

```
fraudshield-ai/
├── backend/              # FastAPI backend
│   ├── main.py          # Main application with WebSocket
│   ├── fraud_engine.py  # Fraud detection rules
│   ├── models.py        # Data models
│   └── transaction_simulator.py  # Mock data generator
│
├── frontend/            # Angular frontend
│   └── fraudshield-dashboard/
│       ├── src/
│       │   ├── app/     # Angular components
│       │   └── assets/  # Static files
│       └── package.json # Dependencies
│
└── README.md           # Full documentation
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| WebSocket | `/transactions/live` | Live transaction stream |
| POST | `/risk-score` | Score a transaction |
| POST | `/simulate-attack` | Inject fraudulent transactions |
| GET | `/user-profile/{user_id}` | Get user behavioral profile |

## Next Steps

1. **Customize Fraud Rules**: Edit `backend/fraud_engine.py`
2. **Add More Visualizations**: Extend components in `frontend/fraudshield-dashboard/src/app/components/`
3. **Deploy to Production**: See `SETUP_GUIDE.md` for production deployment
4. **Add Database**: Integrate Supabase for data persistence

## Need Help?

- Check `SETUP_GUIDE.md` for detailed setup instructions
- See `README.md` for complete documentation
- Check browser console (F12) for error messages
- Verify both backend and frontend are running

---

**Happy hacking! 🚀**
