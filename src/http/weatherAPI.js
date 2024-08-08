'use strict'

const axios = require('axios');

export const getWeatherData = async (city) => {
    let data;
    try {
        const response = await axios.get(`${process.env.DEV_ENV.BASE_URL}?q=${city}&appid=${process.env.DEV_ENV.API_KEY}&lang=${process.env.DEV_ENV.WEATHER_LANG}`);
        data = response.data;
    } catch(error) {
        const response = await error.response;
        data = response.data;
    }
    return data;
}