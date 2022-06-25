import { useState, useEffect } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import pixabayAPI from '../../Services/pixabay-api';
import s from './ImageGallery.module.css';
import PropTypes from 'prop-types';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function ImageGallery({ request }) {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [images, setImages] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(null);
  const KEY = '27923124-abae4833d2be49fca3c02a38e';
  const PAGE = page;
  const PER_PAGE = '12';
  const REQUEST = request;
  const lengthImg = 12;

  useEffect(() => {
    if (request) {
      if (REQUEST !== '') {
        setStatus(Status.PENDING);
        setPage(1);
        setImages(null);
        pixabayAPI(REQUEST, PAGE, KEY, PER_PAGE)
          .then(images => {
            setImages(images);
            setStatus(Status.RESOLVED);
          })
          .catch(error => {
            setError(error);
            setStatus(Status.REJECTED);
          });
      }
    }
  }, [request]);
  useEffect(() => {
    if (page === 1) {
      return;
    }
    pixabayAPI(REQUEST, PAGE, KEY, PER_PAGE).then(imageses =>
      setImages([...images, ...imageses])
    );
  }, [page]);

  useEffect(() => {
    if (page > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [page]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const hiddenModal = () => {
    setShowModal(false);
  };

  const showModalImage = id => {
    const image = images.find(image => image.id === id);
    setData({
      largeImageURL: image.largeImageURL,
      tags: image.tags,
    });
    toggleModal();
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  if (status === Status.PENDING) {
    return <Loader />;
  }
  if (status === Status.REJECTED || (images && images.length === 0)) {
    return (
      <div className={s.Error}>
        Что то пошло не так. Ваш запрос "{request}" не найден
      </div>
    );
  }
  if (status === Status.RESOLVED) {
    return (
      <div className={s.Button}>
        {showModal && (
          <Modal
            onClick={toggleModal}
            lgImage={data.largeImageURL}
            tags={data.tags}
            hiddenModal={hiddenModal}
          />
        )}
        <ul className={s.ImageGallery}>
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              imageLink={image.webformatURL}
              imageAlt={image.tags}
              largeImageURL={image.largeImageURL}
              onClick={() => showModalImage(image.id)}
            />
          ))}
        </ul>
        {images.length >= lengthImg && <Button loadMore={loadMore} />}
      </div>
    );
  }
}

ImageGallery.propTypes = {
  request: PropTypes.string.isRequired,
};
