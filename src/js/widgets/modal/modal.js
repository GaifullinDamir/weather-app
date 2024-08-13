export class Modal {
    /**
     * Конструктор класса Modal.
     * Данный класс отвечает за работу с модальным окном.
     * @param {string} header - заголовок модального окна.
     * @param {string} message - отображаемое в окне сообщение.
     */
    constructor(message = '', header = 'Уведомление') {
        this._modal = document.createElement('div'),
        this._modal.classList.add('modal', 'hide'),
        this._modal.innerHTML = `
        <div class="modal__container">
            <div class="modal__close-item"></div>
            <div class="modal__header">${header}</div>
            <div class="modal__message">${message}</div>
        </div>
        `;
        }

    /**
     * Метод, который инициирует отображение модального окна с новыми данными.
     * @param {string} header - заголовок модального окна.
     * @param {string} message - отображаемое в окне сообщение.
     */
    show(message = '', header = 'Уведомление') {
        const headerElement = this._modal.querySelector('.modal__header');
        const messageElement = this._modal.querySelector('.modal__message');
        headerElement.innerHTML = header;
        messageElement.innerHTML = message;
        this._modal.classList.remove('hide');
    }

    /**Метод, который инициирует закрытие модального окна. */
    close() {
        this._modal.classList.add('hide');
    }

    /**Метод, который добавляет элемнет в DOM-дерево. */
    render() {
        const main = document.querySelector('.main');
        main.append(this._modal);
        this._modal
            .querySelector('.modal__close-item')
            .addEventListener('click', (e) => {
                e.preventDefault();
                this.close();
            })
    }
}