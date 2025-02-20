// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const container = document.querySelector('.content');
const cardSection = container.querySelector('.places')
const cardContainer = cardSection.querySelector('.places__list');

function addCard(initialCard, deletCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    
    cardImage.src = initialCard.link;
    cardImage.alt = initialCard.name;
    cardElement.querySelector('.card__title').textContent = initialCard.name;

    const cardButton = cardElement.querySelector('.card__delete-button');
    cardButton.addEventListener('click', deletCard);

    return cardElement
}

function deletCard(event) {
    const cardDelete = event.target.closest('.card');
    cardDelete.remove();
}

initialCards.forEach(function(initialCard) {
    const newCard = addCard(initialCard, deletCard);
    cardContainer.append(newCard);
});
