import { useEffect, useState } from 'react';
import PopupWithForm from "./PopupWithForm ";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setTitle('');
    setLink('');
  }, [isOpen]);

  function handleChangeTitle(e) {
    setTitle(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      title,
      link,
    });
  }

  return (
    <PopupWithForm
      name="AddCard"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        id="input-title"
        name="title"
        type="text"
        minLength="2"
        maxLength="30"
        placeholder="Название"
        required
        value={title}
        onChange={handleChangeTitle}
      />
      <span
        className="popup__input-error"
        id="input-title-error"
      ></span>
      <input
        className="popup__input"
        id="input-link"
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        required
        value={link}
        onChange={handleChangeLink}
      />
      <span
        className="popup__input-error"
        id="input-link-error"
      ></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;