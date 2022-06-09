import { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import style from './Modal.module.css';
const modalRoot = document.getElementById('modal-root');

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKey);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKey);
  }

  handleKey = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={style.overlay} onClick={this.handleBackdropClick}>
        <div className={style.modal}>
          <img
            src={this.props.image}
            alt={this.props.query}
            className={style.image}
          />
        </div>
      </div>,
      modalRoot
    );
  }
}

export { Modal };

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
};
