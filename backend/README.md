Zoo Management API Backend
This document provides instructions on how to set up and run the backend server for the Zoo Management application. The server is built with Bun, Express, TypeScript, and MongoDB, and it includes features for managing animals and staff, with image uploads handled by Cloudinary.

Prerequisites
Before you begin, ensure you have the following installed on your system:

Bun: A fast JavaScript runtime, bundler, and package manager.

Node.js: Required for some package compatibility.

Git: For cloning the repository.

An active MongoDB Atlas account for the database.

An active Cloudinary account for image storage.

🚀 Getting Started
Follow these steps to get your backend server up and running.

1. Clone the Repository
First, clone the project repository to your local machine.

git clone <your-repository-url>
cd zoo-management/backend


2. Install Dependencies
Install all the necessary project dependencies using Bun.

bun install


3. Configure Environment Variables
You need to set up your environment variables to connect to the database and image storage services.

Create a new file named .env in the root of the backend directory.

Copy the contents of the .env.example file (if you have one) or use the template below.

Fill in the values with your credentials from MongoDB Atlas and Cloudinary.

.env file template:

# Server Configuration
PORT=PORT_NUMBER

# MongoDB Connection
# Get this from your MongoDB Atlas dashboard
DB_URL=mongodb+srv://<user>:<password>@<cluster-url>/<database-name>

# Cloudinary Credentials
# Get these from your Cloudinary dashboard
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret


4. Run the Server
Once your dependencies are installed and your environment variables are set, you can start the development server. The server will automatically restart whenever you make changes to the code.

bun run dev


If everything is set up correctly, you should see the following output in your terminal:

✅ Server is running on http://localhost:5000
MongoDB connected successfully


API Endpoints
The server provides the following RESTful API endpoints for managing zoo resources.

Health Check
GET /api/v1/health: Checks if the API server is running.

Animals 🐅
GET /api/v1/animals: Get a list of all animals.

POST /api/v1/animals: Create a new animal. Supports multipart/form-data for image uploads.

GET /api/v1/animals/:id: Get a single animal by its _id.

PUT /api/v1/animals/:id: Update an animal by its _id. Supports multipart/form-data for image uploads.

DELETE /api/v1/animals/:id: Delete an animal by its _id.

Staff 🧑‍⚕️
GET /api/v1/staff: Get a list of all staff members.

POST /api/v1/staff: Create a new staff member.

GET /api/v1/staff/:employeeId: Get a single staff member by their employeeId.

PUT /api/v1/staff/:employeeId: Update a staff member by their employeeId.

DELETE /api/v1/staff/:employeeId: Delete a staff member by their employeeId.

Visitors 👨‍👩‍👧‍👦
GET /api/v1/visitors: Get a list of all visitors.

POST /api/v1/visitors: Create a new visitor record.

GET /api/v1/visitors/:id: Get a single visitor by their _id.

PUT /api/v1/visitors/:id: Update a visitor by their _id.

DELETE /api/v1/visitors/:id: Delete a visitor by their _id.