import { useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import s from './App.module.css';
import PropTypes from 'prop-types';

export default function App() {
  const [request, setRequest] = useState('');
  const formSubmitHandler = request => {
    setRequest(request);
  };

  return (
    <div className={s.App}>
      <Searchbar onSubmitData={formSubmitHandler} />
      <ImageGallery request={request} />
    </div>
  );
}

App.propTypes = {
  request: PropTypes.string,
  formSubmitHandler: PropTypes.func,
};
