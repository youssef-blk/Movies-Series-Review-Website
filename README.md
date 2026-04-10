# Cinematic Movies & Series Hub

Welcome to the **Movies & Series Review Website**! This repository hosts a beautifully crafted, responsive web application tailored for movie and TV enthusiasts to explore, discover, review, and curate collections of their favorite cinematic content.

## 🌟 Overview

The application features a modern, dark-themed UI that provides a premium viewing and browsing experience. It integrates seamlessly with the **TMDB (The Movie Database) API** to fetch real-time shows, movies, ratings, and imagery. With custom sub-pages for iconic titles and robust user functionalities like searching, filtering, authentication, and playlist management, this web app aims to be your one-stop hub for everything cinematic.

## ✨ Key Functionalities

### 1. Dynamic Cinematic Search
A full-screen, responsive search modal that allows users to type queries and instantly see dynamically fetched results from the TMDB API. It features high-quality UI design with cinematic hover effects on search result cards.

### 2. Show & Movie Detail Pages
Clicking on a movie or series dynamically renders a detailed view (`show.html`). These pages display rich information including synopsis, cast, ratings, and embedded YouTube iframes for trailers—ensuring the repository size remains lean while offering blazing-fast trailer loading.

### 3. Smart Recommendation Engine
Users can use a dedicated form to specify their preferences (Category, Year, Language). Based on these filters, the app dynamically curates and beautifully renders a distinct layout of three personalized recommendation cards.

### 4. User Accounts & Playlists Storage
Powered fully by local storage and mocked backend processes (`json-server`), the website supports user authentication. Users can:
- **Log in** to their personalized account.
- **Add to Playlist**: Save beloved movies/series to a personal user playlist.
- **View Playlists**: Return to their curated list of must-watch titles anytime in a dedicated playlist section. 

### 5. Custom Themed Sub-Pages
Alongside standard API-driven content, the repository contains custom, meticulously styled static hubs for iconic titles. Pages like **Peaky Blinders**, **Joker**, **Dexter**, **Game of Thrones (got)**, and **Sherlock** have their own custom CSS, layouts, and interactive elements.

### 6. Responsive & Modern Design
The website relies heavily on sleek CSS and vanilla JavaScript with careful attention paid to the aesthetic—using micro-animations, glassmorphism, responsive grids, and vibrant contrasts perfectly suited for mobile, tablet, or desktop devices.

## 🛠️ Technology Stack

- **Frontend Core**: HTML5, Vanilla JavaScript, CSS3
- **Data & APIs**: TMDB (The Movie Database) API
- **Backend Mocking**: `json-server` (Used for user authentication & managing the local JSON database for playlists)
- **Media**: YouTube iframe embeds (to keep the platform lightweight)

## 🚀 Getting Started

To run this project locally with full features (including the user playlist and login capabilities):

1. **Clone the repo:**
   ```bash
   git clone <repository-url>
   ```
2. **Start the Mock API server:**
   Ensure you have `json-server` installed globally (`npm i -g json-server`). Run the backend server on the `DB` directory:
   ```bash
   json-server --watch DB/db.json --port 3000
   ```
3. **Open the Website:**
   Open `index.html` via Live Server or your preferred local web server to prevent CORS issues with API calls.
   
---

*Developed with a passion for web development and cinema.*
