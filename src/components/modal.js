function closeEscapeModal(evt) {
    if (evt.key === 'Escape') {
        closeModal(document.querySelector('.popup_is-opened'))
    }
};

function closeOverlayModal(evt) {
    if (evt.target === evt.currentTarget) {
        closeModal(evt.currentTarget)
    }
};

function openModal(element) {
    element.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeEscapeModal);
    element.addEventListener('mousedown', closeOverlayModal)
};

function closeModal(element) {
    element.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeEscapeModal);
    element.removeEventListener('mousedown', closeOverlayModal)
};

export {openModal, closeModal}