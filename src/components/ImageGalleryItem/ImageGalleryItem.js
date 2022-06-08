import style from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ src, alt }) => {
  return (
    <li className={style.galleryItem}>
      <img src={src} alt={alt} className={style.galleryImage} />
    </li>
  );
};

export { ImageGalleryItem };
