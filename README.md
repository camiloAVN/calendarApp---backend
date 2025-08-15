# Calendar App Backend

A robust Node.js backend API for a calendar application that allows users to create, manage, and organize date-specific notes with secure authentication and authorization.

## 🚀 Features

- **User Authentication**: Secure registration and login system
- **JWT Authorization**: Token-based authentication for protected routes
- **Date-specific Notes**: Create and manage notes for specific calendar dates
- **User Ownership**: Users can only modify/delete their own notes
- **Password Security**: bcryptjs encryption for user passwords
- **Multi-user Support**: Multiple users can access the system independently
- **RESTful API**: Clean and intuitive API endpoints
- **Data Validation**: Robust input validation and error handling

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Password Encryption**: bcryptjs
- **Environment Variables**: dotenv

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/calendar-app-backend.git
   cd calendar-app-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=4000
   DB_CNN=mongodb://localhost:27017/calendar-app
   SECRET_JWT_SEED=your-super-secret-jwt-key-here
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 🗄️ Database Schema

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, encrypted)
}
```

### Event/Note Schema
```javascript
{
  title: String (required),
  notes: String,
  start: Date (required),
  end: Date (required),
  user: ObjectId (ref: 'User', required)
}
```

## 🔐 API Endpoints

### Authentication Routes

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Refresh Token
```http
GET /api/auth/renew
Authorization: Bearer <jwt_token>
```

### Events/Notes Routes

#### Get User Events
```http
GET /api/events
Authorization: Bearer <jwt_token>
```

#### Create New Event
```http
POST /api/events
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Meeting with client",
  "notes": "Discuss project requirements",
  "start": "2025-08-15T10:00:00.000Z",
  "end": "2025-08-15T11:00:00.000Z"
}
```

#### Update Event
```http
PUT /api/events/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Updated meeting title",
  "notes": "Updated notes",
  "start": "2025-08-15T10:30:00.000Z",
  "end": "2025-08-15T11:30:00.000Z"
}
```

#### Delete Event
```http
DELETE /api/events/:id
Authorization: Bearer <jwt_token>
```

## 📁 Project Structure

```
calendar-app-backend/
├── controllers/
│   ├── auth.js           # Authentication logic
│   └── events.js         # Events/notes logic
├── middlewares/
│   ├── validate-fields.js # Field validation middleware
│   └── validate-jwt.js    # JWT validation middleware
├── models/
│   ├── User.js           # User database model
│   └── Event.js          # Event database model
├── routes/
│   ├── auth.js           # Authentication routes
│   └── events.js         # Events routes
├── database/
│   └── config.js         # Database connection
├── helpers/
│   └── jwt.js            # JWT helper functions
├── .env.example          # Environment variables template
├── app.js                # Express app configuration
├── index.js              # Server entry point
└── package.json          # Dependencies and scripts
```

## 🔒 Security Features

- **Password Hashing**: All passwords are encrypted using bcryptjs
- **JWT Authentication**: Secure token-based authentication
- **Route Protection**: Protected routes require valid JWT tokens
- **User Authorization**: Users can only access/modify their own data
- **Input Validation**: Server-side validation for all inputs
- **CORS Configuration**: Proper CORS setup for frontend integration

## 🌍 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port number | `4000` |
| `DB_CNN` | MongoDB connection string | `mongodb://localhost:27017/calendar-app` |
| `SECRET_JWT_SEED` | JWT secret key | `your-super-secret-key-here` |

## 🚦 API Response Format

### Success Response
```javascript
{
  "ok": true,
  "data": { ... },
  "message": "Success message"
}
```

### Error Response
```javascript
{
  "ok": false,
  "message": "Error message",
  "errors": { ... }
}
```

## 🧪 Testing

To test the API endpoints, you can use tools like:
- Postman
- Thunder Client (VS Code extension)
- curl commands
- Frontend React application

## 🔗 Frontend Integration

This backend is designed to work with a React frontend application. The frontend should:

1. Handle user registration and login
2. Store JWT tokens (localStorage/sessionStorage)
3. Include tokens in Authorization headers
4. Display calendar with user's events/notes
5. Allow CRUD operations on events

## 📝 Usage Flow

1. **User Registration**: New users register with name, email, and password
2. **Authentication**: Users login to receive JWT token
3. **Create Events**: Authenticated users can create date-specific notes
4. **View Calendar**: Users see only their own events in the calendar
5. **Manage Events**: Users can update/delete only their own events
6. **Token Refresh**: Automatic token renewal for extended sessions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## 🙏 Acknowledgments

- Express.js team for the amazing framework
- MongoDB team for the database solution
- JWT.io for authentication standards
- bcryptjs for secure password hashing

---

## 🚀 Quick Start Commands

```bash
# Clone and install
git clone <repository-url>
cd calendar-app-backend
npm install

# Set up environment
cp .env.example .env
# Edit .env with your values

# Run development server
npm run dev

# The server will start on http://localhost:4000
```

For any questions or issues, please open an issue in the GitHub repository.