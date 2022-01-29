import { useStoreActions, useStoreState } from 'easy-peasy';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const NewPost = () => {
  const loggedInId = localStorage.getItem('loggedInId');
  const history = useNavigate();

  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [entry, setEntry] = useState('');
  const [price, setPrice] = useState('');

  const savePost = useStoreActions((actions) => actions.savePost);

  const loggedInNickname = useStoreState((state) => state.loggedInNickname);
  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      brand: brand,
      model: model,
      price: price,
      entry: entry,
      seller: loggedInId,
    };
    savePost(newPost);
    history('/');
  };

  return (
    loggedInNickname && (
      <main className="NewPost">
        <h2>New Item</h2>
        <form
          action=""
          className="newPostForm"
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="itemBrand">Brand:</label>
          <input
            type="text"
            id="itemBrand"
            required
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
          <label htmlFor="itemModel">Model:</label>
          <input
            type="text"
            id="itemModel"
            required
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
          <label htmlFor="itemPrice">(CAD$) Price:</label>
          <input
            type="text"
            id="itemPrice"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label htmlFor="itemBody">Entry:</label>
          <textarea
            type="text"
            id="itemBody"
            required
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
          />
          <button
            type="button"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Submit
          </button>
        </form>
      </main>
    )
  );
};

export default NewPost;
