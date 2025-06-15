# Excel Analytics - MERN Stack Application

A full-stack web application for Excel data analytics and visualization built with the MERN stack.

## 🚀 Features

- **User Authentication**: Secure login/register system
- **Excel File Upload**: Support for .xlsx and .csv files
- **Data Visualization**: Interactive charts and graphs
- **Real-time Analytics**: Dynamic data processing
- **Responsive Design**: Works on desktop and mobile

## 🛠️ Tech Stack

- **Frontend**: React.js, CSS3, HTML5
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **File Processing**: xlsx, multer

## 📁 Project Structure

excel-analytics/ ├── backend/ │ ├── controllers/ │ │ └── authController.js │ ├── middlewares/ │ │ └── auth.js │ ├── models/ │ │ └── User.js │ ├── routes/ │ │ └── auth.js │ ├── server.js │ └── package.json ├── frontend/ │ └── [React frontend files] └── README.md

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/excel-analytics.git
   cd excel-analytics
2.	Install Backend Dependencies
3.	cd backend
4.	npm install
5.	Install Frontend Dependencies
6.	cd ../frontend
7.	npm install
8.	Environment Setup Create .env file in the backend directory:
9.	PORT=5000
10.	MONGODB_URI=mongodb://localhost:27017/excel-analytics
11.	JWT_SECRET=your_jwt_secret_key
12.	Start the Application
Backend:
cd backend
npm start
Frontend:
cd frontend
npm start
13.	Access the Application
o	Frontend: http://localhost:3000
o	Backend API: https://excel-analytics-n9he.onrender.com
📱 Usage
1.	Register a new account or login
2.	Upload your Excel/CSV files
3.	View analytics and visualizations
4.	Export processed data
🤝 Contributing
1.	Fork the repository
2.	Create your feature branch (git checkout -b feature/AmazingFeature)
3.	Commit your changes (git commit -m 'Add some AmazingFeature')
4.	Push to the branch (git push origin feature/AmazingFeature)
5.	Open a Pull Request
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
👤 Author
Your Name
•	GitHub: @yourusername
•	Email: your.email@example.com
🙏 Acknowledgments
•	Thanks to the MERN stack community
•	Excel.js for file processing capabilities
