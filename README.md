# Car rental app

A web app which simulates car rental. The project was built using Express and SQLite on backend and Vue.js on frontend paired with Tailwind CSS

# Features

- User authentication - made possible using JWT
- Basic account management
- Booking management - you can book cars and return them
- Rating system for cars - at every return you can rate your vehicle
- Location of every vehicle is automatically updated when it is returned
- Admin privilages such as adding or deleting cars from database

# How to use

1. Clone repository

```
git clone https://github.com/stefanstanescu03/car-rental-app.git
```

2. Install dependencies

```
cd backend
npm install
cd ../
cd frontend
npm install
```

3. Create a .env file in backend and set the port for your backend and an access token. Exemple of file:

```
PORT=3000
ACCESS_TOKEN_SECRET='05a6eff555f53d7dabc5450f4b7a96c0aaf69759627f15bb7f73068963beb4ac91805ebbf6318f2dd792379f8e3bcbc363b01846c9d7392ea3cf7d854ebefce7'
```

In order to create that file you can do the following

```
cd backend
touch .env
```

Then you can edit your file

4. Start the backend server

```
cd backend
npm start
```

5. Start the frontend server

```
cd frontend
npm run dev
```

6. Go to `http://localhost:5173/` to start using the app
