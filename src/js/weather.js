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
        this._parent = document.querySelector(parentSelector),
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
        this._windSpeed = windSpeed,
        this._windDeg = windDeg,
        this._date = new Date()
    }

    static convertDataToWeatherValid(data, parentSelector) {
        return {
            parentSelector,
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
            windSpeed,
            windDeg
        }
    }

    makeHead() {
        const element = document.createElement('h1');
        element.classList.add('main__head');
        element.innerHTML = `
            Местоположение: <span class="info-value info-value_head">${this._city ?? 'отсутствует'}</span>
        `;
        return element;
    }

    makeLeftSide() {
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
                                class="wind-widget__arrow"
                                style="transofrm: rotate(${this._windDeg ?? 0}deg)">
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
        compassArrow.style.transform = `rotate(${this._windDeg ?? 0})`;
    }

    render() {
        const head = this.makeHead();
        const leftSide = this.makeLeftSide();
        const rightSide = this.makeRightSide();

        const temperatureElement = leftSide.querySelector('.weather-info__temperature');
        const compassElement = rightSide.querySelector('.wind-widget');

        this.changeColorByTime(temperatureElement);
        this.rotateCompassArrowByDeg(compassElement);

        this._parent.innerHTML = `
            ${head}
            ${leftSide}
            ${rightSide}
        `;

        this._parent.classList.remove('hide');
    }
}