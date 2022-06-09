import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { TailSpin } from 'react-loader-spinner';
import { Component } from 'react';
import { SearchBar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { RestAPI } from 'services/restapi';
import toastConfig from 'services/toast-config.js';
import styles from './App.module.css';
const PERPAGE = 12;
const restApi = new RestAPI(PERPAGE);

class App extends Component {
  state = {
    images: [],
    query: '',
    total: 0,
    loading: false,
  };

  handleForm = async query => {
    this.setState({ loading: true });
    restApi.setQuery(query);
    restApi.resetPage();
    const data = await this.getImages();
    this.setState({
      query,
      images: data.images,
      total: data.total,
      loading: false,
    });
  };

  getApiData = async query => {
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

  getImages = async () => {
    const data = await this.getApiData(this.state.query);
    let images = [];
    let total = 0;
    if (data) {
      images = data.hits.map(image => {
        return {
          id: image.id,
          webformatURL: image.webformatURL,
          largeImageURL: image.largeImageURL,
          tag: image.tags,
        };
      });
      total = data.total;
    }
    return { images, total };
  };

  handleOnLoadMoreClick = async () => {
    this.setState({ loading: true });
    restApi.nextPage();
    const data = await this.getImages();
    this.setState(prevState => {
      return { images: [...prevState.images, ...data.images], loading: false };
    });
  };

  render() {
    const { images, total, loading } = this.state;
    let button;
    if (loading) {
      button = (
        <div className={styles.loading}>
          <TailSpin color="#00BFFF" height={40} width={40} />
        </div>
      );
    } else if (!loading && images.length < total) {
      button = <Button onLoadMore={this.handleOnLoadMoreClick} />;
    }
    return (
      <>
        <SearchBar onSubmit={this.handleForm} />
        {images.length > 0 && <ImageGallery images={images} />}
        {button}
        <ToastContainer />
      </>
    );
  }
}

export { App };
