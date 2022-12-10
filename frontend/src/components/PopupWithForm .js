function PopupWithForm({ name, title, buttonText, isOpen, onClose, onSubmit, children }) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`} id={`popup${name}`}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" onClick={onClose}></button>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={`form${name}`} onSubmit={onSubmit}>
          {children}
          <button className="popup__submit" type="submit">{buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;