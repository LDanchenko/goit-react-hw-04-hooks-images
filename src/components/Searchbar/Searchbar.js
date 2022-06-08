import { FaSearch } from 'react-icons/fa';

import style from './Searchbar.module.css';

const SearchBar = ({ onSubmit }) => (
  <header className={style.header}>
    <form className={style.form}>
      {/* //onSubmit={this.handleSubmit} */}
      <button type="submit" className={style.button}>
        <FaSearch className={style.icon} size={13} />
      </button>
      <input
        className={style.input}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
      />
    </form>
  </header>
);

export { SearchBar };
