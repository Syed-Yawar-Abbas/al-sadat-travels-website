# TODO List for Admin Panel and Backend Integration

## Backend Setup
- [x] Create Backend folder
- [x] Create Backend/server.js (Express server with routes for flights, auth, admin)
- [x] Create Backend/flights.json (initial flight data)
- [x] Create Backend/users.json (initial users including admin)
- [x] Install Node.js dependencies (express, body-parser, cors)
- [x] Install bcryptjs for password hashing
- [x] Update server.js to use bcryptjs for password hashing and email-based authentication

## Frontend Modifications
- [x] Edit Frontend/script.js to add API calls, authentication logic, login modal
- [x] Create Frontend/admin.html (hidden admin dashboard)
- [x] Create Frontend/admin.js (admin dashboard functionality)
- [x] Add CSS for modals and admin panel
- [x] Update reg.html to connect with backend API for login and registration
- [x] Update script.js to redirect to reg.html when "Book Now" is clicked without login
- [x] Implement role-based redirects (admin to admin.html, users to index.html)

## Dashboard Connection and Beautification
- [x] Fix API base URLs in script.js to match backend routes
- [x] Create admin.js with flight management functionality
- [x] Enhance admin.html with modern UI structure
- [x] Add professional CSS styles for admin dashboard
- [x] Implement displayFlights function in script.js
- [x] Ensure admin navbar link works correctly

## Authentication and Security
- [x] Set up admin credentials (admin@sadat.com / Sadatsadmin015^%) with bcrypt hashing
- [x] Implement email-based login instead of username
- [x] Add password hashing for user registration
- [x] Store user session in localStorage
- [x] Implement automatic redirects based on user role

## Testing and Integration
- [x] Run the backend server
- [x] Test frontend-backend connection
- [x] Test authentication (login/logout)
- [x] Test admin panel access and flight management
- [x] Test registration flow and user redirects
- [x] Test admin credentials and admin panel access
