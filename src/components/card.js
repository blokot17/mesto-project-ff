function addCard(initialCard, deletCard, likeCard, showImg) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    
    cardImage.src = initialCard.link;
    cardImage.alt = initialCard.name;
    cardElement.querySelector('.card__title').textContent = initialCard.name;

    const cardButton = cardElement.querySelector('.card__delete-button');
    cardButton.addEventListener('click', deletCard);

    cardElement.querySelector('.card__like-button').addEventListener('click', likeCard);
    
    cardImage.addEventListener('click', showImg);

    return cardElement
};

function deletCard(evt) {
    const cardDelete = evt.target.closest('.card');
    cardDelete.remove();
};

function likeCard(evt) {
   evt.target.classList.toggle('card__like-button_is-active')
};

export{addCard, deletCard, likeCard};