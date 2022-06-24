import { useState } from 'react';
import s from './Searchbar.module.css';
import PropTypes from 'prop-types';

export default function Searchbar({ onSubmitData }) {
  const [search, setSearch] = useState('');

  const searchForm = e => {
    e.preventDefault();
    if (search.trim() === '') {
      alert('Введите запрос');
      return;
    }
    onSubmitData(search);
    setSearch('');
  };
  const handleChangeInput = e => {
    setSearch(e.currentTarget.value);
  };
  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={searchForm}>
        <button type="submit" className={s.SearchForm__button}>
          <span className="button-label">Search</span>
        </button>

        <input
          className={s.SearchForm__input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChangeInput}
          value={search}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  searchForm: PropTypes.func,
  handleChangeInput: PropTypes.func,
  search: PropTypes.string,
};
