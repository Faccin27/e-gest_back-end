# e-Gest - Back-end

<img src="./public/images/home.png" alt="Homepage" width="600"/>

**e-Gest - Back-end** is the server-side of the management system aimed at efficiently handling people and addresses. This repository contains the API that manages business logic, data manipulation, and integration with the MySQL database.

## Features

- **User Authentication**: Implements endpoints for user login and registration.
- **User Management**: Endpoints to create, update, view, and delete users.
- **User Search**: Functionality to search for users by CPF.
- **Address Management**: Endpoints to create, update, and view addresses associated with users.

## Technologies Used

- **Node.js**: JavaScript runtime environment for the server.
- **Fastify**: Framework for building fast and efficient APIs.
- **Prisma**: ORM to interact with the MySQL database.
- **MySQL**: Relational database to store system data.

## Project Setup

1. Clone this repository:

   ```bash
   git clone https://github.com/Faccin27/e-gest_back-end.git

   ```

2. Navigate to the project directory:


   ```bash
   cd e-gest_back-end
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Set up the environment variables. Create a .env file in the project root and add the required settings as shown in the .env.example provided in the project.

5. Run the migrations to set up the database:

   ```bash
   npx prisma migrate deploy
   ```

6. Start the server:

   ```bash
   npm start
   ```

## Contributions

Contributions are welcome! Feel free to open a PR or report issues.


## Front-end Repository


You can access the front-end repository of the project [here](https://github.com/Faccin27/e-gest_front-end).
