import axios from 'axios';

const API_KEY = '25783714-0135377c0233244c5a1a5a437';
const API_URL = 'https://pixabay.com/api/';

const fetchImages = query => {
  const images = axios.get(API_URL, {
    params: {
      key: API_KEY,
      q: query.queryString,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: query.page,
      per_page: 12,
    },
  });

  return images;
};

export default fetchImages;
