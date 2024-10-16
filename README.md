
# SportsBookingApp

**SportsBookingApp** is a MERN stack project designed to facilitate booking management for a sports technology company. The application allows users to search for available courts, make bookings, and manage existing bookings, while administrators can manage courts and oversee bookings across multiple centers.

## Features

- **User Authentication**: Secure registration and login system with role-based access for both users and administrators.
- **Court Booking**: Users can search for available courts based on location, sport, date, and time, and book available courts.
- **Admin Management**: Admins can view all bookings, add new courts, delete existing bookings, and manage the operations for each center.
- **Booking Conflict Prevention**: Ensures no double booking of courts by validating time conflicts before confirming a booking.
- **Responsive Design**: Optimized for use across different devices, providing a smooth experience for both users and administrators.

## Technologies Used

- **MongoDB**: Database for managing users, courts, bookings, centers, and sports.
- **Express.js**: Backend framework to handle routing and APIs for bookings, courts, and authentication.
- **React**: Frontend framework to create a dynamic, responsive user interface.
- **Node.js**: Server environment to manage backend operations and API requests.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/SportsBookingApp.git
    cd SportsBookingApp
    ```

2. Install dependencies for both server and client:
    ```bash
    cd api
    npm install
    cd ../client
    npm install
    ```

3. Create a `.env` file in the `api` directory and add your environment variables:
    ```env
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

4. Run the development servers:
    ```bash
    cd api
    npm start
    cd ../client
    npm start
    ```

## Usage

- Access the client at `http://localhost:3000`
- Access the server at `http://localhost:5000`

## APIs

### User APIs
- **Signup**: `/api/auth/signup`  
  Register as a new user or admin.
  
- **Login**: `/api/auth/login`  
  Authenticate user and generate JWT token.

- **Get User Bookings**: `/api/bookings/mybookings`  
  Retrieve all bookings made by the logged-in user.

- **Get Available Courts**: `/api/courts/showcourt`  
  Get available courts based on date, time, and location.

- **Create Booking**: `/api/bookings/create`  
  Book a court after selecting the appropriate slot.

### Admin APIs
- **Get All Bookings**: `/api/admin/getBookings`  
  Retrieve all bookings for the selected center and sport.

- **Delete Booking**: `/api/admin/deleteBooking`  
  Delete an existing booking by its booking ID.

- **Create Court**: `/api/admin/createCourt`  
  Add a new court to a specific center and sport.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgements

- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
