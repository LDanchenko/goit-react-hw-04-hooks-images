import { ImageGalleryItem } from 'components/ImageGalleryItem';
import style from './ImageGallery.module.css';

const ImageGallery = ({ images }) => {
  return (
    <ul className={style.gallery}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          src={image.webformatURL}
          alt={image.tag}
        />
      ))}
    </ul>
  );
};

export { ImageGallery };
