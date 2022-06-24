import s from './ImageGalleryItem.module.css';

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
