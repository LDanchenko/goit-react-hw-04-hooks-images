import { Component } from 'react';
import getImages from 'services/pixabay-api';
class App extends Component {
  async componentDidMount() {
    //не тут? кинуть try catch
    const images = await getImages();
    console.log(images);
  }

  render() {
    return <div>hello</div>;
  }
}

export { App };
