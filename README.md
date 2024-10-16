
# ROll NO IIT2021124(GOKUL UPPAL)
##Deploy:
-**Frontend**:https://frontend1-jf90.onrender.com/

-**Backend**:https://backend1-aiuj.onrender.com

# SportsBookingApp

**SportsBookingApp** is a MERN stack project designed to facilitate booking management for a sports technology company. The application allows users to search for available courts, make bookings, and manage existing bookings, while administrators can manage courts and oversee bookings across multiple centers.

## Features

- **User Authentication**: Secure registration and login system with role-based access for both users and administrators.

- **Court Booking**: Users can search for available courts based on location, sport, date, and time, and book available courts.

- **Admin Management**: Admins can view all bookings, add new courts, delete existing bookings.

- **Booking Conflict Prevention**: Ensures no double booking of courts by validating time conflicts before confirming a booking.

- **Responsive Design**: Optimized for use across different devices, providing a smooth experience for both users and administrators.

- **Functionality for Users**:
Users can search for available courts based on centres, sport, date, and time slots, and book available courts.
Users can only select centers that are available in the database.
After selecting a center, users will only see sports that are offered at that specific center.

## Technologies Used

- **MongoDB**: Database for managing users, courts, bookings, centers, and sports.
- **Express.js**: Backend framework to handle routing and APIs for bookings, courts, and authentication.
- **React (with Vite)**: Frontend framework to create a dynamic, responsive user interface, using Vite for faster builds and development.
- **Tailwind CSS**: Utility-first CSS framework for building modern, responsive designs.
- **Node.js**: Server environment to manage backend operations and API requests.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/g0kuluppal08/Booking-App
    cd SportsBookingApp
    ```

2. Install dependencies for both server and client:
    ```bash
    cd ./Backend
    npm install
    cd ./Frontend
    npm install
    ```

3. Create a `.env` file in the `Backend` directory and add your environment variables:
    ```env
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    PORT
    FRONT_END_URL
    ```

4. Run the development servers:
    ```bash
    cd ./Backend
    node index.js
    cd ./Frontend
    npm run dev
    ```

## Usage

- Access the Frontend `http://localhost:5173`
- Access the server at `http://localhost:3030`

## APIs

### User Route
- **Signup**: `/signup`  
  Register as a new user.
  
- **Login**: `/signin`  
  Authentication Admin and generate JWT token and user role that we use to navigate into user page

- **Create Booking**: `/user/userbookings`
  Here user can made there bookings based on the availablity of court in a specific centre for a specific sport at a Time.

-- **My Bookings**:`/user/mybookings`
  user can view all the bookings made by him on this route

### Admin Routes
  **Login** `/signin`
  Authentication Admin and generate JWT token and admin role that we use to navigate into admin page
  **Show Bookings** `/admin/showallbookings`
  Admin can view all bookings made by all users and also have the access to delete them.
  **Add Court** `/admin/addNewCourt`
  Here Admin can add court for a particular centre and for a sport that is played in that centre also he can set price and court name.

  ### Credential
  **Admin** 
  Email:Gokul@gmail.com
  Password:123456

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.


## Acknowledgements

- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
