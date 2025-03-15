import '../pages/index.css';

import { addCard, deletCard, likeCard } from '../components/card.js';

import { initialCards } from '../components/cards.js'

import { openModal, closeModal } from '../components/modal.js'

const container = document.querySelector('.content');
const cardSection = container.querySelector('.places')
const cardContainer = cardSection.querySelector('.places__list');

const profilePopup = document.querySelector('.popup_type_edit');
const openProfileBtn = document.querySelector('.profile__edit-button');
const closeProfileBtn = profilePopup.querySelector('.popup__close');

const profileForm = document.forms['edit-profile'];
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const cardPopup = document.querySelector('.popup_type_new-card');
const openCardBtn = document.querySelector('.profile__add-button');
const closeCardBtn = cardPopup.querySelector('.popup__close');

const cardForm = document.forms['new-place'];
const titlInput = cardForm.querySelector('.popup__input_type_card-name');
const linkInput = cardForm.querySelector('.popup__input_type_url');

const imgPopup = document.querySelector('.popup_type_image');
const closeImgPopup = imgPopup.querySelector('.popup__close');
const zoomImgPopup = imgPopup.querySelector('.popup__image');
const textImgPopup = imgPopup.querySelector('.popup__caption');

initialCards.forEach(function (initialCard) {
    const newCard = addCard(initialCard, deletCard, likeCard, showImg);
    cardContainer.append(newCard);
});

// Модальное окно редактирование профиля
function fillInputsProfile() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
};

function handleFormSubmit(evt) {
    evt.preventDefault();

    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    closeModal(profilePopup)
};

profileForm.addEventListener('submit', handleFormSubmit);

openProfileBtn.addEventListener('click', function () {
    openModal(profilePopup);
    fillInputsProfileill();
});

closeProfileBtn.addEventListener('click', function () {
    closeModal(profilePopup)
});

// Модальное окно добавления карточек
function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const item = {
        link: linkInput.value,
        name: titlInput.value
    };
    const newCard = addCard(item, deletCard, likeCard, showImg, initialCards);

    cardContainer.prepend(newCard);
    cardForm.reset();

    closeModal(cardPopup)
};

cardForm.addEventListener('submit', handleCardFormSubmit);

openCardBtn.addEventListener('click', function () {
    openModal(cardPopup)
});

closeCardBtn.addEventListener('click', function () {
    closeModal(cardPopup)
});

// Модальноу окно увеличения картинок
closeImgPopup.addEventListener('click', function () {
    closeModal(imgPopup)
});

function showImg(evt) {
        openModal(imgPopup);

        zoomImgPopup.setAttribute('src', evt.target.src);
        zoomImgPopup.setAttribute('alt', evt.target.alt);
        textImgPopup.textContent = evt.target.alt
};

// Анимация модальных окон
document.querySelectorAll('.popup').forEach(function (element) {
    element.classList.add('popup_is-animated')
});