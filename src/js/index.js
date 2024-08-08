'use strict'
import { getWeatherData } from "../http/weatherAPI";

window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.search-form');
    async function handleSubmit(e) {
        e.preventDefault();
        const city = e.target[0].value;

        let data = '';
        if(city && city != '') {
            data = await getWeatherData(city); 
        }
        console.log(data);
    }

    form.addEventListener('submit', handleSubmit);

})