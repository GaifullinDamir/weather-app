'use strict'

import { WEATHER_ICON_URL_BEGINNING, WEATHER_ICON_URL_END } from "./consts";

class Weather {
    constructor(
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
        rain,
        windSpeed,
        windDeg
    ) {
        this._city = city,
        this._temperature = temperature,
        this._weatherId = weatherId,
        this._weatherIcon = weatherIcon,
        this._weatherDescr = weatherDescr,
        this._temperatureFeels = temperatureFeels,
        this._pressure = pressure,
        this._humidity = humidity,
        this._visibility = visibility,
        this._clouds = clouds,
        this._rain = rain,
        this._windSpeed = windSpeed,
        this._windDeg = windDeg,
        this._date = new Date()
    }
    returnHead() {
        const element = document.createElement('h1');
        element.classList.add('main__head');
        element.innerHTML = `
            Местоположение: <span class="info-value info-value_head">${this._city ?? 'отсутствует'}</span>
        `;
        return element;
    }

    returnLeftSide() {
        const element = document.createElement('div');
        element.classList.add('left-side');
        element.innerHTML = `
            <div class="weather-info__temperature">
                <div class="weather-info__temperature-number">
                    ${this._temperature > 0 ? `+${this._temperature}` : this._temperature ?? 'отсутствует'}&deg;
                </div>
                <img
                    src="${WEATHER_ICON_URL_BEGINNING}${this._weatherIcon ?? '01d'}${WEATHER_ICON_URL_END}"
                    alt="weather"
                    class="weather-info__temperature-img">
            </div>
            <div class="weather-info__label" id="weather-descr">Описание: <span class="info-value">${this._weatherDescr ?? 'Описание'}</span></div>
            <div class="weather-info__label" id="temperature-feels">Ощущается как: <span class="info-value">${this._temperatureFeels > 0 ? `+${this._temperatureFeels}` : this._temperatureFeels ?? 'отсутствует'}&deg;</span></div>
            <div class="weather-info__label" id="pressure">Атмосферное давление: <span class="info-value">${this._pressure ?? 'отсутствует'}ГПа</span></div>
            <div class="weather-info__label" id="humidity">Влажность: <span class="info-value">${this._humidity ?? 'отсутствует'}%</span></div>
            <div class="weather-info__label" id="visibility">Видимость: <span class="info-value">${this._visibility ?? 'отсутствует'} км</span></div>
            <div class="weather-info__label" id="clouds">Облачность: <span class="info-value">${this._clouds ?? 'отсутствует'}%</span></div>
            <div class="weather-info__label" id="rain">Количество осадков за последний час: <span class="info-value">${this._rain ?? 'отсутствует'} мм</span></div>
        `;
        return element;
    }

    returnRightSide() {
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
                            <div class="wind-widget__wind-speed">2<br>м/с</div>
                        </div>
                    </div>
        `;
    }

}