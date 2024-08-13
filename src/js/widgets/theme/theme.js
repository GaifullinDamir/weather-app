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
        document.documentElement.setAttribute('data-theme', this._themes[this._currentThemeId]);
    }

    /**
     * Метод, отвечающий за установку иконки темы.
     */
    _setThemeIcon(themeId = this._currentThemeId) {
        const iconPath = `./images/icons/${this._themes[themeId]}.svg`;
        this._themeElement.innerHTML = `
            <img class="theme__img" src="${iconPath}" alt="тема"/>
        `;
        this._parentElement.append(this._themeElement);
    }

    /**
     * Метод, отвечающий за обработку применения темы оформления сайта.
     */
    applyTheme(themeId = this._currentThemeId) {
        this._currentThemeId = themeId;
        localStorage.setItem('theme', themeId);

        const headerLogo = document.querySelector('.header__logo');
        const preloader = document.querySelector('.preloader__img');
        const windCompass = document.querySelector('.wind-widget__compass');
        const windArrow = document.querySelector('.wind-widget__arrow');

        document.documentElement.setAttribute('data-theme', this._themes[themeId]);

        headerLogo.src = `./images/logos/logo250x100${themeId === 1 ? '-dark' : ''}.svg`;
        preloader ? preloader.src = `./images/icons/preloader${themeId === 1 ? '-dark' : ''}.svg` : '';
        windCompass ? windCompass.src = `./images/icons/wind-compass${themeId === 1 ? '-dark' : ''}.svg` : '';
        windArrow ? windArrow.src = `./images/icons/wind-arrow${themeId === 1 ? '-dark' : ''}.svg` : '';

        this._setThemeIcon(themeId);
    }

    /**
     * Метод, отвечающий за отрисовку компоненты значка смены темы.
     */
    render() {
        const themeElement = document.createElement('div');
        themeElement.classList.add('theme');
        this._themeElement = themeElement;

        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        let themeId = isDarkMode ? 1 : 0;
        let lsThemeId = localStorage.getItem('theme');
        if (lsThemeId) {
            themeId = lsThemeId;
        }

        this.applyTheme(themeId);

        this._themeElement.addEventListener('click', (e) => {
            e.preventDefault();
            const themeId = this._currentThemeId ? 0 : 1;
            this.applyTheme(themeId);
            this.setIsThemeChanged(true);
        });
    }
 
}