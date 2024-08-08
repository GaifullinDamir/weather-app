export class Preloader {
    constructor() {
        this._preloader = document.createElement('div'),
        this._preloader.classList.add('preloader', 'hide'),
        this._preloader.innerHTML = `
            <img class="preloader__img" src="../images/icons/preloader.svg" alt="preloader"/>
        `
    }

    loadingStart() {
        this._preloader.classList.remove('hide');
    }

    loadingEnd() {
        this._preloader.classList.add('hide');
    }

    render() {
        const main = document.querySelector('.main');
        main.append(this._preloader);
    }
}