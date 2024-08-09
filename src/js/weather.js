'use strict'

import { WEATHER_ICON_URL_BEGINNING, WEATHER_ICON_URL_END } from "./consts";

export class Weather {
    constructor(
        parentSelector,
        city,
        temperature,
        weatherId,
        weatherIcon,
        weatherDescr,
        temperatureFeels,
        pressure,
        humidity,
        visibility,
        clouds,
        windSpeed,
        windDeg
    ) {
        this._parentSelector = parentSelector,
        this._city = city,
        this._temperature = Math.trunc(temperature - 272.1, 1),
        this._weatherId = weatherId,
        this._weatherIcon = weatherIcon,
        this._weatherDescr = weatherDescr,
        this._temperatureFeels = Math.trunc(temperatureFeels - 272.1, 1),
        this._pressure = pressure,
        this._humidity = humidity,
        this._visibility = visibility,
        this._clouds = clouds,
        this._windSpeed = windSpeed,
        this._windDeg = windDeg,
        this._date = new Date()
    }

    static convertDataToWeatherValid(data, parentSelector) {
        return {
            parentSelector: parentSelector,
            city: data.name,
            temperature: data.main.temp,
            weatherId: data.weather[0].id,
            weatherIcon: data.weather[0].icon,
            weatherDescr: data.weather[0].description,
            temperatureFeels: data.main.feels_like,
            pressure: data.main.pressure,
            humidity: data.main.humidity,
            visibility: data.visibility,
            clouds: data.clouds.all,
            windSpeed: data.wind.speed,
            windDeg: data.wind.deg
        }
    }

    makeHead() {
        const element = document.createElement('h1');
        element.classList.add('main__head');
        element.innerHTML = `
            Местоположение: <span class="info-value info-value_head">${this._city}</span>
        `;
        return element;
    }

    makeLeftSide() {
        const element = document.createElement('div');
        element.classList.add('left-side');
        element.innerHTML = `
            <div class="weather-info__temperature">
                <div class="weather-info__temperature-number">
                    ${this._temperature > 0 ? `+${this._temperature}` : this._temperature}&deg;
                </div>
                <img
                    src="${WEATHER_ICON_URL_BEGINNING}${this._weatherIcon}${WEATHER_ICON_URL_END}"
                    alt="weather"
                    class="weather-info__temperature-img">
            </div>
            <div class="weather-info__label" id="weather-descr">Описание: <span class="info-value">${this._weatherDescr}</span></div>
            <div class="weather-info__label" id="temperature-feels">Ощущается как: <span class="info-value">${this._temperatureFeels > 0 ? `+${this._temperatureFeels}` : this._temperatureFeels}&deg;</span></div>
            <div class="weather-info__label" id="pressure">Атмосферное давление: <span class="info-value">${this._pressure}ГПа</span></div>
            <div class="weather-info__label" id="humidity">Влажность: <span class="info-value">${this._humidity}%</span></div>
            <div class="weather-info__label" id="visibility">Видимость: <span class="info-value">${this._visibility} м</span></div>
            <div class="weather-info__label" id="clouds">Облачность: <span class="info-value">${this._clouds}%</span></div>
        `;
        return element;
    }

    makeRightSide() {
        const element = document.createElement('div');
        element.classList.add('right-side');
        element.innerHTML = `
            <div class="weather-info__wind">
                        <div class="weather-info__wind-head">Данные о ветре</div>
                        <div class="wind-widget">
                            <img
                                src="./images/icons/wind-compass.svg"
                                alt="wind-compass"
                                class="wind-widget__compass">
                            <img
                                src="./images/icons/wind-arrow.svg"
                                alt="wind-arrow"
                                class="wind-widget__arrow">
                            <div class="wind-widget__wind-speed">${this._windSpeed}<br>м/с</div>
                        </div>
                    </div>
        `;
        return element;
    }

    changeColorByTime(element) {
        const temperatureElement = element;
        const temberatureNumber = element.querySelector('.weather-info__temperature-number');
        let backgroundColor = '';
        let textColor = '';
        const time = this._date.getHours();

        if (time >= 0 &&  time < 5) {
            backgroundColor = '$night';
            textColor = '$night-text';
        } else if (time >= 5 && time < 12) {
            backgroundColor = '$morning';
            textColor = '$morning-text';
        } else if (time >= 12 && time < 19) {
            backgroundColor = '$day';
            textColor = '$day-text';
        } else {
            backgroundColor = 'evening';
            textColor = 'evening-text';
        }
        temperatureElement.style.background = backgroundColor;
        temberatureNumber.style.color = textColor;
    }

    rotateCompassArrowByDeg(element) {
        const compassArrow = element.querySelector('.wind-widget__arrow');
        compassArrow.style.transform = `rotate(${this._windDeg}deg)`;
    }

    render() {
        const head = this.makeHead();
        const leftSide = this.makeLeftSide();
        const rightSide = this.makeRightSide();

        const temperatureElement = leftSide.querySelector('.weather-info__temperature');
        const compassElement = rightSide.querySelector('.wind-widget');
        const parent = document.querySelector('.main__container');

        this.changeColorByTime(temperatureElement);
        this.rotateCompassArrowByDeg(compassElement);

        parent.innerHTML = `
            ${head.outerHTML}
            <div class="weather-info__container">
                ${leftSide.outerHTML}
                ${rightSide.outerHTML}
            </div>
        `;
        parent.classList.remove('hide');
    }
}