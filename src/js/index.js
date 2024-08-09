'use strict'
import { getWeatherData } from "../http/weatherAPI";
import { Weather, WeatherDTO } from "./entities";
import { Preloader, Modal } from "./widgets";

window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.search-form');
    const searchButton = document.querySelector('.search-form__button');
    const plug = document.querySelector('.plug__container');
    const preloader = new Preloader();
    preloader.render();
    const modal = new Modal();
    modal.render();

    async function handleSubmit(e) {
        e.preventDefault();

        searchButton.classList.add('button_disabled');
        preloader.loadingStart();

        const city = e.target[0].value;
        let data;

        if(city && city != '') {
            data = await getWeatherData(city);
        } else {
            modal.show('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
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