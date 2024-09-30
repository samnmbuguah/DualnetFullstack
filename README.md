# Dualnet Full Stack Application

This README provides instructions for setting up the development environment for the Dualnet full stack application.

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- PostgreSQL (v12 or later)
- Gate.io account for API keys and secrets

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/Soundmoney254/DualnetFullstack.git
   cd DualnetFullstack
   ```

2. Install dependencies:
   ```
   npm install
   cd Frontend && npm install
   cd ../Backend && npm install
   cd ..
   ```

3. Set up PostgreSQL database:
   - Create a new database for the application
   - Note down the database name, username, password, host, and port

4. Create a Gate.io account and obtain API keys:
   - Sign up for a Gate.io account if you don't have one
   - Generate API keys and secrets from your Gate.io account settings

5. Create a `.env` file in the root directory with the following variables:
   ```
   # Common
   ENVIRONMENT=development
   API_KEY=your_gate_io_api_key
   API_SECRET=your_gate_io_api_secret
   REFRESH_TOKEN_SECRET=825y8i3hnfjmsbv7gwajbl7fobqrjfvbs7gbfj2q3bgh8f42
   ACCESS_TOKEN_SECRET=jsfgfjguwrg8783wgbjs849h2fu3cnsvh8wyr8fhwfvi2g225

   # Development
   DEV_DB_NAME=your_database_name
   DEV_DB_USER=your_database_user
   DEV_DB_PASSWORD=your_database_password
   DEV_DB_HOST=localhost
   DEV_DB_PORT=5432
   PORT=3042

   # Production (can be the same as development for local setup)
   PROD_DB_NAME=your_database_name
   PROD_DB_USER=your_database_user
   PROD_DB_PASSWORD=your_database_password
   PROD_DB_HOST=localhost
   PROD_DB_PORT=5432
   ```
   Replace the placeholders with your actual database details and Gate.io API credentials.

## Running the Application

1. Create database tables:
   ```
   npm run createTables
   ```

2. Start the backend server:
   ```
   npm run dev
   ```

3. In a new terminal, start the frontend React application:
   ```
   npm run startReact
   ```

The backend server should now be running on `http://localhost:3042` and the frontend on `http://localhost:3000`.

## Additional Scripts

You can find more useful scripts in the `package.json` file. Some notable ones include:

- `npm run populateTables`: Populate the database with initial data
- `npm run testdb`: Test the database connection
- `npm run fetchPairs`: Fetch trading pairs from Gate.io
- `npm run balanceAccounts`: Balance accounts between spot and futures

Refer to the `package.json` file for a complete list of available scripts.

## Development

During development, you can use `npm run dev` for the backend and `npm run startReact` for the frontend. These commands will start the servers with hot-reloading enabled.

## Troubleshooting

If you encounter any issues during setup or running the application, please check the following:

1. Ensure all environment variables in the `.env` file are correctly set
2. Verify that PostgreSQL is running and accessible
3. Check that you have the correct permissions for the database user
4. Ensure your Gate.io API keys are valid and have the necessary permissions

If problems persist, please open an issue in the GitHub repository.