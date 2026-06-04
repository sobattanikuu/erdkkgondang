# Weather Dashboard

Aplikasi weather dashboard yang modern dengan fitur lengkap.

## Fitur

- ✅ Current weather dengan detail lengkap
- ✅ 5-day forecast
- ✅ Search multiple cities
- ✅ Favorite cities management
- ✅ Dark mode toggle
- ✅ Real-time weather updates
- ✅ Responsive design
- ✅ Geolocation support

## Setup

### 1. Install Dependencies
```bash
npm install react react-dom axios lucide-react
npm install -D tailwindcss postcss autoprefixer
```

### 2. Get OpenWeatherMap API Key
- Daftar di https://openweathermap.org/api
- Copy API key Anda
- Buat file `.env.local`:
```
REACT_APP_WEATHER_API_KEY=your_api_key_here
```

### 3. Run Development Server
```bash
npm start
```

## File Structure
```
weather-dashboard/
├── src/
│   ├── components/
│   │   ├── CurrentWeather.jsx
│   │   ├── Forecast.jsx
│   │   ├── SearchBar.jsx
│   │   ├── CityCard.jsx
│   │   ├── FavoritesList.jsx
│   │   └── Header.jsx
│   ├── hooks/
│   │   ├── useWeather.js
│   │   └── useFavorites.js
│   ├── utils/
│   │   ├── weatherApi.js
│   │   ├── formatters.js
│   │   └── constants.js
│   ├── App.jsx
│   ├── App.css
│   └── index.js
└── public/
    └── index.html
```

## API Documentation

### OpenWeatherMap
- Current Weather: `api.openweathermap.org/data/2.5/weather`
- 5-Day Forecast: `api.openweathermap.org/data/2.5/forecast`
- Geolocation: Browser Geolocation API

## Environment Variables
```
REACT_APP_WEATHER_API_KEY=your_openweathermap_api_key
```
