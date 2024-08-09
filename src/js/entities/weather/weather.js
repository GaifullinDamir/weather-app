'use strict'

import { WEATHER_ICON_URL_BEGINNING, WEATHER_ICON_URL_END } from "../../utils/consts";

export class Weather {
    /**
     * Конструктор для созданиия компонента Weather.
     * Weather отвечает за отображение данных о погоде на сайте.
     * @constructor
     * @param parent - элемент DOM являющийся родителем для текущего компонента.
     * @param {string} city - данные о городе.
     * @param {number} temperature - данные о температуре.
     * @param {number} weatherId - данные об id текущей погоды.
     * @param {string} weatherIcon - данные об id иконки погоды.
     * @param {string} weatherDescr - описание погодных условий.
     * @param {number} temperatureFeels - данные о том, какой ощущается температуры.
     * @param {number} pressure - данные об атмосферном давлении.
     * @param {number} humidity - данные о влажности.
     * @param {number} visibility - данные о видимости.
     * @param {number} clouds - данные об облачности.
     * @param {number} windSpeed - данные о скорости ветра.
     * @param {number} windDeg - данные о направлении ветра.
     * @param {Date} date - данные о текущей дате.
     */
    constructor(
        parent,
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
        windDeg,
        date
    ) {
        this._parent = parent,
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
        this._date = date
    }
    /**
     * Метод, создающий заголовок первого порядка с названием города.
     * @returns {HTMLElement}
     */
    makeHead() {
        const element = document.createElement('h1');
        element.classList.add('main__head');
        element.innerHTML = `
            Местоположение: <span class="info-value info-value_head">${this._city}</span>
        `;
        return element;
    }

     /**
     * Метод, создающий левую колонку с данным о погоде.
     * @returns {HTMLElement}
     */
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

     /**
     * Метод, создающий правую колонку с данными о ветре.
     * @returns {HTMLElement}
     */
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

    /**
     * Метод, изменяющий цвет шрифта и фона в зависимости от времени суток.
     * @param {HTMLElement} element - Элемент, в котором отображается текущая температура и погодные условия.
     */
    changeColorByTime(element) {
        debugger
        const temperatureElement = element;
        const temperatureNumber = element.querySelector('.weather-info__temperature-number');
        let backgroundColor = '';
        let textColor = '';
        const time = new Date(this._date * 1000).getHours();

        const colors = {
            morning: 'radial-gradient(50.00% 50.00% at 50% 50%,rgb(113, 135, 235, 0.35),rgba(255, 255, 255, 0) 100%)',
            day: 'radial-gradient(50.00% 50.00% at 50% 50%,rgba(98, 211, 255, 0.35) 5.344%,rgba(255, 255, 255, 0) 100%)',
            evening: 'radial-gradient(50.00% 50.00% at 50% 50%,rgba(255, 170, 73, 0.35) 5.344%,rgba(255, 255, 255, 0) 100%)',
            night: 'radial-gradient(50.00% 50.00% at 50% 50%,rgba(57, 83, 201, 0.35),rgba(255, 255, 255, 0) 100%)',
            morningText: '#559ae9',
            dayText: '#2d8fff',
            eveningText: '#7dbaff',
            nightText: '#FFC22F'
        }

        if (time >= 0 &&  time < 5) {
            backgroundColor = colors.night;
            textColor = colors.nightText;
        } else if (time >= 5 && time < 12) {
            backgroundColor = colors.morning;
            textColor = colors.morningText;
        } else if (time >= 12 && time < 19) {
            backgroundColor = colors.day;
            textColor = colors.dayText;
        } else {
            backgroundColor = colors.evening;
            textColor = colors.eveningText;
        }
        temperatureElement.style.background = backgroundColor;
        temperatureNumber.style.color = textColor;
    }

    /**
     * Метод, изменяющий направление стрелки компаса в зависимости от направления ветра.
     * @param {HTMLElement} element - Элемент - стрелка компаса, показывающего направление ветра и скорость ветра.
     */
    rotateCompassArrowByDeg(element) {
        const compassArrow = element.querySelector('.wind-widget__arrow');
        compassArrow.style.transform = `rotate(${this._windDeg}deg)`;
    }
    
    /**
     * Метод, который собиарет итоговый элемент и добавляет его к родительскому элементу.
     */
    render() {
        const head = this.makeHead();
        const leftSide = this.makeLeftSide();
        const rightSide = this.makeRightSide();

        const temperatureElement = leftSide.querySelector('.weather-info__temperature');
        const compassElement = rightSide.querySelector('.wind-widget');

        this.changeColorByTime(temperatureElement);
        this.rotateCompassArrowByDeg(compassElement);

        this._parent.innerHTML = `
            ${head.outerHTML}
            <div class="weather-info__container">
                ${leftSide.outerHTML}
                ${rightSide.outerHTML}
            </div>
        `;
        this._parent.classList.remove('hide');
    }
}