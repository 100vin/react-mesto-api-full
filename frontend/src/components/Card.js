import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }
  
  return (
    <li className="elements__item element">
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <button
        className="element__remove-button"
        type="button"
        title="Удалить"
        hidden={!isOwn}
        onClick={handleDeleteClick}
      ></button>
      <div className="element__info">
        <h2 className="element__name">{card.name}</h2>
        <div className="element__like">
          <button 
            className={`element__like-button ${isLiked ? 'element__like-button_active' : ''}`}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <span className="element__like-amount">{card.likes.length}</span>
        </div>
      </div>
    </li>
  )
}

export default Card;