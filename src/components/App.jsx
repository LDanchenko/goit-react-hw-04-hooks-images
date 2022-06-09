import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Component } from 'react';
import { SearchBar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { RestAPI } from 'services/restapi';
// import getImages from 'services/pixabay-api';
import toastConfig from 'services/toast-config.js';
const PERPAGE = 12;
const restApi = new RestAPI(PERPAGE);

class App extends Component {
  state = {
    images: [],
    query: '',
    total: 0,
  };

  handleForm = async query => {
    restApi.setQuery(query);
    restApi.resetPage();
    const data = await this.getImages();
    this.setState({ query, images: data.images, total: data.total });
    console.log(restApi);
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
    const images = await this.getApiData(this.state.query);
    console.log(images);
    let imageData = [];
    let total = 0;
    if (images) {
      imageData = images.hits.map(image => {
        return {
          id: image.id,
          webformatURL: image.webformatURL,
          largeImageURL: image.largeImageURL,
          tag: image.tags,
        };
      });
      total = images.total;
    }
    return { images: imageData, total };
  };

  handleOnLoadMoreClick = async () => {
    restApi.nextPage();
    const data = await this.getImages();
    this.setState(prevState => {
      return { images: [...prevState.images, ...data.images] };
    });
  };

  render() {
    console.log(restApi);
    return (
      <>
        <SearchBar onSubmit={this.handleForm} />
        {this.state.images.length > 0 && (
          <ImageGallery images={this.state.images} />
        )}
        {this.state.images.length < this.state.total && (
          <Button onLoadMore={this.handleOnLoadMoreClick} />
        )}
        <ToastContainer />
      </>
    );
  }
}

export { App };
