import axios from 'axios';
import { createStore, action, thunk, computed } from 'easy-peasy';
// import api from './api/items';

export default createStore({
  items: [],
  setItems: action((state, payload) => {
    state.items = payload;
  }),

  // setItemsComputed: computed((data, response, slug) => {
  //   data.items.map((item) =>
  //     item.slug === slug ? { ...response.data } : item
  //   );
  // }),

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

  // savePost: thunk(async (actions, newItem, helpers) => {
  //   const { items } = helpers.getState();
  //   try {
  //     const response = await api.post(
  //       `http://localhost:8000/api/items`,
  //       newItem
  //     );
  //     actions.setItems(() => [...items, response.data]);
  //     actions.setSlug('');
  //     actions.setBrand('');
  //     actions.setPhone('');
  //     actions.setPrice('');
  //     actions.setSeller('');
  //     actions.setEmail('');
  //     actions.setCreatedAt('');
  //     actions.setEntry('');
  //   } catch (err) {
  //     console.log(`Error: ${err.message}`);
  //   }
  // }),

  // deletePost: thunk(async (actions, id, helpers) => {
  //   const { items } = helpers.getState();
  //   try {
  //     await api.delete(`http://localhost:8000/item/${id}`);
  //     actions.setItems(() => items.filter((items) => items.id !== id));
  //   } catch (err) {
  //     console.log(`Error: ${err.message}`);
  //   }
  // }),

  editItem: thunk(async (actions, updatedItem, helpers) => {
    const { items } = helpers.getState();

    const { sluggedName } = updatedItem;

    try {
      const response = await axios.put(
        `http://localhost:8000/api/items/${sluggedName}/`,
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
        items.map((item) =>
          item.slug === sluggedName ? { ...response.data } : item
        )
      );

      actions.setSlug(response.data.slug);
      // actions.setBrand('');
      // actions.setPhone('');
      // actions.setPrice('');
      // actions.setSeller('');
      // actions.setEmail('');
      // actions.setCreatedAt('');
      // actions.setEntry('');
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  }),
});
