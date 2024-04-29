# Node.js Express Sequelize Starter

This is a basic starter template for building a Node.js Express application with Sequelize ORM for database management and Jest with Supertest for testing.

## Features

-   RESTful API endpoints
-   User authentication with JWT
-   PostgreSQL database with Sequelize ORM
-   Unit and integration tests with Jest and Supertest

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/nishat65/pr-express-sql.git
    ```

2. **Install dependencies:**

    ```bash
    cd pr-express-sql
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory and define the following variables:

    ```plaintext
    PORT=3000
    DB_NAME=your_database_name
    DB_USER=your_database_user
    DB_PASS=your_database_password
    DB_HOST=localhost
    DB_PORT=5432
    JWT_SECRET=your_jwt_secret
    ```

4. **Run migrations:**

    ```bash
    npm run migrations --name <model_name>
    npm run migrate
    ```

## Usage

-   **Start the server:**

    ```bash
    npm start
    ```

-   **Run tests:**

    ```bash
    npm test
    ```

## API Endpoints

-   **POST /api/v1/auth/register**: Register a new user.

    ```json
    // Request Body
    {
        "username": "example",
        "password": "password",
        "email": "example@example.com"
    }
    ```

-   **POST /api/v1/auth/login**: Authenticate and log in a user.

    ```json
    // Request Body
    {
        "username": "example",
        "password": "password"
    }
    ```

-   **GET /api/v1/users/**: Get user details.

-   **PUT /api/v1/users/**: Update user details.

-   **DELETE /api/v1/users/**: Delete user
