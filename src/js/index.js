'use strict'
import { getWeatherData } from "../http/weatherAPI";

window.addEventListener('DOMContentLoaded', () => {
    getWeatherData('Казань');
})