# 📚 Bookstore Management API

A RESTful API for managing a bookstore built with **Node.js**, **Express**, and **MongoDB (Mongoose)**. Supports full CRUD operations, search & filter, and paginated responses.

---

## 🚀 Features

- ✅ Full CRUD for books (Create, Read, Update, Delete)
- 🔍 Search & filter by name, author, and price range
- 📄 Pagination on list endpoints
- ⚠️ Centralized error handling with custom `HttpError` class
- 🔐 Input validation with descriptive messages
- 🔄 Auto-restart in development with **Nodemon**

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB | Database |
| Mongoose | ODM for MongoDB |
| Nodemon | Dev auto-restart |

---

## 📁 Project Structure

```
bookstore-management/
├── app.js                  # Entry point & Express setup
├── package.json
├── .env.example            # Environment variable template
├── db/
│   └── db.js               # MongoDB connection
├── middleware/
│   └── HttpError.js        # Custom HTTP error class
├── models/
│   └── bookModel.js        # Mongoose Book schema
├── routes/
│   └── bookRoutes.js       # Route definitions
└── controllers/
    └── bookController.js   # Business logic & handlers
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) (local or [Atlas](https://www.mongodb.com/cloud/atlas))

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/bookstore-management.git
cd bookstore-management

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
```

### Environment Variables

Edit the `.env` file with your values:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/bookstore
```

### Running the Server

```bash
# Development (with Nodemon)
npm run dev

# Production
npm start
```

Server will be running at: `http://localhost:3000`

---

## 📡 API Reference

### Base URL
```
http://localhost:3000
```

---

### 📖 Books

#### Get All Books
```http
GET /books?page=1&limit=10
```

| Query Param | Type | Description |
|---|---|---|
| `page` | `number` | Page number (default: 1) |
| `limit` | `number` | Items per page (default: 10) |

**Response `200`**
```json
{
  "message": "Books retrieved successfully",
  "total": 25,
  "page": 1,
  "totalPages": 3,
  "books": [ { ... } ]
}
```

---

#### Get Book by ID
```http
GET /books/:id
```

**Response `200`**
```json
{
  "message": "Book retrieved successfully",
  "book": {
    "_id": "64f1a2...",
    "name": "The Alchemist",
    "author": "Paulo Coelho",
    "publishDate": "1988",
    "price": 12.99,
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

---

#### Create a Book
```http
POST /books
Content-Type: application/json
```

**Request Body**
```json
{
  "name": "The Alchemist",
  "author": "Paulo Coelho",
  "publishDate": "1988",
  "price": 12.99
}
```

| Field | Type | Required |
|---|---|---|
| `name` | `string` | ✅ Yes |
| `author` | `string` | ✅ Yes |
| `publishDate` | `string` | ❌ No |
| `price` | `number` | ❌ No |

**Response `201`**
```json
{
  "message": "Book created successfully",
  "book": { ... }
}
```

---

#### Update a Book
```http
PUT /books/:id
Content-Type: application/json
```

**Request Body** *(any fields to update)*
```json
{
  "price": 15.99
}
```

**Response `200`**
```json
{
  "message": "Book updated successfully",
  "book": { ... }
}
```

---

#### Delete a Book
```http
DELETE /books/:id
```

**Response `200`**
```json
{
  "message": "Book deleted successfully",
  "book": { ... }
}
```

---

#### Search & Filter Books
```http
GET /books/search?name=alchemist&author=paulo&minPrice=5&maxPrice=20
```

| Query Param | Type | Description |
|---|---|---|
| `name` | `string` | Filter by name (case-insensitive) |
| `author` | `string` | Filter by author (case-insensitive) |
| `minPrice` | `number` | Minimum price |
| `maxPrice` | `number` | Maximum price |

**Response `200`**
```json
{
  "message": "Search results",
  "total": 3,
  "books": [ { ... } ]
}
```

---

## ❌ Error Responses

All errors follow a consistent format:

```json
{
  "message": "Error description here"
}
```

| Status Code | Meaning |
|---|---|
| `400` | Bad Request (missing/invalid fields) |
| `404` | Resource Not Found |
| `500` | Internal Server Error |

---

## 📝 Book Schema

```js
{
  name:        String  // required
  author:      String  // required
  publishDate: String
  price:       Number  // min: 0
  createdAt:   Date    // auto-generated
  updatedAt:   Date    // auto-generated
}
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).