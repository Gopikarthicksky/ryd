# Ride-Sharing App - RYD

This is a ride-sharing app built with React Native Web and django with help of Github copilot. The app allows users to create rides and view details of available rides.

## Features

- Create a new ride with source and destination
- View details of available rides
- Select a ride

## Installation

To install the app, follow these steps:

1. Clone the repository: `git clone https://github.com/Gopikarthicksky/ryd`
2. Navigate into the project directory: `cd ryd/ryd_frontend
3. Install the dependencies: `npm install`
4. Start frontend for the app : `npm start`
5. Start backend : `cd ryd/ryd python manage.py runserver
6. start db : `cd ryd/ryd/containers/mysql , docker-compose up

# Ryd - Your Personal Ride-Sharing App

Welcome to Ryd, a user-friendly ride-sharing app designed to make your daily commute easier and safer. Built with React Native Web and Django, R
yd offers a seamless experience across different platforms, allowing you to book a ride anytime, anywhere.

## Features

- **Easy Ride Booking:** Ryd allows you to book a ride in just a few taps. Simply enter your source and destination, and Ryd will do the rest.

- **Real-Time Tracking:** With Ryd, you can track your ride in real-time, giving you peace of mind and ensuring you always know when your ride will arrive.

- **Safety Tracking for Women:** At Ryd, we prioritize the safety of our users. Our safety tracking feature allows users to share their ride details with trusted contacts. In case of an emergency, an SOS button sends an immediate alert to these contacts along with the user's current location.

- **Ride History:** Keep track of all your past rides with our ride history feature. This makes it easy to rebook frequent trips or keep track of your ride expenses.

Join us on this journey and make your daily commute a breeze with Ryd!

### Create a Ride

Navigate to the "Create Ride" page, enter the source and destination of the ride, and click "Create Ride".

### View Ride Details

Navigate to the "Ride Details" page to view details of available rides.

### Select a Ride

Click on a ride to select it.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## API Documentation

Our API is documented using Swagger, an open-source tool for designing, building, and documenting RESTful APIs. The Swagger documentation provides a detailed description of each endpoint, including the HTTP method, parameters, request body, response body, and status codes. It also provides `curl` commands for each endpoint, which you can use to test the API from the command line.

You can access the Swagger documentation to understand the endpoints which is integrated into this app.

Figma link: https://www.figma.com/design/XAC7mhuCjvM2s5Pq8mP9df/RideShare?node-id=0-1&t=UCxux06YWBToPbNc-0
<img width="857" alt="frontend" src="https://github.com/sky-uk/ryd/assets/153262546/aead725e-acd4-4482-a420-91e61025033e">

Here's an example of how you can use a `curl` command from the Swagger documentation to test an endpoint:

```bash
POST /create_ride
curl --location 'http://127.0.0.1:8000/create_ride/' \
--form 'origin="Chennai Meenambakkam Airport"' \
--form 'destination="Comcast India Engineering Center"' \
--form 'passengers="3"' \
--form 'origin_latitude="12.993374"' \
--form 'origin_longitude="80.17258667"' \
--form 'destination_latitude="12.9469572"' \
--form 'destination_longitude="80.2313978"' \
--form 'departure_time="2024-05-30T10:30:00"' \
--form 'arrival_time="2024-05-30T10:30:00"' \
--form 'driver="123456"' \
--form 'vehicle_id="14"'

POST /available_rides
curl --location 'http://127.0.0.1:8000/available_rides/' \
--form 'origin_lat="12.99"' \
--form 'origin_lng="80.21"' \
--form 'destination_lat="12.94"' \
--form 'destination_lng="80.2313978"' \
--form 'departure_time="2024-05-30T10:30:00"'


/Signup
curl --location 'http://127.0.0.1:8000/signup/' \
--form 'name="test"' \
--form 'employee_id="123456"' \
--form 'email_id="test@email.com"' \
--form 'gender="M"' \
--form 'mobile_number="9876543210"' \
--form 'password="test"'





