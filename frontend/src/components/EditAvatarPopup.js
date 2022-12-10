import { useEffect, useRef } from 'react';
import PopupWithForm from "./PopupWithForm ";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = ''
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm
      name="EditAvatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        id="input-avatarlink"
        name="link"
        type="url"
        placeholder="Ссылка на аватар"
        required
        ref={avatarRef}
      />
      <span
        className="popup__input-error"
        id="input-avatarlink-error"
      ></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;