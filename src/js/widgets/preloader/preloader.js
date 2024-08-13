import { IMAGES } from "../../utils/image-paths";

export class Preloader {
    /**
     * Конструктор класса Preloader.
     * Данный класс отвечает за работу с колесом загрузки.
     */
    constructor() {
        this._preloader = document.createElement('div'),
        this._preloader.classList.add('preloader', 'hide'),
        this._preloader.innerHTML = `
            <img class="preloader__img" src="${IMAGES.PRELOADER}" alt="preloader"/>
        `
    }

    /**Метод, которые инициирует отображение колеса загрузки. */
    loadingStart() {
        this._preloader.classList.remove('hide');
    }

    /**Метод, которые инициирует окончание отображения колеса загрузки. */
    loadingEnd() {
        this._preloader.classList.add('hide');
    }

    /**Метод, который добавляет элемент в DOM-дерево. */
    render() {
        const main = document.querySelector('.main');
        main.append(this._preloader);
    }
}