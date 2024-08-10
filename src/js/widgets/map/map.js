var DG = require('2gis-maps');

export class Map {
    /**
     * Конструктор для создания компонента Map.
     * Map отвечает за отображение карты местности на сайте.
     * @constructor
     * @param {number} longitude - данные о долготе.
     * @param {number} latitude - данные о широте.
     * @param {string} parentSelector - данные о селекторе элемента, внутрь которого будет помещен элемент карты (default = '.main__container').
     */
    constructor(longitude, latitude, parentSelector = '.main__container') {
        this._parentSelector = parentSelector,
        this._longitude = longitude,
        this._latitude = latitude
    }

    /**
     * Метод, который собиарет итоговый элемент и добавляет его к родительскому элементу.
     */
    render() {
        const mainContainer = document.querySelector(this._parentSelector);
        const mapElement = document.createElement('div');
        mapElement.id = 'map';
        mainContainer.append(mapElement);

        const map = DG.map('map', {
            'center': [this._latitude, this._longitude],
            'zoom': 12
        })
    }
}