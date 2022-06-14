import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import style from './Modal.module.css';
const modalRoot = document.getElementById('modal-root');

const Modal = ({ image, query, onClose }) => {
  useEffect(() => {
    const handleKey = event => (event.code === 'Escape') & onClose();
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
    };
    // eslint-disable-next-line
  }, []);

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={style.overlay} onClick={handleBackdropClick}>
      <div className={style.modal}>
        <img src={image} alt={query} className={style.image} />
      </div>
    </div>,
    modalRoot
  );
};

export { Modal };

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
};
