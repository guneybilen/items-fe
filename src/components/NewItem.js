import { useStoreActions, useStoreState } from 'easy-peasy';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const NewPost = () => {
  const loggedInId = localStorage.getItem('loggedInId');
  console.log(loggedInId);
  const history = useNavigate();

  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [entry, setEntry] = useState('');
  const [price, setPrice] = useState('');
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);

  const savePost = useStoreActions((actions) => actions.savePost);

  const loggedInNickname = useStoreState((state) => state.loggedInNickname);
  const handleSubmit = (e) => {
    e.preventDefault();

    let form_data = new FormData();
    form_data.append('item_image1', image1);
    form_data.append('item_image2', image2);
    form_data.append('item_image3', image3);
    form_data.append('brand', brand);
    form_data.append('price', price);
    form_data.append('entry', entry);
    form_data.append('model', model);
    form_data.append('seller', loggedInId);

    // const newPost = {
    //   brand: brand,
    //   model: model,
    //   price: price,
    //   entry: entry,
    //   seller: loggedInId,
    //   item_image1: image1,
    //   item_image2: image2,
    //   item_image3: image3,
    // };
    savePost(form_data);
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
          encType="multipart/form-data"
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
          <label htmlFor="image1">image1:</label>
          <input
            type="file"
            id="image1"
            alt="item"
            name="image"
            accept="image/*"
            onChange={(e) => setImage1(e.target.files[0])}
          />
          <label htmlFor="image2">image2:</label>
          <input
            type="file"
            id="image2"
            alt="item"
            name="image"
            accept="image/*"
            onChange={(e) => setImage2(e.target.files[0])}
          />
          <label htmlFor="image3">image3:</label>
          <input
            type="file"
            id="image3"
            alt="item"
            name="image"
            accept="image/*"
            onChange={(e) => setImage3(e.target.files[0])}
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
