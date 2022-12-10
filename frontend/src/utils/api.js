import {apiToken, apiBaseUrl} from './utils.js';
class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers; 
  }

  _handleResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  // 1. Загрузка информации о пользователе
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then(this._handleResponse);
  }

  // 2. Загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(this._handleResponse);
  }

  // 3. Редактирование профиля
  changeUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(this._handleResponse);
  }

  // 4. Добавление новой карточки
  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.title,
        link: data.link
      })
    })
    .then(this._handleResponse);
  }

  // 7. Удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._handleResponse);
  }

  // 8. Постановка и снятие лайка
  toggleLike(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this._headers
    })
    .then(this._handleResponse);
  }
  
  // 9. Обновление аватара пользователя
  changeAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._handleResponse);
  }
}

const api = new Api({
  baseUrl: apiBaseUrl,
  headers: {
    authorization: apiToken,
    'Content-Type': 'application/json'
  }
});

export default api;