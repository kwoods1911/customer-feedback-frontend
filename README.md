#  Customer Feedback Frontend

This is a lightweight React single-page application (SPA) that interacts with the Laravel-based Customer Feedback API. Users can submit their feedback, see recent submissions, and filter feedback by satisfaction rating (using emojis).

---


## Requirements

- Node.js >= 22
- NPM >= 10
- Vite (bundler used for development)


## Installation Instructions

### 1. Clone the Repository


git clone https://github.com/kwoods1911/customer-feedback-frontend.git
cd customer-feedback-frontend


### 2. Install Dependencies

npm install

### 3. Set Up environment Variables

cp .env.example .env

and un comment the line inside the file.
VITE_API_URL=http://127.0.0.1:8000/api/feedback

### 4. Run the application

npm run dev
