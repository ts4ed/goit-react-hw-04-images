import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({
  imageLink,
  imageAlt,
  largeImageURL,
  onClick,
}) {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        src={imageLink}
        alt={imageAlt}
        data-large={largeImageURL}
        className={s.ImageGalleryItem__image}
        onClick={onClick}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  imageLink: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
