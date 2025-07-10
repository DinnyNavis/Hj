// services/weatherService.js

const axios = require('axios');

// OpenWeatherMap API key (no .env used)
const API_KEY = 'ef652dd7f8c85f6eba1ecb4dc26a9fe4';

/**
 * Fetches the current weather condition for a city.
 * @param {string} city - The city to check weather for.
 * @returns {string} - Weather description like "Clear", "Rain", etc.
 */
const getWeather = async (city) => {
  try {
    const encodedCity = encodeURIComponent(city);
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${API_KEY}&units=metric`;

    const response = await axios.get(url);
    const mainCondition = response.data.weather[0].main; // e.g., "Clear", "Rain"
    
    return mainCondition;
  } catch (error) {
    console.error('Error fetching weather for', city, ':', error.message);
    return 'Unknown';
  }
};

module.exports = getWeather;
