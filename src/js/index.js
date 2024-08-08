'use strict'
import { getWeatherData } from "../http/weatherAPI";
import { Weather } from "./weather";

window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.search-form');

    async function handleSubmit(e) {
        e.preventDefault();
        const city = e.target[0].value;
        let data;
        if(city && city != '') {
            data = await getWeatherData(city); 
            console.log(data)
        } else {
            alert('Введите населенный пункт.');
        }

        if (data) {
            if (data.cod === 200) {
                
            }
        }

    }

    form.addEventListener('submit', handleSubmit);
})