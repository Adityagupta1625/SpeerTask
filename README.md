# Speer Notes App


## Technologies Used

- **Node.js**: A JavaScript runtime for building scalable network applications.
- **TypeScript**: A superset of JavaScript that adds static types to the language.
- **Express.js**: A minimal and flexible Node.js web application framework.
- **MongoDB**: A NoSQL database for storing and retrieving data.
- **Yarn**: A fast, reliable, and secure package manager for Node.js.

## Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/try/download/community) (or use a cloud-based MongoDB service)

## Getting Started

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Adityagupta1625/SpeerTask.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd your-project
    ```

3. **Install dependencies using Yarn:**

    ```bash
    yarn
    ```

4. **Create a `.env` file:**

    Create a `.env` file in the root of your project and add the following:

    ```env
    PORT=8000
    MONGO_URI=mongodb://localhost:27017/your-database
    SECRET_KEY=your-secret-key
    ```

    - Replace `your-database` with your MongoDB database name.
    - Set up your MongoDB URI. If you are using a cloud-based service, replace the `localhost:27017` part with your MongoDB connection string.


5. **Run the application in development:**

    ```bash
    yarn dev
    ```

    The application will be running at `http://localhost:8000`.

## MongoDB Setup

1. **Install MongoDB:**

    Download and install MongoDB from [here](https://www.mongodb.com/try/download/community) if you haven't already.

2. **Start MongoDB:**

    Follow the instructions for your operating system to start the MongoDB server.

3. **Create a Database:**

    Use the MongoDB shell or a GUI tool to create a new database. Example using the MongoDB shell:

    ```bash
    mongo
    use your-database
    ```

    Replace `your-database` with your desired database name.

## Scripts

- `yarn start`: Start the application.
- `yarn lint`:  Automatically fix linting issues.
- `yarn dev`: Start the application in development mode
- `yarn format`: Runs Preitier to clean the code formatting
- `yarn test`: Run all test cases

## API Documentation

Visit `http://localhost:8000/api/docs` for API documentation (powered by Swagger).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
