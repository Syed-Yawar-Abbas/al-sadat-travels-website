# Al Sadat Travels & Carvan Imam Hussain - Project Analysis

## Project Overview
This is a full-stack travel booking web application for Al Sadat Travels offering services like flights, Ziyarat packages, hotels, and Umrah services. The application includes a public-facing website and an admin dashboard for managing travel services.

**Tech Stack:**
- **Backend:** Node.js with Express.js
- **Frontend:** Vanilla HTML5, CSS3, JavaScript
- **Database:** JSON files (flights.json, users.json, services.json)
- **Authentication:** bcryptjs for password hashing
- **Port:** 3000

---

## Project Structure

```
Al Sadat Travels & Carvan Imam Hussain/
├── Backend/
│   ├── server.js              # Express server with all API routes
│   ├── flights.json           # Sample flight data
│   ├── users.json             # User accounts (admin + regular users)
│   └── services.json          # All services (flights, groups, umrah, hotels, holidays, visas)
├── Frontend/
│   ├── index.html             # Landing page
│   ├── reg.html               # Login/Registration page
│   ├── admin.html             # Admin dashboard
│   ├── admin-new.html         # Alternative admin template
│   ├── script.js              # Main frontend logic
│   ├── admin.js               # Admin dashboard functionality (EMPTY)
│   └── style.css              # Global styles
├── Img/                       # Image assets
├── package.json               # Node dependencies
└── TODO.md                    # Project checklist (all completed)
```

---

## Key Components

### 1. Backend (Node.js/Express)

**File:** [Backend/server.js](Backend/server.js)

**Core Features:**
- **CORS & Body Parser Middleware:** Enables cross-origin requests and JSON parsing
- **JSON File Operations:** Reads/writes to flights.json, users.json, services.json
- **Authentication Routes:**
  - `POST /api/login` - Email-based login with bcrypt password verification
  - `POST /api/register` - User registration with password hashing

**Services Management:**
- `GET /api/services` - Get all services
- `GET /api/services/:type` - Get specific service type (flights, groups, umrah, hotels, holidays, visas)
- `POST /api/services/:type` - Add new service (admin only with token)
- `PUT /api/services/:type/:id` - Update service (admin only)
- `DELETE /api/services/:type/:id` - Delete service (admin only)

**Legacy Flight Routes:**
- `GET /api/flights` - Get flights from services.json
- `POST /api/flights` - Add flight (admin only)

**Security Issues Identified:**
- ⚠️ Simple token-based auth using hardcoded 'admin-token' string (not JWT)
- ⚠️ No token validation middleware on protected routes
- ⚠️ Passwords stored but not validated on registration

**Database Structure:**

**users.json:**
```json
{
  "id": number,
  "name": string,
  "email": string,
  "phone": string,
  "password": string (bcrypt hashed),
  "isAdmin": boolean
}
```

**flights.json:** Sample data with id, from, to, date, price

**services.json:**
```json
{
  "flights": [],
  "groups": [],
  "umrah": [],
  "hotels": [],
  "holidays": [],
  "visas": []
}
```

---

### 2. Frontend

#### Main Pages:

**index.html** - Landing Page
- Navigation bar with logo and menu links
- Hero section with image slider (5 slides)
- Booking panel with tabs for different service types
- "Book Now" button redirects to reg.html if not logged in
- References local image paths (hardcoded Windows paths - needs fixing)

**reg.html** - Login & Registration
- Split panel layout (left: company branding, right: forms)
- Toggle between login and registration forms
- API integration for login/register endpoints
- Form validation and styling

**admin.html** - Admin Dashboard
- Large file (1792 lines) with embedded CSS
- Sidebar navigation for different admin functions
- Dashboard components for managing services
- Professional UI with Font Awesome icons

#### JavaScript Files:

**script.js**
- Checks localStorage for user session
- Auto-redirects admin users to admin.html from index.html
- Modal management for login/register forms
- Book Now button event handler
- Currently incomplete - lacks API call implementations

**admin.js** - EMPTY FILE
- Should contain admin dashboard functionality
- Missing flight management, service CRUD operations
- No data display or form handling

#### Styling:

**style.css** - 898 lines
- Modern glass-morphism navbar with backdrop blur
- Responsive design with burger menu
- Hero section with image slider
- Booking panel styling
- Modal and form styles
- Color scheme: Primary #0c5a2a (green), Secondary #99bca8 (mint)

---

## Dependencies

**package.json:**
```json
{
  "bcryptjs": "^3.0.3",
  "body-parser": "^2.2.2",
  "cors": "^2.8.6",
  "express": "^5.2.1"
}
```

---

## Current User Accounts

**Admin Account:**
- Email: admin@sadat.com
- Password: Sadatsadmin015^% (bcrypt hashed)
- isAdmin: true

**Test User:**
- Email: user1@example.com
- Password: (same hash as admin)

**Additional User:**
- Email: syed.yawar.abbasx@gmail.com
- Phone: +923121930919

---

## Development Status

✅ **Completed:**
- Backend API setup with Express
- Database structure (JSON files)
- User authentication with bcryptjs
- Services management endpoints
- Admin dashboard HTML template
- Frontend registration page
- Navigation and UI styling
- TODO list items marked complete

❌ **Issues & Incomplete Features:**

1. **admin.js is Empty** - No admin functionality implemented
2. **Image Paths Broken** - index.html uses absolute Windows paths instead of relative paths
3. **API Integration Incomplete** - script.js doesn't fully implement API calls
4. **Security Concerns:**
   - Token-based auth using plain strings, not JWT
   - No input validation on API endpoints
   - No error handling for file I/O failures
5. **Database Limitations:**
   - JSON files not scalable for production
   - No backup mechanism
   - No transaction support
6. **Frontend Issues:**
   - Responsive design may need mobile testing
   - Admin dashboard not wired to backend
   - No loading states or error messages for API calls

---

## TODO - Recommended Fixes

### Priority 1 (Critical):
- [ ] Fix image paths in index.html (use relative paths, not absolute)
- [ ] Implement admin.js with full dashboard functionality
- [ ] Complete API integration in script.js
- [ ] Add JWT-based authentication instead of plain tokens
- [ ] Add input validation on backend endpoints

### Priority 2 (Important):
- [ ] Migrate to proper database (MongoDB, PostgreSQL)
- [ ] Add error handling and logging
- [ ] Implement loading states in frontend
- [ ] Add user session management
- [ ] Test mobile responsiveness

### Priority 3 (Enhancement):
- [ ] Add email verification for registration
- [ ] Implement payment gateway integration
- [ ] Add booking history for users
- [ ] Implement email notifications
- [ ] Add advanced search and filtering

---

## How to Run

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start Backend Server:**
   ```bash
   node Backend/server.js
   ```
   Server runs on `http://localhost:3000`

3. **Open Frontend:**
   Open `Frontend/index.html` in a browser

4. **Test Login:**
   - Use admin@sadat.com / Sadatsadmin015^%
   - Or create new account via registration

---

## API Endpoints Summary

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | /api/login | No | User login |
| POST | /api/register | No | User registration |
| GET | /api/services | No | Get all services |
| GET | /api/services/:type | No | Get service type |
| POST | /api/services/:type | Admin | Add service |
| PUT | /api/services/:type/:id | Admin | Update service |
| DELETE | /api/services/:type/:id | Admin | Delete service |
| GET | /api/flights | No | Get flights (legacy) |
| POST | /api/flights | Admin | Add flight (legacy) |

---

## Conclusion

This is a partially complete travel booking platform with solid frontend UI/UX but incomplete backend integration and admin functionality. The foundation is in place, but significant work remains to make it production-ready, including security hardening, proper database implementation, and full API integration.
