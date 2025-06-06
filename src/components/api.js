const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-39',
    headers: {
        authorization: '90dea62b-865f-426a-99cc-44e9c2863e6b',
        "Content-Type": "application/json"
    }
};

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
};

export function getUserData() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    }) 
    .then(checkResponse);
};

export function getInitialCard() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then(checkResponse);
};

export function editProfile(name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({name, about})
    })
    .then(checkResponse);
};

export function addNewCard(name, link) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({name, link})
    })
    .then(checkResponse);
};

export function putLike(cardID) {
    return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
        method: 'PUT' ,
        headers: config.headers
    })
    .then(checkResponse);
};

export function deletLike(cardID) {
     return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
        method: 'DELETE' ,
        headers: config.headers
    })
    .then(checkResponse);
};

export function deletCard(cardID) {
    return fetch(`${config.baseUrl}/cards/${cardID}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(checkResponse);
};

export function editAvatar(avatarUrl) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({avatar:avatarUrl})
    })
    .then(checkResponse);
};