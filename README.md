# 🏢 Employee Hub - HR Management System

<div align="center">

![Employee Hub](https://img.shields.io/badge/Employee%20Hub-HR%20Management-blue?style=for-the-badge)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

*A comprehensive desktop HR application for efficient employee management*

</div>

---

## 📋 Overview

Employee Hub is a robust HR management system designed to streamline employee data management and provide insightful analytics through interactive dashboards. Built with modern web technologies, it offers a seamless experience for HR professionals to manage their workforce efficiently with full CRUD operations (GET, POST, PUT, DELETE).

## ✨ Key Features

### 🎯 **Core Functionality**
- **Complete CRUD Operations** - Add, Edit, Update, and Delete employee records
- **Interactive Dashboard** - Visual analytics powered by ECharts
- **Employee Management** - Comprehensive employee listing with action controls
- **Department Analytics** - Real-time employee count by department
- **Desktop Optimized** - Tailored for desktop environments

### 📊 **Dashboard Highlights**
- Department-wise employee distribution
- Real-time employee statistics
- Visual charts and graphs using ECharts
- Quick overview of HR metrics

### 👥 **Employee Management**
- Detailed employee profiles
- Bulk operations support
- Advanced filtering and search
- Action buttons for quick operations

## 🛠️ Technology Stack

### **Frontend**
- **Angular** - Modern TypeScript-based framework
- **SCSS** - Enhanced CSS with variables and mixins
- **ECharts** - Interactive charting library
- **Global Styling** - Consistent UI/UX across the application

### **Backend**
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, unopinionated web framework
- **RESTful API** - Clean and scalable API architecture

### **Database**
- **PostgreSQL** - Robust relational database
- **Optimized Queries** - Efficient data retrieval and manipulation

## 🏗️ Application Structure

```
Employee Hub/
├── 📊 Dashboard Page
│   ├── Employee count by department
│   ├── Interactive charts (ECharts)
│   └── Quick statistics overview
│
├── ➕ Create Page
│   ├── Employee registration form
│   ├── Comprehensive employee details
│   └── Form validation
│
└── 👥 Employees Page
    ├── Employee listing with pagination
    ├── Search and filter functionality
    └── Action buttons (Edit, Delete, View)
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- Angular CLI
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/employee-hub.git
   cd employee-hub
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

4. **Database Setup**
   ```bash
   # Create PostgreSQL database
   createdb Employee_Hub
   
   # Run migrations
   npm run migrate
   ```

5. **Environment Configuration**
   ```bash
   # Backend (.env)
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=employee_hub
   DB_USER=your_username
   DB_PASSWORD=your_password
   PORT=3000
   
   # Frontend (environment.ts)
   API_URL=http://localhost:3000/api
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```

2. **Start the frontend application**
   ```bash
   cd frontend
   ng serve
   ```

3. **Access the application**
   - Open your browser and navigate to `http://localhost:4200`

## 📱 Application Screenshots

### Dashboard
- 📊 Department-wise employee analytics
- 📈 Interactive charts and graphs
- 🔢 Real-time employee statistics

### Employee Management
- 📋 Comprehensive employee listing
- ⚡ Quick action buttons
- 🔍 Advanced search and filtering

### Create Employee
- 📝 Detailed employee form
- ✅ Form validation
- 💾 Secure data storage

## 🎨 Design Philosophy

- **Desktop-First** - Optimized for desktop environments
- **Global Styling** - Consistent design language
- **User-Centric** - Intuitive and efficient workflows
- **Responsive Elements** - Adaptive components for better UX

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees/:id` | Get employee by ID |
| POST | `/api/employees/employee` | Create new employee |
| PUT | `/api/employees/:id` | Update employee |
| DELETE | `/api/employees/:id` | Delete employee |

---

<div align="center">

**Built with ❤️ for efficient HR management**

*If you found this project helpful, please consider giving it a ⭐!*

</div>
