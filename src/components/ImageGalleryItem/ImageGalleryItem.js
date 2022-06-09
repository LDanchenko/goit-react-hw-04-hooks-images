import style from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ id, src, alt }) => {
  return (
    <li className={style.galleryItem}>
      <img src={src} alt={alt} id={id} className={style.galleryImage} />
    </li>
  );
};

export { ImageGalleryItem };

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
