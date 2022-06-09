import styles from './Button.module.css';
const Button = ({ onLoadMore }) => {
  return (
    <button type="button" className={styles.button} onClick={onLoadMore}>
      Load more
    </button>
  );
};
export { Button };
