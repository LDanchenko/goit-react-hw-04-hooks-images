import { Component } from 'react';
import { SearchBar } from './Searchbar';
import getImages from 'services/pixabay-api';

class App extends Component {
  state = {};

  async componentDidMount() {
    //не тут? кинуть try catch
    const images = await getImages();
    console.log(images);
  }

  render() {
    return <SearchBar></SearchBar>;
  }
}

export { App };
