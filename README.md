# Project Name: ADVANCED TASKFLOW

## Project Context

The CTO requested an intuitive interface for team members and a dashboard for project managers to efficiently manage tasks, team members, and deadlines. The goal is to create an environment where team members can collaborate, track project progress, and meet deadlines using effective tools.

---

## Technologies Used

- **Backend**: Native PHP 8 (OOP) for the API.
- **Frontend**: 
  - **TypeScript** for type-safe JavaScript.
  - **Native HTML** for structure.
  - **TailwindCSS** for styling.
- **Database**: PostgreSQL for data persistence.
- **Development Environment**: Laragon for local PHP development.
- **Frontend Tooling**: Vite for fast frontend development.

---

## Structure

### Backend (PHP)

- **Controllers**: Handle user input and route actions.
- **Services**: Contain business logic (e.g., task creation, user assignments).
- **Models**: Represent data and interact with the database (e.g., Task, User, Role).
- **Database**: PostgreSQL database for storing tasks, users, and roles.

### Frontend (TypeScript + TailwindCSS)

- **Components**: Each component handles a specific part of the UI (e.g., task list, task form, login form).
- **Single-page application (SPA)**: Dynamic content loading without page reloads.
- **TailwindCSS**: Utility-first CSS framework for styling.

---

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** and **npm**: Installed for frontend development.
- **PostgreSQL**: Running instance for the database.
- **Laragon**: Installed and running for local PHP development.
- **Composer**: Installed for PHP dependency management.

---

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Youcode-Classe-E-2024-2025/TAHA-JAITI-PROJECT
    ```
2. Navigate to the project directory:
    ```sh
    cd TAHA-JAITI-PROJECT
    ```
3. Install frontend dependencies in the frontend folder:
    ```sh
    npm install
    ```
4. Install backend dependencies in the backend folder:
    ```sh
    composer install
    ```

---

## Configuration

### Backend Configuration

1. Open the `config.php` file located in `app/config/` and update the database credentials:
    ```php
    DB_HOST=localhost
    DB_PORT=5432 // 
    DB_USER=your_db_user
    DB_PASS=your_db_password
    DB_NAME=taskflow
    ```

2. Ensure your Laragon server is running on port `80` (default for Laragon).

### Frontend Configuration

1. Open the `vite.config.ts` file in the root of your project and update it to proxy API requests to the backend:
    ```typescript
    import { defineConfig } from 'vite';
    import tailwindcss from 'tailwindcss';
    import autoprefixer from 'autoprefixer';

    export default defineConfig({
      css: {
        postcss: {
          plugins: [
            tailwindcss,
            autoprefixer,
          ],
        },
      },
      server: {
        proxy: {
          '/api': {
            target: 'http://localhost:80', // Backend server (Laragon)
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
          },
        },
      },
    });
    ```

2. Ensure your frontend is running on port `5173` (default for Vite).

---

## Running the Project

1. Start the backend server using Laragon (ensure it's running on port `80`).
2. Start the frontend development server using Vite:
    ```sh
    npm run dev
    ```
3. Open your browser and navigate to `http://localhost:5173/`.

---

## Contributing

To contribute to TaskFlow, follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the original branch: `git push origin feature-branch`.
5. Create a pull request.

---

## License

This project is open source. Do WHAT YOU WANT!