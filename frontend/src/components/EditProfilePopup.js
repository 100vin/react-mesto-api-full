import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from "./PopupWithForm ";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="EditProfile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        id="input-name"
        name="name"
        type="text"
        minLength="2"
        maxLength="40"
        placeholder="Имя"
        required
        value={name}
        onChange={handleChangeName}
      />
      <span
        className="popup__input-error"
        id="input-name-error"
      ></span>
      <input
        className="popup__input"
        id="input-job"
        name="job"
        type="text"
        minLength="2"
        maxLength="200"
        placeholder="О себе"
        required
        value={description}
        onChange={handleChangeDescription}
      />
      <span
        className="popup__input-error"
        id="input-job-error"
      ></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;