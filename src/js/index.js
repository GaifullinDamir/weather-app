'use strict'
import { getWeatherData } from "../http/weatherAPI";
import { Weather, WeatherDTO } from "./entities";
import { Preloader, Modal, Map, Theme } from "./widgets";

window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.search-form');
    const searchButton = document.querySelector('.search-form__button');
    const plug = document.querySelector('.plug__container');
    const theme = new Theme();
    const preloader = new Preloader();
    const modal = new Modal();
    preloader.render();
    modal.render();
    theme.render();
    
    async function handleSubmit(e) {
        e.preventDefault();

        searchButton.classList.add('button_disabled');
        preloader.loadingStart();

        const city = e.target[0].value;
        let data;

        if(city && city != '') {
            data = await getWeatherData(city);
        } else {
            modal.show('Введите название города.');
        }

        if (data) {
            if (data.cod === 200) {
                const weatherDTO = new WeatherDTO(data, '.main__container');
                const weatherComponent = new Weather(
                    weatherDTO.parent,
                    weatherDTO.city,
                    weatherDTO.temperature,
                    weatherDTO.weatherId,
                    weatherDTO.weatherIcon,
                    weatherDTO.weatherDescr,
                    weatherDTO.temperatureFeels,
                    weatherDTO.pressure,
                    weatherDTO.humidity,
                    weatherDTO.visibility,
                    weatherDTO.clouds,
                    weatherDTO.windSpeed,
                    weatherDTO.windDeg,
                    weatherDTO.date
                );
                weatherComponent.render();
                const map = new Map(weatherDTO._longitude, weatherDTO._latitude);
                map.render();
                theme.applyTheme();
                plug.classList.add('hide');
            } else if (data.cod === '404') {
                modal.show('Данные не найдены.');
            } else if(data.cod === '522') {
                modal.show('Слишком долгое ожидание ответа сервера.');
            } else {
                modal.show('Ошибка при поиске данных.');
            }
        }
        preloader.loadingEnd();
        searchButton.classList.remove('button_disabled');
    }

    form.addEventListener('submit', handleSubmit);
})