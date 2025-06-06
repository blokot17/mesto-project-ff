import { putLike, deletLike, deletCard } from '../components/api.js';

function addCard(initialCard, likeCard, showImg, userId) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCount = cardElement.querySelector('.card__like-count');

    cardImage.src = initialCard.link;
    cardImage.alt = initialCard.name;
    cardElement.querySelector('.card__title').textContent = initialCard.name;

    likeCount.textContent = initialCard.likes.length;

    if (initialCard.likes.length > 0) {
        likeCount.classList.add('card__like-count_visible');
    }

    if (initialCard.likes.some(user => user._id === userId)) {
        likeButton.classList.add('card__like-button_is-active');
    }
    likeButton.addEventListener('click', (evt) => {
        likeCard(evt, initialCard, userId, updateLikeUI);
    })
    
    if (initialCard.owner._id === userId) {
        deleteButton.addEventListener('click', () => {
            deletCard(initialCard._id)
            .then(() => {
                cardElement.remove();
            })
            .catch(error => {
                console.log('Ошибка при удалении карточки:', error);
            });
        });
    } else {
        deleteButton.remove()
    }

    cardImage.addEventListener('click', showImg);

    return cardElement;
};

function likeCard(evt, initialCard, userId, updateLikeUI) {
  const isLiked = evt.target.classList.contains('card__like-button_is-active');
  const likeAction = isLiked ? deletLike : putLike;

  likeAction(initialCard._id)
    .then(updatedCard => {
        initialCard.likes = updatedCard.likes;
        updateLikeUI(evt.target, updatedCard.likes.length, updatedCard.likes, userId);
    })
    .catch(error => {
      console.log('Ошибка при изменении лайка:', error);
    });
}

function updateLikeUI(button, count, likes, userId) {
    const likeCounter = button.closest('.card').querySelector('.card__like-count');
     likeCounter.textContent = count;
        if (count > 0) {
            likeCounter.classList.add('card__like-count_visible');
        } else {
            likeCounter.classList.remove('card__like-count_visible');
         }

    const isLiked = likes.some(user => user._id === userId);
    button.classList.toggle('card__like-button_is-active', isLiked);
}

export{addCard, likeCard};