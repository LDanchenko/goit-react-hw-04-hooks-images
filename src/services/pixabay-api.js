import axios from 'axios';

const API_KEY = '25783714-0135377c0233244c5a1a5a437';
const API_URL = 'https://pixabay.com/api/';

const getImages = () => {
  const images = axios.get(API_URL, {
    params: {
      key: API_KEY,
      q: 'cat',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: 1,
      per_page: 12,
    },
  });

  return images;
};

export default getImages;
