import axios from 'axios';
import { createStore, action, thunk, computed } from 'easy-peasy';
// import api from './api/items';

export default createStore({
  user: '',
  setUser: action((state, payload) => {
    state.user = payload;
  }),

  nickname: '',
  setNickname: action((state, payload) => {
    state.nickname = payload;
  }),

  id: '',
  setId: action((state, payload) => {
    state.id = payload;
  }),

  username: '',
  setUsername: action((state, payload) => {
    state.username = payload;
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

  email: '',
  setEmail: action((state, payload) => {
    state.email = payload;
  }),

  phone: '',
  setPhone: action((state, payload) => {
    state.phone = payload;
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

  search: '',
  setSearch: action((state, payload) => {
    state.search = payload;
  }),
  searchResults: [],
  setSearchResults: action((state, payload) => {
    state.searchResults = payload;
  }),

  itemCount: computed((state) => state.items.length),

  getItemById: computed((state) => {
    // console.log('state ', state);
    return (slug) => state.items.find((item) => item.slug.toString() === slug);
  }),

  savePost: thunk(async (actions, newItem, helpers) => {
    const { items } = helpers.getState();
    try {
      const response = await axios.post(
        `http://localhost:8000/api/items/`,
        newItem,
        {
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            Authorization: `JWT ${localStorage.getItem('access')}`,
          },
        }
      );
      actions.setItems([...items, response.data]);
      actions.setSlug('');
      actions.setBrand('');
      actions.setPhone('');
      actions.setPrice('');
      actions.setModel('');
      actions.setEntry('');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }),

  deleteItem: thunk(async (actions, slug, helpers) => {
    const { items } = helpers.getState();
    try {
      await axios.delete(`http://localhost:8000/api/items/${slug}`, {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          Authorization: `JWT ${localStorage.getItem('access')}`,
        },
      });
      actions.setItems(items.filter((items) => items.slug !== slug));
      actions.setBrand('');
      actions.setPhone('');
      actions.setPrice('');
      actions.setModel('');
      actions.setEntry('');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }),

  editItem: thunk(async (actions, updatedItem, helpers) => {
    const { items } = helpers.getState();

    const { slug } = updatedItem;

    try {
      const response = await axios.put(
        `http://localhost:8000/api/items/${slug}/`,
        updatedItem,
        {
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            Authorization: `JWT ${localStorage.getItem('access')}`,
          },
        }
      );

      actions.setItems(
        items.map((item) => (item.slug === slug ? { ...response.data } : item))
      );

      actions.setSlug('');
      actions.setBrand('');
      actions.setPhone('');
      actions.setPrice('');
      actions.setModel('');
      // actions.setSeller('');
      // actions.setEmail('');
      // actions.setCreatedAt('');
      actions.setEntry('');
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  }),
});
