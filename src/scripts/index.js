import '../pages/index.css';

import { addCard, likeCard } from '../components/card.js';

import { openModal, closeModal } from '../components/modal.js';

import { enableValidation, clearValidation } from '../components/validation.js';

import { getUserData, getInitialCard, editProfile, addNewCard, editAvatar } from '../components/api.js';

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
const avatarImage = document.querySelector('.profile__image');

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

const avatarPopup = document.querySelector('.popup_type_avatar');
const avatarForm = document.forms['avatar-form'];
const avatarInput = avatarPopup.querySelector('.popup__input_type_avatar-url');
const openAvatarBtn = document.querySelector('.profile__avatar-edit-button');
const closeAvatarBtn = avatarPopup.querySelector('.popup__close');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

function renderLoading(isLoading, buttonElement, loadingText = 'Сохранение...') {
    const originalText = buttonElement.dataset.originalText || buttonElement.textContent;

    if(isLoading) {
        buttonElement.dataset.originalText = originalText;
        buttonElement.textContent = loadingText;
    } else {
        buttonElement.textContent = buttonElement.dataset.originalText;
    }
};

// Модальное окно редактирование аватара

openAvatarBtn.addEventListener('click', function() {
    avatarForm.reset();
    clearValidation(avatarForm, validationConfig);
    openModal(avatarPopup);
});

function handleAvatarSubmit(evt) {
    evt.preventDefault();
    const avatarUrl = avatarInput.value;
    const saveButton = avatarForm.querySelector('.popup__button')
    renderLoading(true, saveButton);

    editAvatar(avatarUrl)
        .then((res) => {
            avatarImage.style.backgroundImage = `url(${res.avatar})`;
            closeModal(avatarPopup);
            avatarForm.reset();
        })
        .catch((error) => {
            console.log('Ошибка при обновлении аватара:', error);
        })
        .finally(() => {
            renderLoading(false, saveButton);
        })
}

avatarForm.addEventListener('submit', handleAvatarSubmit);

closeAvatarBtn.addEventListener('click', function () {
    closeModal(avatarPopup)
});

// Модальное окно редактирование профиля
function fillInputsProfile() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
};

function handleFormSubmit(evt) {
    evt.preventDefault();

    const name = nameInput.value.trim();
    const about = jobInput.value.trim();
    
    const saveButton = profileForm.querySelector('.popup__button')
    renderLoading(true, saveButton);

    editProfile(name, about)
    .then((userData) => {
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        closeModal(profilePopup);
    })
    .catch(error => {
        console.log('Ошибка при обновлении профиля:', error);
    })
    .finally(() => {
        renderLoading(false, saveButton);
    })
};

profileForm.addEventListener('submit', handleFormSubmit);

openProfileBtn.addEventListener('click', function () {
    fillInputsProfile()
    clearValidation(profileForm, validationConfig)
    openModal(profilePopup);
});

closeProfileBtn.addEventListener('click', function () {
    closeModal(profilePopup)
});

// Модальное окно добавления карточек
function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const saveButton = cardForm.querySelector('.popup__button')
    renderLoading(true, saveButton);

    const name = titlInput.value;
    const link = linkInput.value;
    addNewCard(name, link)
        .then(card => {
            const newCard = addCard(card, likeCard, showImg, card.owner._id);
            cardContainer.prepend(newCard);
            cardForm.reset();
            closeModal(cardPopup)
        })
        .catch(error => {
        console.log('Ошибка при добавлении карточки:', error);
        })
        .finally(() => {
            renderLoading(false, saveButton);
        })
};

cardForm.addEventListener('submit', handleCardFormSubmit);

openCardBtn.addEventListener('click', function () {
    clearValidation(cardForm, validationConfig)
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

enableValidation(validationConfig);

Promise.all([getUserData(), getInitialCard()])
    .then(([userData, cards]) => {
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        avatarImage.style.backgroundImage = `url(${userData.avatar})`;
        
        cards.reverse().forEach(card => {
            const cardElement = addCard(card, likeCard, showImg, userData._id);
            cardContainer.prepend(cardElement);
        });
    })
    .catch((error) => {
        console.log('Ошибка при загрузке данных с сервера:', error)
    });
    