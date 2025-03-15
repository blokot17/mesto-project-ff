function addCard(initialCard, deletCard, likeCard, showImg) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    
    cardImage.src = initialCard.link;
    cardImage.alt = initialCard.name;
    cardElement.querySelector('.card__title').textContent = initialCard.name;

    const cardButton = cardElement.querySelector('.card__delete-button');
    cardButton.addEventListener('click', deletCard);

    return cardElement
};

function deletCard(evt) {
    const cardDelete = evt.target.closest('.card');
    cardDelete.remove();
};

function likeCard(evt) {
    if (evt.target.classList.contains('card__like-button')) {
        evt.target.classList.toggle('card__like-button_is-active')
    }
};

export{addCard, deletCard, likeCard};