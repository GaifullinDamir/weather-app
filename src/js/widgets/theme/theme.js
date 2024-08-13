import { IMAGES } from "../../utils/image-paths";

export class Theme {
    
    /**
     * Конструктор для созданиия компонента Theme.
     * Theme отвечает за изменение темы сайта (светлая/тёмная).
     * @constructor
     * @param {string} parentSelector - селектор элемента DOM, являющийся родителем для текущего компонента (default='.header__container').
     */
    constructor(parentSelector = '.header__container') {
        this._parentElement = document.querySelector(parentSelector);
        this._currentThemeId = 0,
        this._themes = {
            0: 'light',
            1: 'dark'
        },
        this._themeElement = null,
        this._isThemeChanged = false,
        document.documentElement.setAttribute('data-theme', this._themes[this._currentThemeId]);
    }

    /**
     * Метод, отвечающий за задание темы оформления сайта.
     * @param {number} currentThemeId - id темы (default = 0 (light)).
     * 0 - light;
     * 1 - dark.
     */

    /**
     * Метод, отвечающий за установку иконки темы.
     */
    _setThemeIcon() {
        const iconPath = `./images/icons/${this._themes[this._currentThemeId]}.svg`;
        this._themeElement.innerHTML = `
            <img class="theme__img" src="${iconPath}" alt="тема"/>
        `;
        this._parentElement.append(this._themeElement);
    }

    /**
     * Сеттер для булевой переменной, которая говорит о том, сменилась ли тема.
     * @param {boolean} isThemeChanged - сменилась ли тема.
     */
    setIsThemeChanged(isThemeChanged) {
        this._isThemeChanged = isThemeChanged;
    }

    /**
     * Геттер для булевой переменной, которая говорит о том, сменилась ли тема.
     */
    getIsThemeChanged() {
        return this._isThemeChanged;
    }

    /**
     * Метод, отвечающий за обработку применения темы оформления сайта.
     */
    _applyTheme() {
        const headerLogo = document.querySelector('.header__logo');
        document.documentElement.setAttribute('data-theme', this._themes[this._currentThemeId]);

        headerLogo.src = `./images/logos/logo250x100${this._currentThemeId === 1 ? '-dark' : ''}.svg`;

        IMAGES.PRELOADER = `./images/icons/preloader${this._currentThemeId === 1 ? '-dark' : ''}.svg`;
        IMAGES.WIND_WIDGET_COMPASS = `./images/icons/wind-compass${this._currentThemeId === 1 ? '-dark' : ''}.svg`;
        IMAGES.WIND_WIDGET_ARROW = `./images/icons/wind-arrow${this._currentThemeId === 1 ? '-dark' : ''}.svg`;
    }

    /**
     * Метод, отвечающий за отрисовку компоненты значка смены темы.
     */
    render() {
        const themeElement = document.createElement('div');
        themeElement.classList.add('theme');
        this._themeElement = themeElement;
        this._setThemeIcon();
        this._applyTheme();
        this._themeElement.addEventListener('click', (e) => {
            e.preventDefault();
            this._currentThemeId = this._currentThemeId ? 0 : 1;
            this._setThemeIcon();
            this._applyTheme();
            this.setIsThemeChanged(true);
        });
    }
 
}