// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const container = document.querySelector('.content');
const cardSection = container.querySelector('.places')
const cardContainer = cardSection.querySelector('.places__list');

function addCard(initialCards, deletCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    
    cardElement.querySelector('.card__image').src = initialCards.link;
    cardElement.querySelector('.card__image').alt = initialCards.name;
    cardElement.querySelector('.card__title').textContent = initialCards.name;

    cardContainer.append(cardElement);

    const cardDelet = cardElement.querySelector('.card__delete-button');
    cardDelet.addEventListener('click', deletCard);

}

function deletCard(){
    const cardElement = document.querySelector('.card');
    cardElement.remove();
}

initialCards.forEach(function(cardElement) {
    addCard(cardElement, deletCard)
});
