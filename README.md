# Real Estate Project

This project consists of a Django backend for handling real estate data and a React frontend for displaying the data. Below are the steps to set up and run the project.

## Prerequisites

Ensure you have the following installed:
- Python 3.x
- MySQL
- Node.js and npm

## Database Setup

1. **Create the MySQL database:**

    ```sql
    CREATE DATABASE estate CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    ```

## Project Setup

1. **Download and extract the project zip file.**
2. **Open the folder and open a terminal.**

## Crawldata Setup

1. Navigate to the `crawldata` directory and install the requirements:

    ```sh
    cd crawldata
    pip install -r requirements.txt
    ```

## Backend Setup

1. Navigate to the `backend` directory:

    ```sh
    cd ../backend
    ```

2. Create and activate a virtual environment:

    ```sh
    py -m venv venv
    venv\Scripts\activate
    ```

3. Install the backend requirements:

    ```sh
    pip install -r requirements.txt
    ```

4. Setup the database in `settings.py`:

    Open `backend/settings.py` and configure the database settings to connect to your MySQL database.
    

5. Apply database migrations:

    ```sh
    py manage.py migrate
    ```

6. Start the Django development server:

    ```sh
    py manage.py runserver
    ```

7. **Initialize the database:**

    Open your MySQL database and run the `init.sql` file to set up initial data.

    ```sh
    mysql -u <your_mysql_user> -p estate < path/to/init.sql
    ```

## Frontend Setup

1. Navigate to the `frontend` directory:

    ```sh
    cd ../frontend
    ```

2. Start the React frontend:

    ```sh
    npm install
    npm start
    ```

## Running the Project

1. Ensure the backend server is running:

    ```sh
    py manage.py runserver
    ```

2. Ensure the frontend server is running:

    ```sh
    npm start
    ```

3. Open your web browser and go to `http://localhost:3000` to view the project.


