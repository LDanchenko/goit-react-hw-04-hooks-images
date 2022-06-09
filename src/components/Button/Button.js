import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ onLoadMore }) => {
  return (
    <button type="button" className={styles.button} onClick={onLoadMore}>
      Load more
    </button>
  );
};
export { Button };

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
