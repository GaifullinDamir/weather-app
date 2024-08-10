
export class Theme {
    
    /**
     * Конструктор для созданиия компонента Theme.
     * Theme отвечает за изменение темы сайта (светлая/тёмная).
     * @constructor
     * @param {string} parentSelector - селектор элемента DOM, являющийся родителем для текущего компонента (default='.header__container').
     */
    constructor(parentSelector = '.header__container') {
        this._parentSelector = parentSelector,
        this._currentThemeId = 0,
        this._thems = {
            0: 'light',
            1: 'dark'
        }
    }

    /**
     * Метод, отвечающий за обработку изменения темы оформления сайта.
     */
    changeThem() {

    }

    /**
     * Метод, отвечающий за отрисовку компоненты значка смены темы.
     */
    render() {
        const parentElement = document.querySelector(this._parentSelector);
        const themeElement = document.createElement('div');
        themeElement.classList.add('theme');
        const iconPath = `../../../images/icons/${this._thems[this._currentThemeId]}.svg`;
        themeElement.innerHTML = `
            <img class="theme__img" src="${iconPath}" alt="тема"/>
        `;
        parentElement.append(themeElement);
    }
 
}