import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Component } from 'react';
import { FaSearch } from 'react-icons/fa';

import style from './Searchbar.module.css';

class SearchBar extends Component {
  state = {
    query: '',
  };

  handleInputChange = e => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const query = this.state.query.trim();
    if (query === '') {
      toast.error('Please enter the correct value', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      this.props.onSubmit && this.props.onSubmit(query);
    }
    this.reset();
  };

  reset = () => {
    this.setState({ query: '' });
  };

  render() {
    return (
      <>
        <header className={style.header}>
          <form className={style.form} onSubmit={this.handleSubmit}>
            <button type="submit" className={style.button}>
              <FaSearch className={style.icon} size={13} />
            </button>
            <input
              className={style.input}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              onChange={this.handleInputChange}
              value={this.state.query}
            />
          </form>
        </header>
        <ToastContainer />
      </>
    );
  }
}

export { SearchBar };
