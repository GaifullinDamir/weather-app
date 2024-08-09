export class Modal {
    /**
     * Конструктор класса Modal.
     * Данный класс отвечает за работу с модальным окном.
     */
    constructor() {
        this._modal = document.createElement('div'),
        this._modal.classList.add('modal', 'hide')
    }

    /**
     * Метод, который инициирует отображение модального окна.
     * @param {string} header - заголовок модального окна.
     * @param {string} message - отображаемое в окне сообщение.
     */
    show(message, header = 'Уведомление') {
        this._modal.innerHTML = `
        <div class="modal__container">
            <div class="modal__close-item"></div>
            <div class="modal__header">${header}</div>
            <div class="modal__message">${message}</div>
        </div>
        `;
        this._modal.classList.remove('hide');
    }

    /**Метод, который инициирует закрытие модального окна. */
    close() {
        this._modal.classList.add('hide');
        this._modal.innerHTML = '';
    }

    /**Метод, который добавляет элемнет в DOM-дерево. */
    render() {
        const main = document.querySelector('.main');
        main.append(this._modal);
    }
}