# 🦁 Zoo Management System 🦒

This is a full-stack web application designed to streamline the management of a zoo. It provides a comprehensive suite of tools for staff to manage animals, visitors, and ticketing, ensuring the smooth and efficient operation of the zoo.

---

## 🐅 Features

* **Animal Management**: Keep detailed records of all animals, including their species, date of birth, health status, and enclosure details.
* **Staff Management**: Manage staff information, roles, and schedules to ensure the zoo is always well-staffed.
* **Visitor Tracking**: Monitor visitor information and visiting history.
* **Ticketing System**: A complete ticketing system to manage the issuance and tracking of tickets.
* **Dashboard & Analytics**: An intuitive dashboard provides at-a-glance statistics about the zoo's operations, including visitor numbers, animal counts, and staff distribution.

---

## ✨ Tech Stack

### Backend

* **Runtime**: Bun
* **Framework**: Express.js
* **Language**: TypeScript
* **Database**: MongoDB (with Mongoose)
* **Image Storage**: Cloudinary

### Frontend

* **Framework**: React
* **Language**: TypeScript
* **Bundler**: Vite
* **Styling**: Tailwind CSS
* **UI Components**: Shadcn UI

---

## 🚀 Getting Started

### Prerequisites

* Bun
* Node.js
* Git
* MongoDB Atlas account
* Cloudinary account

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd zoo-management
    ```

2.  **Backend Setup:**
    * Navigate to the backend directory:
        ```bash
        cd backend
        ```
    * Install dependencies:
        ```bash
        bun install
        ```
    * Create a `.env` file and add the following environment variables. You can use the `.env.example` file as a template.
        ```
        PORT=5000
        DB_URL=<your-mongodb-atlas-connection-string>
        CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
        CLOUDINARY_API_KEY=<your-cloudinary-api-key>
        CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
        ```
    * Start the development server:
        ```bash
        bun run dev
        ```

3.  **Frontend Setup:**
    * Navigate to the frontend directory:
        ```bash
        cd ../frontend
        ```
    * Install dependencies:
        ```bash
        npm install
        ```
    * Start the development server:
        ```bash
        npm run dev
        ```

---

##  📂 Zoo Management Project Structure

```bash
zoo-management/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── ...
│   └── ...
└── frontend/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── hooks/
    │   ├── pages/
    │   └── ...
    └── ...
```
---

## API Endpoints

The backend provides the following RESTful API endpoints:

### Health Check

* **GET** `/api/v1/health`: Checks if the API server is running.

### Animals 🐅

* **GET** `/api/v1/animals`: Get a list of all animals.
* **POST** `/api/v1/animals`: Create a new animal.
* **GET** `/api/v1/animals/:id`: Get a single animal by its `_id`.
* **PUT** `/api/v1/animals/:id`: Update an animal by its `_id`.
* **DELETE** `/api/v1/animals/:id`: Delete an animal by its `_id`.

### Staff 🧑‍⚕️

* **GET** `/api/v1/staff`: Get a list of all staff members.
* **POST** `/api/v1/staff`: Create a new staff member.
* **GET** `/api/v1/staff/:employeeId`: Get a single staff member by their `employeeId`.
* **PUT** `/api/v1/staff/:employeeId`: Update a staff member by their `employeeId`.
* **DELETE** `/api/v1/staff/:employeeId`: Delete a staff member by their `employeeId`.

### Visitors 👨‍👩‍👧‍👦

* **GET** `/api/v1/visitors`: Get a list of all visitors.
* **POST** `/api/v1/visitors`: Create a new visitor record.
* **GET** `/api/v1/visitors/:id`: Get a single visitor by their `_id`.
* **PUT** `/api/v1/visitors/:id`: Update a visitor by their `_id`.
* **DELETE** `/api/v1/visitors/:id`: Delete a visitor by their `_id`.

### Tickets 🎟️

* **GET** `/api/v1/tickets`: Get a list of all tickets.
* **POST** `/api/v1/tickets`: Create a new ticket.
* **GET** `/api/v1/tickets/:id`: Get a single ticket by its `_id`.
* **PATCH** `/api/v1/tickets/:id`: Update a ticket by its `_id`.
