# Project Name: ADVANCED TASKFLOW

## Project Context

The CTO requested an intuitive interface for team members and a dashboard for project managers to efficiently manage tasks, team members, and deadlines. The goal is to create an environment where team members can collaborate, track project progress, and meet deadlines using effective tools.

---

## User Stories

### As a Project Manager:
- **Manage Projects**: Create, edit, and delete projects to structure the team's work.
- **Manage Tasks**: Assign tasks to team members, categorize tasks, and tag tasks.
- **Track Progress**: Monitor task statuses to ensure project progress.

### As a Team Member:
- **Sign Up & Login**: Register with name, email, and password, and log in securely to view and update tasks.
- **Participate in Projects**: Access assigned projects, view tasks, and update task statuses.

### As a Guest User:
- **View Public Projects**: View public projects to discover team activities and potentially join teams or create projects.

---

## Technologies Used

- **PHP:** PHP 8 (OOP) For the back-end API (no frameworks, using native PHP).
- **JavaScript:** For dynamic front-end development, creating a single-page application (SPA).
- **PostgreSQL:** For data persistence.
- **Laragon:** A local development environment for PHP.
- **Vite** For front-end development

## Structure

### Backend (PHP)

- **Controllers:** Responsible for handling user input and routing actions.
- **Services:** Contains business logic (e.g., task creation, user assignments).
- **Models:** Represents the data and interactions with the database (e.g., Task, User, Role).
- **Database:** A PostgreSQL database for storing tasks, users, and roles.

### Frontend (JavaScript)

- **Components:** Each component handles a specific part of the UI (e.g., task list, task form, login form).
- **Single-page application (SPA):** Dynamic content loading without page reloads.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/).
- You have a running instance of [PostgreSQL](https://www.postgresql.org/).
- You have a running instance of Apache.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Youcode-Classe-E-2024-2025/TAHA-JAITI-PROJECT
    ```
2. Navigate to the project directory:
    ```sh
    cd TAHA-JAITI-PROJECT
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## Configuration

1. Go to `config.php` file located inside `app/config/`:
    ```env
    DB_HOST=localhost
    DB_PORT=PORT
    DB_USER=root
    DB_PASS=yourpassword
    DB_NAME=taskflow
    ```
2. Configure the .htaccess file to use the ports for your servers.

## Running the Project

1. Start the development server for the backend using Laravel.
2. Start the development server for the front end using Vite `npx vite public/`
3. Open your browser and navigate to `http://localhost:VITEPORT/`.

## Contributing

To contribute to TaskFlow, follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the original branch: `git push origin feature-branch`.
5. Create a pull request.

## License

This project is open source do WHAT YOU WANT!