Password Maker

A secure password generator with a React frontend and PHP backend. Generates cryptographically secure passwords with customizable options and real-time validation.

Features
- Customizable password generation:
    - Length (6–99 characters)
    - Toggle uppercase, lowercase, numbers, and special characters
- Guaranteed character inclusion: At least one character from each enabled class
- Real-time validation with helpful error messages
- Password strength indicator
- Copy to clipboard functionality
- RESTful API with proper error handling
- Dockerized for easy setup (development and production)

Quick Start (Docker)

Prerequisites:
Docker Desktop (v20+)
Git

Run the App:
# Clone the repository
git clone https://github.com/your-username/password-maker.git
cd password-maker

# Start the app
docker-compose up --build

Access the Application
Frontend: http://localhost:5173
API Test: http://localhost:8000/api/generate.php?length=12
The app will auto-reload when you edit source files.


Manual Setup (Without Docker)
Backend (PHP)
Navigate to the backend directory:
cd backend

Start the PHP built-in server:
php -S localhost:8000

Test the API:
http://localhost:8000/api/generate.php?length=12


Frontend (React)
Navigate to the frontend directory:
cd frontend

Install dependencies:
npm install

Start the development server:
npm run dev

Open your browser:
App: http://localhost:5173
Ensure the PHP server is running on localhost:8000 before starting the React app.

API Documentation
Endpoint
GET /api/generate.php


Success Response
Status: 200 OK
Content-Type: text/plain; charset=utf-8
Body: Generated password string
Error Response
Status: 400 Bad Request
Content-Type: application/json; charset=utf-8
Body:
json
{
  "error": "Invalid input parameters",
  "details": {
    "length": "Length must be between 6 and 99.",
    "classes": "At least one character class must be enabled."
  }
}

License
Distributed under the MIT License. See LICENSE for more information.

Acknowledgements
React - Frontend library
Vite - Build tool
PHP - Backend language
Docker - Containerization