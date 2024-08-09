/** @module WeatherDTO */

export class WeatherDTO {
    /**
     * Конструктор для создания WeatherDTO.
     * WeatherDTO требуе
     * @constructor
     * @param data - объект с данными о погоде.
     * @param {string} parentSelector - селектор родительского блока для компонента с погодой.
     */
    constructor(
        data = null, parentSelector = '.main__container'
    ) {
        this.parent = document.querySelector(parentSelector),
        this.city = data?.name || 'Отсутствует',
        this.temperature = data?.main?.temp ? Math.trunc(data?.main?.temp - 272.1, 1) : 'Нет данных',
        this.weatherId = data?.weather[0].id || 'Отсутствует',
        this.weatherIcon = data?.weather[0].icon || 'Отсутствует',
        this.weatherDescr = data?.weather[0].description || 'Отсутствует',
        this.temperatureFeels = data?.main?.feels_like ? Math.trunc(data?.main?.feels_like - 272.1, 1) : 'Нет данных',
        this.pressure = data?.main?.pressure || 'Отсутствует',
        this.humidity = data?.main?.humidity || 'Отсутствует',
        this.visibility = data?.visibility || 'Отсутствует',
        this.clouds = data?.clouds?.all || 'Отсутствует',
        this.windSpeed = data?.wind?.speed || 'Отсутствует',
        this.windDeg = data?.wind?.deg || 'Отсутствует',
        this.date = new Date()
    }

}