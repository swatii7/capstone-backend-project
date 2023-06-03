
# Hi, I'm Swati Chaudhary! 👋

I am Full stack Intern at Almabetter and this is my second project, on Book My Show
# Book MyShow


This online platform makes it super easy to book movie tickets. It's designed to be user-friendly and hassle-free, allowing you to easily browse, choose, and buy tickets for movies. With BookMyShow, you can book your preferred movie, select the perfect time slot, and reserve your seats. Plus, you'll get all the important details about each movie, such as show timings and available seats.


## Installation

If you want to work on this project , clone this repo

```bash
git clone "https://github.com/swatii7/capstone-backend-project.git"

```

Open this project on your local IDE and in the terminal do this commands one by one

 - For Frontend

 ```
 cd client
 npm install
 npm start

```

- For backend

```
cd src
npm install
npm start
```
In the backend you should connect with database server.
 This will start you frontend part on port - http://localhost:3000 and backend part running on port- http://localhost:8080 





## API Reference

Base URL
```https
https://capstone-project-1wft.onrender.com
```

Booking

- get booking
```http
  GET /api/bookings
```

- post booking
Returns a list of all bookings stored in the database in JSON format.

```http
  POST /api/bookings
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `movie`    | `string` | **Required**. selected movie |
| `timeSlot`    | `string` | **Required**. selected time slot |
| `seats`    | `string` | **Required**. selected seats |


Returns the newly created booking in JSON format


## Deployment
Here is the links of deployed project

- For Frontend

```https
https://bookmyshow11.netlify.app/

```

- For Backend

```https
https://capstone-project-1wft.onrender.com/api/bookings

```

By clicking on above links , you can see the project


## How to Use


1. click on below link


```https
[bookmyshowApp](https://bookmyshow11.netlify.app/)

```
2. select the movie you would like to watch.
3. select timeslot .
4. select any seat type and and number of seats would you like to booked.
5. click on ```Book Now``` button. If you want to change any selected field, then do changes before booking it.

After click on Book Now button you got succesfull booking message and ypur last booking details display on the screen under last booking details heading.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

Note : your mongodb clustur connect key
`API_KEY`

# For Backend

- MongoDb live connection string

`MONGODBURI: mongodb+srv://<user_name>:<password>@mongodb_connection_string/database_name`

- MongoDb local connection string (if you set application on localhost)

`MONGODBURI = mongodb://localhost:27017/<database_name> `

`COLLECTION_NAME = <collection_name>`

- if application is running on localhost set node_env development
or if it is on live set production
`NODE_ENV =  development (development || production)`

`APP_PORT = 8080 `

- api routes path

`GET_REQUEST = /api/booking`
`POST_REQUEST = /api/booking`

# For Frontend

`REACT_APP_API_LOCAL_PATH = http://localhost:3000`

`REACT_APP_API_LIVE_PATH = https://capstone-project-1wft.onrender.com`

## Tech Stack

**Client:** React js, Bootstrap

**Server:** Node, Express

**database:** MongoDB

