# API Documentation - Lawyer Office SaaS

Complete API reference for the Lawyer Office SaaS backend.

## Base URL

```
http://localhost:5000/api
```

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Response Format

All responses follow this format:

**Success Response:**
```json
{
  "message": "Success message",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "message": "Error message",
  "errors": [ ... ]
}
```

---

## Authentication Endpoints

### Register User

Create a new user account.

**Endpoint:** `POST /api/auth/register`

**Authentication:** Not required

**Request Body:**
```json
{
  "name": "John Lawyer",
  "email": "john@lawfirm.com",
  "password": "password123",
  "role": "lawyer",
  "phone": "+1234567890",
  "barNumber": "BAR123456"
}
```

**Response:** `201 Created`
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Lawyer",
    "email": "john@lawfirm.com",
    "role": "lawyer"
  }
}
```

### Login User

Authenticate and receive JWT token.

**Endpoint:** `POST /api/auth/login`

**Authentication:** Not required

**Request Body:**
```json
{
  "email": "john@lawfirm.com",
  "password": "password123"
}
```

**Response:** `200 OK`
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Lawyer",
    "email": "john@lawfirm.com",
    "role": "lawyer"
  }
}
```

### Get Current User

Get authenticated user's profile.

**Endpoint:** `GET /api/auth/me`

**Authentication:** Required

**Response:** `200 OK`
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Lawyer",
    "email": "john@lawfirm.com",
    "role": "lawyer",
    "phone": "+1234567890",
    "barNumber": "BAR123456"
  }
}
```

---

## Client Endpoints

### Get All Clients

Retrieve list of all clients.

**Endpoint:** `GET /api/clients`

**Authentication:** Required

**Response:** `200 OK`
```json
{
  "clients": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "jane.doe@email.com",
      "phone": "+1234567890",
      "address": {
        "street": "123 Main St",
        "city": "New York",
        "state": "NY",
        "zipCode": "10001",
        "country": "USA"
      },
      "dateOfBirth": "1990-01-01T00:00:00.000Z",
      "idNumber": "ID123456",
      "notes": "Important client",
      "createdBy": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "John Lawyer",
        "email": "john@lawfirm.com"
      },
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "count": 1
}
```

### Get Single Client

Retrieve a specific client by ID.

**Endpoint:** `GET /api/clients/:id`

**Authentication:** Required

**Response:** `200 OK`
```json
{
  "client": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane.doe@email.com",
    "phone": "+1234567890",
    "address": { ... },
    "createdBy": { ... },
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Create Client

Create a new client.

**Endpoint:** `POST /api/clients`

**Authentication:** Required

**Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@email.com",
  "phone": "+1234567890",
  "dateOfBirth": "1990-01-01",
  "idNumber": "ID123456",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "notes": "Important client"
}
```

**Response:** `201 Created`
```json
{
  "message": "Client created successfully",
  "client": { ... }
}
```

### Update Client

Update an existing client.

**Endpoint:** `PUT /api/clients/:id`

**Authentication:** Required

**Request Body:** (same as create, all fields optional)

**Response:** `200 OK`
```json
{
  "message": "Client updated successfully",
  "client": { ... }
}
```

### Delete Client

Delete a client.

**Endpoint:** `DELETE /api/clients/:id`

**Authentication:** Required

**Response:** `200 OK`
```json
{
  "message": "Client deleted successfully"
}
```

---

## Case Endpoints

### Get All Cases

Retrieve list of all cases with optional filters.

**Endpoint:** `GET /api/cases`

**Authentication:** Required

**Query Parameters:**
- `status` - Filter by status (Open, In Progress, Closed, etc.)
- `caseType` - Filter by case type (Criminal, Civil, etc.)
- `priority` - Filter by priority (Low, Medium, High, Urgent)

**Example:** `GET /api/cases?status=Open&priority=High`

**Response:** `200 OK`
```json
{
  "cases": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "caseNumber": "CASE-2024-001",
      "title": "Doe vs. Company",
      "description": "Civil litigation case",
      "client": {
        "_id": "507f1f77bcf86cd799439012",
        "firstName": "Jane",
        "lastName": "Doe",
        "email": "jane.doe@email.com",
        "phone": "+1234567890"
      },
      "assignedLawyer": {
        "_id": "507f1f77bcf86cd799439013",
        "name": "John Lawyer",
        "email": "john@lawfirm.com"
      },
      "caseType": "Civil",
      "status": "Open",
      "priority": "High",
      "courtName": "Supreme Court",
      "judgeAssigned": "Judge Smith",
      "filingDate": "2024-01-15T00:00:00.000Z",
      "nextHearingDate": "2024-02-15T00:00:00.000Z",
      "billingAmount": 50000,
      "documents": [],
      "notes": [],
      "createdBy": { ... },
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "count": 1
}
```

### Get Single Case

Retrieve a specific case by ID with full details.

**Endpoint:** `GET /api/cases/:id`

**Authentication:** Required

**Response:** `200 OK`
```json
{
  "case": {
    "_id": "507f1f77bcf86cd799439011",
    "caseNumber": "CASE-2024-001",
    "title": "Doe vs. Company",
    "description": "Civil litigation case",
    "client": { ... },
    "assignedLawyer": { ... },
    "caseType": "Civil",
    "status": "Open",
    "priority": "High",
    "notes": [
      {
        "content": "Initial consultation completed",
        "addedBy": {
          "_id": "507f1f77bcf86cd799439013",
          "name": "John Lawyer"
        },
        "addedAt": "2024-01-02T00:00:00.000Z"
      }
    ],
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Create Case

Create a new case.

**Endpoint:** `POST /api/cases`

**Authentication:** Required

**Request Body:**
```json
{
  "caseNumber": "CASE-2024-001",
  "title": "Doe vs. Company",
  "description": "Civil litigation case regarding contract dispute",
  "client": "507f1f77bcf86cd799439012",
  "caseType": "Civil",
  "status": "Open",
  "priority": "High",
  "courtName": "Supreme Court",
  "judgeAssigned": "Judge Smith",
  "filingDate": "2024-01-15",
  "nextHearingDate": "2024-02-15",
  "billingAmount": 50000
}
```

**Required Fields:**
- caseNumber (must be unique)
- title
- description
- client (client ID)
- caseType

**Response:** `201 Created`
```json
{
  "message": "Case created successfully",
  "case": { ... }
}
```

### Update Case

Update an existing case.

**Endpoint:** `PUT /api/cases/:id`

**Authentication:** Required

**Request Body:** (same as create, all fields optional)

**Response:** `200 OK`
```json
{
  "message": "Case updated successfully",
  "case": { ... }
}
```

### Add Note to Case

Add a note to a specific case.

**Endpoint:** `POST /api/cases/:id/notes`

**Authentication:** Required

**Request Body:**
```json
{
  "content": "Met with client, discussed strategy"
}
```

**Response:** `200 OK`
```json
{
  "message": "Note added successfully",
  "case": { ... }
}
```

### Delete Case

Delete a case.

**Endpoint:** `DELETE /api/cases/:id`

**Authentication:** Required

**Response:** `200 OK`
```json
{
  "message": "Case deleted successfully"
}
```

### Get Case Statistics

Get overview statistics for all cases.

**Endpoint:** `GET /api/cases/stats/overview`

**Authentication:** Required

**Response:** `200 OK`
```json
{
  "totalCases": 50,
  "openCases": 15,
  "inProgressCases": 20,
  "closedCases": 15,
  "casesByType": [
    { "_id": "Civil", "count": 25 },
    { "_id": "Criminal", "count": 15 },
    { "_id": "Family", "count": 10 }
  ],
  "casesByPriority": [
    { "_id": "High", "count": 20 },
    { "_id": "Medium", "count": 20 },
    { "_id": "Low", "count": 10 }
  ]
}
```

---

## Data Models

### User
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: Enum ['admin', 'lawyer', 'paralegal'],
  phone: String,
  barNumber: String,
  createdAt: Date
}
```

### Client
```javascript
{
  firstName: String (required),
  lastName: String (required),
  email: String (required),
  phone: String (required),
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  dateOfBirth: Date,
  idNumber: String,
  notes: String,
  createdBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### Case
```javascript
{
  caseNumber: String (required, unique),
  title: String (required),
  description: String (required),
  client: ObjectId (ref: Client, required),
  assignedLawyer: ObjectId (ref: User, required),
  caseType: Enum (required),
  status: Enum,
  priority: Enum,
  courtName: String,
  judgeAssigned: String,
  filingDate: Date,
  nextHearingDate: Date,
  closingDate: Date,
  billingAmount: Number,
  documents: Array,
  notes: Array [{
    content: String,
    addedBy: ObjectId (ref: User),
    addedAt: Date
  }],
  createdBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

---

## Error Codes

| Status Code | Description |
|------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (invalid/missing token) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Not Found |
| 500 | Server Error |

---

## Rate Limiting

Currently no rate limiting is implemented. Consider adding rate limiting for production.

## CORS

CORS is enabled for all origins in development. Configure appropriately for production.

---

**Last Updated:** 2024-01-01
