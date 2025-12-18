RBAC Backend Project – Key Points
Built a secure backend system using Node.js, Express, MongoDB, and JWT.
Implemented user signup and signin with JWT-based authentication.
Created Role-Based Access Control (RBAC) using middleware:
userauth → checks if the user is logged in.
roleauth → checks if the user has the required role for the route.
Defined three roles:
user → default role for all new users.
moderator → limited access (example route for testing).
admin → full access and can assign roles to others.
Developed admin-only route to assign/update user roles safely.
Implemented role validation to prevent invalid role assignment.
Handled errors gracefully using try-catch, including:
Invalid role (400)
User not found (404)
Internal server errors (500)
Used MongoDB with Mongoose for database operations.
Created a clean folder structure separating routes, middleware, and DB config.
Tested RBAC flow using Postman: ensured only users with correct roles can access protected routes.
Designed project to be scalable: more roles and resources can be added later.
