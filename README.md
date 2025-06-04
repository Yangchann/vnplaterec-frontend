# 🚗 Vietnam License Plate Recognition - Frontend 

This is the frontend of a License Plate Recognition (LPR) system, built with **Next.js** using **React** and **TypeScript**.  
It provides a clean, user-friendly interface for uploading images or accessing a live camera stream to detect vehicle license plates in real-time.

👉 **Backend repository:** [github.com/cnmeow/vnplaterec-backend](https://github.com/cnmeow/vnplaterec-backend)
 
## 🔧 Technologies Used   
 
- ⚛️ Next.js – React framework for building modern web applications
- 🧠 TypeScript – Strongly typed language for safer code
- 📷 Live camera access via browser APIs
- 📡 Integration with backend (Flask API) for AI inference (YOLO, Faster R-CNN)

## ✨ Features

- Upload images to recognize license plates

  <img width="600" alt="image" src="https://github.com/user-attachments/assets/2c7e742f-776d-4e83-ae53-7cb76fc37834" />
- Real-time recognition from live camera feed

  <img width="600" alt="image" src="https://github.com/user-attachments/assets/3a3ab07e-7c94-4c5b-8842-10feafd537b4" />

## 🚀 Getting Started

### Run Backend
1. Clone the Backend Repository
```bash
git clone https://github.com/cnmeow/vnplaterec-backend.git
cd vnplaterec-backend
```

2. Run
- Option A: Run with Python (uvicorn)
  ```bash
  # Create virtual environment (optional)
  python -m venv venv
  source venv/bin/activate # (macOS)
  venv\Scripts\activate.bat # (Windows)

  
  # Install dependencies
  pip install -r requirements.txt
  
  # Run the Flask server
  uvicorn main:app --host 0.0.0.0 --port 8080 
  ```

- Option B: Run with Docker
  ```bash
  # Build Docker image
  docker build -t vnplaterec-backend .

  # Run Docker container
  docker run -d -p 8080:8080 --name vnplaterec-backend vnplaterec-backend
  ```

🟢 Backend running at: `http://localhost:8080`

### Run Frontend
1. Clone the Frontend Repository
```bash
git clone https://github.com/cnmeow/vnplaterec-frontend.git
cd vnplaterec-frontend
```

2. Run
- Option A: Run with npm
  - Install Dependencies
    ```bash
    npm install
    ```
  - Create `.env`
    ```bash
    NEXT_PUBLIC_API_URL=http://localhost:8080 # Backend
    ```
  - Start Development Server
    ```bash
    npm run build
    npm run start
    ```

- Option B: Run with Docker
  ```bash
  # Build Docker image
  docker build \
  --build-arg NEXT_PUBLIC_API_URL=http://localhost:8080 \
  -t vnplaterec-frontend .

  # Run Docker container
  docker run -d -p 3000:3000 --name vnplaterec-frontend vnplaterec-frontend
  ```

🟢 Frontend running at: `http://localhost:3000`
