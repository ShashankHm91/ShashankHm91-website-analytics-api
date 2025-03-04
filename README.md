# Website Analytics API

## 🚀 Overview
The **Website Analytics API** is a scalable backend service designed to track analytics events such as clicks, visits, referrer data, and device metrics. This API can be integrated with any website or mobile app, providing real-time insights and analytics.

## 🔥 Features
- **API Key Management**: Register, retrieve, revoke API keys.
- **Event Collection API**: Capture and store analytics events.
- **Analytics & Reporting**: Aggregate event data for insights.
- **Authentication**: API key-based authentication (no Google Auth).
- **Caching**: Redis caching for frequently requested data.
- **Rate Limiting**: Prevents abuse and excessive requests.
- **Swagger API Documentation**: Interactive API documentation.
- **Unit & Integration Tests**: Jest-based automated testing.
- **Dockerized & Deployable on Render**.
- **Logging & Monitoring**: Winston & Morgan for logging.

---

## 🛠 Installation & Setup
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/YOUR_GITHUB_USERNAME/website-analytics-api.git
cd website-analytics-api
```
### **2️⃣ Install Dependencies**
```sh
npm install
```
### **3️⃣ Start the Server**
```sh
npm start
```
The API will be available at **`http://localhost:5000`**

### **4️⃣ Running with Docker**
- **Build and Run API with Docker**
  ```sh
  docker build -t website-analytics-api .
  docker run -p 5000:5000 --env-file .env website-analytics-api
  ```
- **Run API with MongoDB & Redis Using Docker Compose**
  ```sh
  docker-compose up --build
  ```

---

## 📡 API Endpoints & Usage

### **1️⃣ API Key Management**
- **Register an App & Generate API Key**  
  `POST /api/auth/register`
  ```json
  { "appName": "MyApp" }
  ```
  **Response:**
  ```json
  { "status": "success", "apiKey": "your-api-key" }
  ```
- **Retrieve API Key**  
  `GET /api/auth/api-key?appName=MyApp`
  **Response:**
  ```json
  { "status": "success", "apiKey": "your-api-key" }
  ```
- **Revoke API Key**  
  `POST /api/auth/revoke`
  ```json
  { "appName": "MyApp" }
  ```
  **Response:**
  ```json
  { "status": "success", "message": "API key revoked successfully" }
  ```

### **2️⃣ Event Collection**
- **Submit Analytics Event**  
  `POST /api/events/collect`
  ```json
  {
    "event": "button_click",
    "url": "https://example.com",
    "referrer": "https://google.com",
    "device": "mobile",
    "ipAddress": "192.168.1.1",
    "timestamp": "2024-02-20T12:34:56Z",
    "metadata": {
      "browser": "Chrome",
      "os": "Android",
      "screenSize": "1080x1920"
    }
  }
  ```
  **Response:**
  ```json
  { "status": "success", "message": "Event recorded successfully" }
  ```

### **3️⃣ Analytics & Reporting**
- **Event Summary**  
  `GET /api/analytics/event-summary?event=button_click&startDate=2024-02-15&endDate=2024-02-20&app_id=xyz123`
  **Response:**
  ```json
  {
    "event": "button_click",
    "count": 3400,
    "uniqueUsers": 1200,
    "deviceData": {
      "mobile": 2200,
      "desktop": 1200
    }
  }
  ```
- **User Statistics**  
  `GET /api/analytics/user-stats?userId=1234`
  **Response:**
  ```json
  {
    "userId": "1234",
    "totalEvents": 150,
    "deviceDetails": {
      "browser": "Chrome",
      "os": "Android"
    },
    "ipAddress": "192.168.1.1"
  }
  ```

---

## 🤝 Contributing
Feel free to open issues and submit pull requests!

Happy Coding! 🚀

