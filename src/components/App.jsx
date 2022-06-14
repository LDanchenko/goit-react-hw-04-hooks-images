import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { TailSpin } from 'react-loader-spinner';
import { useState, useEffect } from 'react';
import { SearchBar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { RestAPI } from 'services/restapi';
import { Modal } from './Modal';
import toastConfig from 'services/toast-config.js';
import styles from './App.module.css';

const PERPAGE = 12;
const restApi = new RestAPI(PERPAGE);

const App = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false); //effect
  const [modalImage, setModalImage] = useState(false);
  const [total, setTotal] = useState(0);
  const [images, setImages] = useState([]);

  const handleForm = async query => {
    setLoading(true);
    setImages([]);
    setTotal(0);
    restApi.setQuery(query);
    restApi.resetPage();
    setQuery(query);
  };

  useEffect(() => {
    if (!loading) {
      return;
    }
    getApiData(query)
      .then(data => handleApiData(data))
      .catch(error => console.log(error.message))
      .finally(() => setLoading(false));
  }, [query, loading]);

  const getApiData = async query => {
    try {
      const data = await restApi.fetchData(query);
      if (data.total === 0) {
        toast.error(
          'Sorry, there are no images matching your search query',
          toastConfig
        );
        return;
      }
      return data;
    } catch (error) {
      toast.error('Oops, an error occurred', toastConfig);
    }
  };

  const handleApiData = data => {
    let imageArray = [];
    if (data) {
      imageArray = data.hits.map(image => {
        return {
          id: image.id,
          webformatURL: image.webformatURL,
          largeImageURL: image.largeImageURL,
          tag: image.tags,
        };
      });
      setTotal(data.total);
      setImages(prevImages => [...prevImages, ...imageArray]);
    }
    return { images, total };
  };

  const handleOnLoadMoreClick = () => {
    restApi.nextPage();
    setLoading(true);
  };

  const showModal = event => {
    if (event.target.nodeName === 'IMG') {
      const id = Number.parseInt(event.target.id);
      const modalImage = images.find(image => image.id === id);
      setModal(true);
      setModalImage(modalImage.largeImageURL);
    }
  };

  const closeModal = () => {
    setModal(false);
    setModalImage('');
  };

  return (
    <>
      <SearchBar onSubmit={handleForm} />
      {images.length > 0 && (
        <ImageGallery imagesList={images} onClick={showModal} />
      )}
      {loading && (
        <div className={styles.loading}>
          <TailSpin color="#00BFFF" height={40} width={40} />
        </div>
      )}

      {images.length < total && <Button onLoadMore={handleOnLoadMoreClick} />}

      <ToastContainer />
      {modal && <Modal image={modalImage} query={query} onClose={closeModal} />}
    </>
  );
};

export { App };
