# Zerodha Clone

A full-stack clone of the Zerodha trading platform with user signup and login, a protected dashboard, and a database.

**Live demo:** https://zerodha-clone-ez5f.onrender.com
> Hosted on a free plan, so the first load after a quiet period may take a minute while the server wakes up.

## Features

- Landing site with Home, About, Products, Pricing and Support pages
- User signup and login with hashed passwords and JWT cookies
- Dashboard only available to signed-in users
- Holdings, Positions and Orders pages with data from MongoDB
- Buy window that saves orders to the database
- Logout and a Home link back to the landing site

## Tech stack

- **Frontend and dashboard:** React, React Router, Axios, Bootstrap
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB Atlas
- **Auth:** bcryptjs, jsonwebtoken, cookie-parser
- **Hosting:** Render

## Project structure

```
frontend/    landing site (React)
dashboard/   trading dashboard (React)
backend/     Express API and server
```
