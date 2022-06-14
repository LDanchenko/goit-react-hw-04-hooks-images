import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import toastConfig from 'services/toast-config.js';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import { FaSearch } from 'react-icons/fa';

import style from './Searchbar.module.css';

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    if (query === '') {
      toast.error('Please enter the correct value', toastConfig);
    } else {
      onSubmit && onSubmit(query);
    }
    setQuery('');
  };

  return (
    <>
      <header className={style.header}>
        <form className={style.form} onSubmit={handleSubmit}>
          <button type="submit" className={style.button}>
            <FaSearch className={style.icon} size={13} />
          </button>
          <input
            className={style.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={e => setQuery(e.target.value.trim())}
            value={query}
          />
        </form>
      </header>
      <ToastContainer />
    </>
  );
};

export { SearchBar };

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
