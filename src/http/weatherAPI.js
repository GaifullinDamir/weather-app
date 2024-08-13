'use strict'

const axios = require('axios');

export const getWeatherData = async (city) => {
    let data;
    try {
        const response = await axios.get(`${process.env.DEV_ENV.BASE_URL}?q=${city}&appid=${process.env.DEV_ENV.API_KEY}&lang=${process.env.DEV_ENV.WEATHER_LANG}`, {
            timeout: 5000
        });
        data = response.data;
    } catch(error) {
        const response = await error.response;
        if (response) {
            data = response.data;
        } else {
            data = {
                cod: "522",
                message: "net::ERR_CONNECTION_TIMED_OUT"
            }
        }
        
    }
    return data;
}