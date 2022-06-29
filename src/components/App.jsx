import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import pixabayAPI from '../Services/pixabay-api';
import { useState, useEffect } from 'react';

export default function App() {
  const [searchRequest, setSearchRequest] = useState('');
  const [images, setImages] = useState([]);
  const [galleryPage, setGalleryPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(null);

  useEffect(() => {
    const updateImages = (searchRequest, galleryPage) => {
      setIsLoading(true);
      try {
        pixabayAPI(searchRequest, galleryPage).then(data => {
          if (!data.data.hits.length) {
            return alert('There is no images found with that search request');
          }
          const mappedImages = data.data.hits.map(
            ({ id, webformatURL, tags, largeImageURL }) => ({
              id,
              webformatURL,
              tags,
              largeImageURL,
            })
          );
          setImages(i => [...i, ...mappedImages]);
        });
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (searchRequest !== '' || galleryPage !== 1) {
      updateImages(searchRequest, galleryPage);
    }
  }, [searchRequest, galleryPage]);

  const handleSearchSubmit = value => {
    if (value !== searchRequest) {
      setSearchRequest(value);
      setImages([]);
      setGalleryPage(1);
      return;
    }
  };

  const loadMore = () => {
    setGalleryPage(galleryPage + 1);
  };

  const openModalImage = id => {
    const image = images.find(image => image.id === id);
    setShowModal({
      largeImageURL: image.largeImageURL,
      tags: image.tags,
    });
  };

  const closeModalImage = () => {
    setShowModal(null);
  };

  return (
    <>
      <Searchbar onSearch={handleSearchSubmit} />
      {error && alert(`Whoops, something went wrong: ${error.message}`)}
      {isLoading && <Loader color={'#3f51b5'} size={32} />}
      {images.length > 0 && (
        <>
          <ImageGallery images={images} handlePreview={openModalImage} />
          <Button loadMore={loadMore} />
        </>
      )}
      {showModal && (
        <Modal
          lgImage={showModal.largeImageURL}
          tags={showModal.tags}
          closeModal={closeModalImage}
        />
      )}
    </>
  );
}
