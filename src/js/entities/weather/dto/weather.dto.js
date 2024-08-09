/** @module WeatherDTO */

class WeatherDTO {
    /**
     * Конструктор для созданиия DTO.
     * @constructor
     * @param data - объект с данными о погоде.
     * @param {string} parentSelector - селектор родительского блока для компонента с погодой.
     */
    constructor(
        data = null, parentSelector = '.main__container'
    ) {
        this._parent = document.querySelector(parentSelector),
        this._city = data?.name || 'Отсутствует',
        this._temperature = data?.main?.temp ? Math.trunc(data?.main?.temp - 272.1, 1) : 'Нет данных',
        this._weatherId = data?.weather[0].id || 'Отсутствует',
        this._weatherIcon = data?.weather[0].icon || 'Отсутствует',
        this._weatherDescr = data?.weather[0].description || 'Отсутствует',
        this._temperatureFeels = data?.main?.feels_like ? Math.trunc(data?.main?.feels_like - 272.1, 1) : 'Нет данных',
        this._pressure = data?.main?.pressure || 'Отсутствует',
        this._humidity = data?.main?.humidity || 'Отсутствует',
        this._visibility = data?.visibility || 'Отсутствует',
        this._clouds = data?.clouds?.all || 'Отсутствует',
        this._windSpeed = data?.wind?.speed || 'Отсутствует',
        this._windDeg = data?.wind?.deg || 'Отсутствует',
        this._date = new Date()
    }

}