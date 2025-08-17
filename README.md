# Movie Hunt

>A modern web app for discovering, searching, and managing your favorite movies.

## Overview

**Movie Hunt** is a React-based application that allows users to explore trending movies, search for specific titles, view detailed descriptions, and manage a personal watchlist. Built with Vite for fast development and optimized performance, the app features a clean, responsive UI and smooth navigation.

## Features

- **Home Page:** Browse trending and popular movies.
- **Search:** Find movies by title with instant results.
- **Movie Description:** View detailed information about each movie.
- **Watchlist:** Add or remove movies to your personal watchlist.
- **About Page:** Learn more about the app and its creators.
- **Responsive Design:** Works seamlessly on desktop and mobile devices.

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- CSS 
- JavaScript 

## Additionals
- [Team Trello ](https://trello.com/b/oXOxq0AR/group-3-hackathon)
- [Figma](https://www.figma.com/design/TzZLVaZDs2xTl7904IWhWM/Untitled?node-id=0-1&t=fO0trudWs2WGJKqO-1)

## Project Structure

```
movie-hunt/
├── public/                  # Static assets served directly (e.g., favicon, vite.svg)
│   └── vite.svg             # Vite logo used in the app
├── src/                     # Source code for the application
│   ├── assets/              # Images and icons used throughout the app
│   │   └── react.svg        # React logo asset
│   ├── components/          # Reusable UI components
│   │   ├── images/          # Component-specific images
│   │   │   └── logo.png     # App logo image
│   │   └── Nav/             # Navigation bar component
│   │       ├── Nav.jsx      # Navigation bar React component
│   │       └── Nav.css      # Styles for the navigation bar
│   ├── pages/               # Main pages/views of the app
│   │   ├── Home/            # Home page (search and trending movies)
│   │   │   ├── Home.jsx     # Home page React component
│   │   │   └── Home.css     # Home page styles
│   │   ├── Description/     # Movie details page
│   │   │   ├── Description.jsx # Movie description React component
│   │   │   └── Description.css # Description page styles
│   │   ├── WatchList/       # User's watchlist page
│   │   │   ├── WatchList.jsx    # Watchlist React component
│   │   │   └── WatchList.css    # Watchlist page styles
│   │   └── About/           # About page (app info and credits)
│   │       ├── About.jsx        # About page React component
│   │       └── About.css        # About page styles
│   ├── App.jsx              # Main app component, sets up routes and state
│   ├── main.jsx             # Entry point, renders the app and sets up React Router
│   ├── App.css              # Global styles for the app
│   └── index.css            # Base CSS resets and global styles
├── index.html               # HTML template loaded by Vite
├── package.json             # Project metadata, dependencies, and scripts
├── vite.config.js           # Vite configuration file
└── README.md                # Project documentation (this file)
```

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/husainsaleh123/movie-hunt.git
   cd movie-hunt
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```
4. **Open in your browser:**
   Visit [http://localhost:5173](http://localhost:5173) to view the app.

## Scripts

- `npm run dev` — Start the development server
- `npm run build` — Build for production
- `npm run preview` — Preview the production build



### Created by & Team Roles

- **GitHub Manager:**
   - Husain Alnahash

- **UI Lead:**
   - Ali Jawad  
   _Wireframes, CSS styles, accessibility. Owns all CSS files._

- **Layout Lead:**
   - Mohamed Ali Jaber  
   _Nav, Footer, 404 Page. Owns App.jsx & Components folder._

- **Page Dev A:**
   - Mahmood Kadhem  
   _Builds two pages: Home & About._

- **Page Dev B:**
   - Husain Folath  
   _Builds two pages: Description & WatchList._

- **QA / API / Docs:**
   - Aqeel Muslim  
   _Testing, README, bug fixes. Owns README & responsible for deciphering API. Handles submission issue in correct template._
