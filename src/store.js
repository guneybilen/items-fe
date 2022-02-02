import axios from 'axios';
import { createStore, action, thunk, computed } from 'easy-peasy';

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';

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
      const response = await axios.post(
        `https://items-fe-8xk84.ondigitalocean.app/api/item/`,
        newItem,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            accept: 'application/json',
            authorization: `Bearer ${localStorage.getItem('access')}`,
          },
        }
      );
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
    console.log('nickname', nickname);
    try {
      await axios.delete(
        `https://items-fe-8xk84.ondigitalocean.app/api/items/${slug}`,
        { data: { nickname: nickname } },
        {
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            authorization: `Bearer ${localStorage.getItem('access')}`,
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
      const response = await axios.put(
        `https://items-fe-8xk84.ondigitalocean.app/api/items/${slug}/`,
        form_data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: `Bearer ${localStorage.getItem('access')}`,
          },
        }
      );

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
