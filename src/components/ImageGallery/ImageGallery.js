import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import style from './ImageGallery.module.css';

const ImageGallery = ({ imagesList, onClick }) => {
  return (
    <ul className={style.gallery} onClick={onClick}>
      {imagesList.map(image => (
        <ImageGalleryItem
          key={image.id}
          id={image.id}
          src={image.webformatURL}
          alt={image.tag}
        />
      ))}
    </ul>
  );
};

export { ImageGallery };

ImageGallery.propTypes = {
  imagesList: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
