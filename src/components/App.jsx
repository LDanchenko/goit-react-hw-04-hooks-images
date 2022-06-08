import { Component } from 'react';
import { SearchBar } from './Searchbar';
import getImages from 'services/pixabay-api';

class App extends Component {
  async componentDidMount() {
    //не тут? кинуть try catch
    const images = await getImages();
    console.log(images);
  }

  searchImages = query => {
    console.log(query);
  };

  render() {
    return (
      <>
        <SearchBar onSubmit={this.searchImages} />
      </>
    );
  }
}

export { App };
