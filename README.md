<p align="center">
  <img src="client/public/netcom-imagotipo.png" alt="Netcom Tickets Banner" width="400"/>
</p>

<h1 align="center">Netcom Tickets</h1>

<p align="center">
  A full-stack helpdesk and ticket management system with SLA tracking, Kanban boards, role-based access, and real-time analytics. Built with React, Material UI, PHP, and MySQL.
  <br/>
<strong>Web Application Development I Final Project</strong> Universidad Técnica Nacional
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.1-61DAFB?logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/MUI-7.3-007FFF?logo=mui&logoColor=white" alt="MUI"/>
  <img src="https://img.shields.io/badge/Vite-7.1-646CFF?logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/PHP-7+-777BB4?logo=php&logoColor=white" alt="PHP"/>
  <img src="https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql&logoColor=white" alt="MySQL"/>
  <img src="https://img.shields.io/badge/JWT-Auth-000000?logo=jsonwebtokens&logoColor=white" alt="JWT"/>
  <img src="https://img.shields.io/badge/i18n-EN%20%7C%20ES-green" alt="i18n"/>
</p>

---

## About

Netcom Tickets is a comprehensive helpdesk and IT ticket management system designed to streamline support operations across organizations. It covers the entire ticket lifecycle, from creation and assignment through SLA monitoring and resolution, with role-based access for administrators, technicians, and clients. The system features a Kanban board for visual workflow management, a full analytics dashboard with Chart.js reports, real-time notifications, internationalization (English/Spanish), and configurable SLA policies per category and priority.

This project was developed as the final assignment for the Web Application Development I course, demonstrating skills in modern frontend development with React, RESTful API design with PHP, relational database architecture, JWT authentication, and responsive UI/UX with Material Design.

## Features

- **JWT authentication**: Secure login system with token-based session management and password recovery via email
- **Three user roles:**
  - **Administrator**: Full system access, manage users, categories, SLAs, labels, specialties, and view all reports
  - **Technician**: Work assigned tickets, update statuses, add timeline entries, track personal workload
  - **Client**: Create tickets, track status, provide feedback with star ratings on resolved tickets
- **Ticket lifecycle management**: Full CRUD with status workflow, Pending -> Assigned -> In Progress -> Resolved -> Closed
- **Dual view modes**: Kanban board (drag-style visual cards) and data table with sorting, pagination, and dynamic column filtering
- **SLA compliance tracking**: Two-tier SLA monitoring (response time + resolution time) with color-coded indicators: 🟢 On Time, 🟡 Near Expiry, 🔴 Breached
- **Week calendar view**: Visual technician workload calendar with ISO week selection
- **Analytics dashboard**: Six interactive Chart.js reports: tickets by month, SLA response/resolution compliance, technician rankings, category breaches, and customer ratings
- **Notification system**: Real-time notifications for ticket creation, assignment, status changes, and timeline updates with read/unread tracking
- **Timeline & audit trail**: Full conversation history per ticket with subject, description, status transitions, and file attachments
- **File attachment support**: Multi-file upload with image previews and gallery dialog
- **Smart auto-assignment**: Automatic technician matching based on specialty, availability, and current workload
- **Category configuration**: Nested management of categories -> labels, specialties, and SLA rules
- **Internationalization**: Full i18n support for English 🇺🇸 and Spanish 🇪🇸 with browser auto-detection
- **Customer feedback**: One-time star rating (1–5) and comment submission for resolved tickets
- **Responsive Material Design**: Professional UI built with MUI 7 and custom theming

## Tech Stack

| Layer          | Technology                            |
| -------------- | ------------------------------------- |
| Frontend       | React 19.1 with React Router 7.9      |
| UI Framework   | Material UI (MUI) 7.3 + Emotion       |
| Forms          | React Hook Form 7.65 + Yup validation |
| Charts         | Chart.js 4.5 + React-ChartJS-2        |
| HTTP Client    | Axios 1.12                            |
| i18n           | i18next 25.6 + react-i18next          |
| Date Handling  | Day.js 1.11 + MUI Date Pickers 8.15   |
| Notifications  | React Hot Toast 2.6                   |
| Build Tool     | Vite 7.1 with SWC                     |
| Code Quality   | ESLint 9 + Prettier                   |
| Backend        | PHP 7+ (custom MVC framework)         |
| Database       | MySQL / MariaDB                       |
| Authentication | Firebase PHP-JWT 6.11                 |
| Email          | PHPMailer 6.9                         |
| Logging        | PSR-3 Logger                          |

## Architecture

The project follows a decoupled client-server architecture with a React SPA frontend and a PHP REST API backend:

```
Netcom/
├── client/                        # React SPA (Vite)
│   └── src/
│       ├── components/            # Reusable UI: Form, Table, Kanban, Dialogs, Uploaders
│       │   ├── managers/          # CRUD manager components per entity
│       │   └── user/              # Auth, login, logout, user context
│       ├── views/                 # Page-level views
│       │   ├── category/          # Category CRUD pages
│       │   ├── ticket/            # Ticket CRUD pages
│       │   ├── user/              # User CRUD pages
│       │   ├── graphics/          # Dashboard + 6 report charts
│       │   └── layout/            # Header, Footer, Layout wrapper
│       ├── services/              # API service layer (Axios)
│       ├── validations/           # Yup validation schemas
│       ├── contexts/              # React Context (user state)
│       ├── i18n/                  # Internationalization (EN / ES)
│       ├── themes/                # MUI custom theme
│       └── utils/                 # SLA calculator, date utilities
│
├── controllers/                   # PHP controllers (REST endpoints)
│   └── core/                      # Framework core: DB, Request, Response, Logger
├── models/                        # PHP data access models
├── routes/                        # Convention-based auto-router
├── database/                      # SQL scripts & backups
├── composer.json                  # PHP dependencies
└── index.php                      # API entry point (CORS, autoloading, routing)
```

**Key architectural decisions:**

| Concept             | Implementation                                                                 |
| ------------------- | ------------------------------------------------------------------------------ |
| **Auto-routing**    | Convention-based: URL kebab-case maps to PascalCase controller classes         |
| **Service layer**   | Frontend Axios services abstract all API calls per entity                      |
| **Manager pattern** | Reusable CRUD dialog components for each entity (ticket, user, category, etc.) |
| **Context API**     | Global user state via `UserProvider` with JWT decode                           |
| **Validation**      | Centralized Yup schemas shared across forms                                    |
| **SLA engine**      | Client-side SLA calculator with color-coded status thresholds                  |
| **Soft deletes**    | `is_active` flag on all tables instead of permanent deletion                   |

## Database Schema

The MySQL database (`netcom`) includes the following tables:

`role` · `user` · `notification` · `category` · `status` · `priority` · `ticket_label` · `ticket` · `user_ticket` · `special_field` · `user_special_field` · `sla` · `timeline` · `ticket_attachment`

**Entity relationships:**

```
role ──< user ──< user_ticket >── ticket
                  user ──< user_special_field >── special_field >── category
                  user ──< notification
                  user ──< timeline >── ticket
                                        timeline ──< ticket_attachment
         category ──< ticket_label
         category ──< sla >── priority
         ticket ──< status, category, priority, ticket_label
```

The full creation and seed script is available in [`database/netcom_db_querry.sql`](database/netcom_db_querry.sql).

## Prerequisites

- **Node.js** 18+ and npm
- **PHP** 7.4+ with Composer
- **MySQL** 8.0+ or MariaDB
- **Apache** or any PHP-compatible web server (e.g., XAMPP, WAMP, Laragon)

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/AndresBol/Netcom_AndresBV_119090051.git
   cd Netcom
   ```

2. **Set up the database**
   - Open MySQL Workbench or your preferred client
   - Create a database named `netcom`
   - Execute the script [`database/netcom_db_querry.sql`](database/netcom_db_querry.sql) to create all tables and seed data

3. **Configure the backend**
   - Install PHP dependencies:
     ```bash
     composer install
     ```
   - Update database credentials in `config.php` if needed:
     ```php
     return [
         'DB_USERNAME' => 'root',
         'DB_PASSWORD' => 'your_password',
         'DB_HOST'     => 'localhost',
         'DB_DBNAME'   => 'netcom',
     ];
     ```
   - Point your web server (Apache) to the project root on port `81`, making the API accessible at `http://localhost:81/netcom`

4. **Set up the frontend**

   ```bash
   cd client
   npm install
   npm run start
   ```

   The React app will launch at `http://localhost:5173`

5. **Access the application**
   - Open `http://localhost:5173` in your browser
   - Log in with the credentials below

## Login Credentials

| Role          | Email                    | Password   |
| ------------- | ------------------------ | ---------- |
| Administrator | `juan.garcia@Netcom.com` | `admin123` |

> All user passwords can be changed through the built-in forgot password process.

## Reports & Analytics

The dashboard provides six interactive reports built with Chart.js:

| Report                        | Description                                       |
| ----------------------------- | ------------------------------------------------- |
| **Tickets by Month**          | Monthly ticket volume trends (bar chart)          |
| **SLA Response Compliance**   | Response time adherence across categories         |
| **SLA Resolution Compliance** | Resolution time adherence across categories       |
| **Technician Rankings**       | Top technicians by resolved ticket count          |
| **Category Breaches**         | SLA breach distribution across ticket categories  |
| **Customer Ratings**          | Average satisfaction ratings from client feedback |

## Authors

- **Andrés Bolaños** Student ID: 119090051
- **Josué Calderón** Student ID: 207770303

Universidad Técnica Nacional (UTN)

---

<p align="center">
  <sub>Built with React &amp; PHP as an academic project - 2025</sub>
</p>
