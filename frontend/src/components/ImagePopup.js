function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_show-photo ${card ? 'popup_opened' : ''}`} id="popupShowPhoto">
      <figure className="popup__figure">
        <button className="popup__close-button" type="button" onClick={onClose}></button>
        <img className="popup__photo" src={card?.link} alt={card?.name} />
        <figcaption className="popup__caption">{card?.name}</figcaption>
      </figure>
    </div>
  )
}

export default ImagePopup;