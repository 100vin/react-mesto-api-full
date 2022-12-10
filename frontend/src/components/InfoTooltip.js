import icon_success from '../images/success_icon.svg';
import icon_error from '../images/error_icon.svg';

function InfoTooltip({ isOpen, onClose, type='success', message='Готово' }) {
  const icons = {
    success: icon_success,
    error: icon_error
  }
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`} id="popupTooltip">
      <div className="popup__container popup__container_type_tooltip">
        <button className="popup__close-button" type="button" onClick={onClose}></button>
        <img className="popup__tooltip-icon" src={icons[type]} alt="" />
        <p className="popup__tooltip-message">{message}</p>
      </div>
    </div>
  )
}

export default InfoTooltip;