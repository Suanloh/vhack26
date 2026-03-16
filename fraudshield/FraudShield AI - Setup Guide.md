# FraudShield AI - Setup Guide

This document provides complete instructions for setting up and running the FraudShield AI application, a real-time fraud detection system for digital wallets.

## Project Overview

FraudShield AI is a full-stack application designed for hackathon presentations. It simulates a real-time fraud detection engine for digital wallet users, featuring a lightweight backend and a visually rich frontend to demonstrate AI-driven user protection.

- **Frontend**: Angular with Angular Material, Chart.js, and Leaflet for a dark-themed, modern fintech dashboard.
- **Backend**: Python FastAPI, providing a simple rule-based fraud engine, a random transaction generator, and a WebSocket for live data streaming.

## Folder Structure

The project is organized into two main parts: a `backend` folder for the FastAPI application and a `frontend` folder for the Angular application.

```
fraudshield-ai/
├── backend/
│   ├── main.py
│   ├── fraud_engine.py
│   ├── transaction_simulator.py
│   ├── models.py
│   └── requirements.txt
├── frontend/
│   └── fraudshield-dashboard/
│       ├── src/
│       │   ├── app/
│       │   ├── assets/
│       │   └── ...
│       ├── angular.json
│       ├── package.json
│       └── ...
└── README.md
```

## Backend Setup (FastAPI)

The backend is a Python application built with the FastAPI framework. It runs a local server to simulate transactions and score them for fraud risk.

### Prerequisites

- Python 3.10 or newer
- `pip` for package installation

### Installation

1.  **Navigate to the backend directory**:

    ```bash
    cd /home/ubuntu/fraudshield-ai/backend
    ```

2.  **Install the required Python packages**:

    ```bash
    pip install -r requirements.txt
    ```

### Running the Backend

To start the backend server, run the following command from the `backend` directory:

```bash
uvicorn main:app --reload
```

The `--reload` flag enables hot-reloading, which automatically restarts the server when code changes are detected. The backend will be accessible at `http://127.0.0.1:8000`.

## Frontend Setup (Angular)

The frontend is a single-page application built with Angular. It connects to the backend's WebSocket to display live transactions and fraud alerts.

### Prerequisites

- Node.js (latest LTS version recommended)
- npm (comes with Node.js)
- Angular CLI (`npm install -g @angular/cli`)

### Installation

1.  **Navigate to the frontend directory**:

    ```bash
    cd /home/ubuntu/fraudshield-ai/frontend/fraudshield-dashboard
    ```

2.  **Install the required npm packages**:

    ```bash
    npm install
    ```

### Running the Frontend

To start the Angular development server, run the following command from the `frontend/fraudshield-dashboard` directory:

```bash
ng serve
```

This command will compile the application and start a local development server. The frontend will be accessible at `http://localhost:4200`. The application is configured with a proxy, so all API requests to the backend will be automatically forwarded from `localhost:4200/api` to `http://127.0.0.1:8000`.

### Building for Production

To create a production-ready build of the Angular application, run:

```bash
ng build --configuration production
```

The optimized and minified application files will be placed in the `dist/fraudshield-dashboard` directory.

## How It Works

1.  The **FastAPI backend** continuously generates simulated user transactions and broadcasts them over a WebSocket connection.
2.  The **Angular frontend** connects to this WebSocket and displays the incoming transactions in a live feed.
3.  For each transaction, the backend's **fraud engine** calculates a risk score based on a set of rules (e.g., high amount, foreign location). The score, decision (`APPROVE`, `FLAG`, `BLOCK`), and an explanation are sent to the frontend.
4.  The frontend visualizes this information through a **real-time dashboard**, including a risk meter, an AI explanation panel, and a fraud map.
5.  The application also includes a **fraud attack simulator** that injects a burst of high-risk transactions to demonstrate the system's detection capabilities.
