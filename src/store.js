import axios from 'axios';
import { createStore, action, thunk, computed } from 'easy-peasy';

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';

let dest;
if (process.env.NODE_ENV === 'development') {
  dest = 'http://localhost:8000/api';
} else {
  dest = 'https://justlikenew-vaauo.ondigitalocean.app/api';
}

export default createStore({
  loggedInNickname: '',
  setLoggedInNickname: action((state, payload) => {
    state.loggedInNickname = payload;
  }),

  sellerNickname: '',
  setSellerNickname: action((state, payload) => {
    state.sellerNickname = payload;
  }),

  loggedInID: '',
  setLoggedInID: action((state, payload) => {
    state.loggedInID = payload;
  }),

  items: [],
  setItems: action((state, payload) => {
    state.items = payload;
  }),

  slug: '',
  setSlug: action((state, payload) => {
    state.slug = payload;
  }),

  brand: '',
  setBrand: action((state, payload) => {
    state.brand = payload;
  }),

  model: '',
  setModel: action((state, payload) => {
    state.model = payload;
  }),

  price: 0,
  setPrice: action((state, payload) => {
    state.price = payload;
  }),

  entry: '',
  setEntry: action((state, payload) => {
    state.entry = payload;
  }),

  createdAt: '',
  setCreatedAt: action((state, payload) => {
    state.createdAt = payload;
  }),

  seller: '',
  setSeller: action((state, payload) => {
    state.seller = payload;
  }),

  image1: '',
  setImage1: action((state, payload) => {
    state.image1 = payload;
  }),

  image2: '',
  setImage2: action((state, payload) => {
    state.image2 = payload;
  }),

  image3: '',
  setImage3: action((state, payload) => {
    state.image3 = payload;
  }),

  search: '',
  setSearch: action((state, payload) => {
    state.search = payload;
  }),
  searchResults: [],
  setSearchResults: action((state, payload) => {
    state.searchResults = payload;
  }),

  itemCount: computed((state) =>
    state.items?.length > 0 ? state.items.length : 0
  ),

  getItemById: computed((state) => {
    // console.log('state ', state);
    return (slug) => state.items.find((item) => item.slug.toString() === slug);
  }),

  savePost: thunk(async (actions, newItem, helpers) => {
    const { items } = helpers.getState();
    try {
      let response = await axios.post(`${dest}/item/`, newItem, {
        headers: {
          'Content-Type': 'multipart/form-data',
          accept: 'application/json',
          access: `Bearer ${localStorage.getItem('access')}`,
          refresh: `Bearer ${localStorage.getItem('refresh')}`,
        },
      });
      actions.setItems([...items, response.data]);
      actions.setSlug('');
      actions.setBrand('');
      actions.setPrice('');
      actions.setModel('');
      actions.setEntry('');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }),

  deleteItem: thunk(async (actions, info, helpers) => {
    const { items } = helpers.getState();
    const { slug, nickname } = info;

    try {
      await axios.delete(
        `${dest}/items/${slug}`,
        { data: { nickname: nickname } },
        {
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            access: `Bearer ${localStorage.getItem('access')}`,
            refresh: `Bearer ${localStorage.getItem('refresh')}`,
          },
        }
      );
      actions.setItems(items.filter((items) => items.slug !== slug));
      actions.setBrand('');
      actions.setPrice('');
      actions.setModel('');
      actions.setEntry('');
      actions.setImage1('');
      actions.setImage2('');
      actions.setImage3('');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }),

  editItem: thunk(async (actions, updatedItem, helpers) => {
    const { items } = helpers.getState();

    const slug = updatedItem.sluggy;
    const form_data = updatedItem.form_data;

    try {
      let response = await axios.put(`${dest}/items/${slug}/`, form_data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          access: `Bearer ${localStorage.getItem('access')}`,
          refresh: `Bearer ${localStorage.getItem('refresh')}`,
        },
      });

      actions.setItems(
        items.map((item) => (item.slug === slug ? { ...response.data } : item))
      );

      actions.setSlug('');
      actions.setBrand('');
      actions.setPrice('');
      actions.setModel('');
      actions.setEntry('');
      actions.Image1(null);
      actions.Image2(null);
      actions.Image3(null);
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  }),
});
