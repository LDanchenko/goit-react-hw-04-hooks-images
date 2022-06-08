import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Component } from 'react';
import { SearchBar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import getImages from 'services/pixabay-api';
import toastConfig from 'services/toast-config.js';

class App extends Component {
  state = {
    images: [],
  };

  handleForm = async query => {
    const images = await this.getApiData(query);
    console.log(images);
    if (images) {
      const imageData = images.hits.map(image => {
        return {
          id: image.id,
          webformatURL: image.webformatURL,
          largeImageURL: image.largeImageURL,
          tag: image.tags,
        };
      });
      this.setState({
        images: imageData,
      });
    }
  };

  getApiData = async query => {
    try {
      const { data } = await getImages(query);
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

  render() {
    return (
      <>
        <SearchBar onSubmit={this.handleForm} />
        {this.state.images.length > 0 && (
          <ImageGallery images={this.state.images} />
        )}
        <ToastContainer />
      </>
    );
  }
}

export { App };
