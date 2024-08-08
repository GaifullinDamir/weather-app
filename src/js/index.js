'use strict'
import { getWeatherData } from "../http/weatherAPI";
import { Weather } from "./weather";
import { Preloader } from "./preloader";

window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.search-form');
    const searchButton = document.querySelector('.search-form__button');
    const plug = document.querySelector('.plug__container');
    const preloader = new Preloader();
    preloader.render();
    async function handleSubmit(e) {
        e.preventDefault();

        searchButton.classList.add('button_disabled');
        preloader.loadingStart();
        const city = e.target[0].value;
        let data;
        if(city && city != '') {
            data = await getWeatherData(city); 
        } else {
            alert('Введите населенный пункт.');
        }

        if (data) {
            if (data.cod === 200) {
                const convertedData = Weather.convertDataToWeatherValid(data, ".main__container");
                console.log(convertedData)
                
                const weatherComponent = new Weather(
                    convertedData.parentSelector,
                    convertedData.city,
                    convertedData.temperature,
                    convertedData.weatherId,
                    convertedData.weatherIcon,
                    convertedData.weatherDescr,
                    convertedData.temperatureFeels,
                    convertedData.pressure,
                    convertedData.humidity,
                    convertedData.visibility,
                    convertedData.clouds,
                    convertedData.windSpeed,
                    convertedData.windDeg
                );
                weatherComponent.render();
                plug.classList.add('hide');
            } else if (data.cod === '404') {
                alert('Данные не найдены.');
            } else if(data.cod === '522') {
                alert('Слишком долгое ожидание ответа сервера.');
            } else {
                alert('Ошибка при поиске данных.');
            }
        }
        preloader.loadingEnd();
        searchButton.classList.remove('button_disabled');
    }

    form.addEventListener('submit', handleSubmit);
})