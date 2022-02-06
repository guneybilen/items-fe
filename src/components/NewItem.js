import { useStoreActions } from 'easy-peasy';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';

const NewPost = () => {
  const history = useNavigate();
  const scrollRef = useRef(null);

  const [show0, setShow0] = useState(false);
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(true);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [show5, setShow5] = useState(false);
  const [show6, setShow6] = useState(false);

  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [entry, setEntry] = useState('');
  const [price, setPrice] = useState('');
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [imageUpload1, setImageUpload1] = useState(null);
  const [imageUpload2, setImageUpload2] = useState(null);
  const [imageUpload3, setImageUpload3] = useState(null);
  const [error, setError] = useState('');
  const [closeButtonShouldShow, setCloseButtonShouldShow] = useState(false);

  const scrollTo = (ref) => {
    if (ref && ref.current /* + other conditions */) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const savePost = useStoreActions((actions) => actions.savePost);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('image1', image1);
    let form_data = new FormData();
    if (image1) form_data.append('item_image1', imageUpload1);
    if (image2) form_data.append('item_image2', imageUpload2);
    if (image3) form_data.append('item_image3', imageUpload3);
    form_data.append('brand', brand);
    form_data.append('price', price);
    form_data.append('entry', entry);
    form_data.append('model', model);
    form_data.append('seller', localStorage.getItem('loggedInId'));

    savePost({
      form_data: form_data,
      cb: (brandormodelerror, error, status) => {
        let error_sentence = null;
        if (brandormodelerror) {
          setError(brandormodelerror);
          setCloseButtonShouldShow(true);
          scrollTo(scrollRef);
        } else {
          error_sentence =
            status === 400 &&
            (error?.item_image1 || error?.item_image2 || error?.item_image3);
          setError(error_sentence);
          setCloseButtonShouldShow(true);
          scrollTo(scrollRef);
        }

        if (!brandormodelerror && !error_sentence) history('/');
      },
    });
  };

  const displayNone = (e) => {
    e.preventDefault();
    setCloseButtonShouldShow(false);
  };

  return (
    <main className="NewPost">
      {error && closeButtonShouldShow && (
        <div className="alert text-center" id="id001" ref={scrollRef}>
          <span className="closebtn" onClick={(e) => displayNone(e)}>
            &times;
          </span>
          <strong>{error}</strong>
        </div>
      )}
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
        <br />
        <div>
          <input
            type="button"
            style={{ display: show0 ? 'inline-block' : 'none' }}
            value="undo"
            id="undobuttonForRemove1"
            onClick={() => {
              setShow1(true);
              setShow2(true);
              setShow0(false);
            }}
          />
        </div>
        <div id="forImageButton1" style={{ display: show1 ? 'block' : 'none' }}>
          <label htmlFor="image1">image1:</label>
          <input
            type="file"
            id="image1"
            alt="item"
            name="image"
            accept="image/*"
            onChange={(e) => {
              e.target.files[0] === undefined
                ? setImage1(false)
                : setImage1(true);
              setImageUpload1(e.target.files[0]);
            }}
            onClick={() => {
              setShow3(true);
              setShow4(true);
              setShow2(false);
            }}
          />
          <input
            type="button"
            value="remove"
            id="buttonForRemove1"
            style={{ display: show2 ? 'inline-block' : 'none' }}
            onClick={() => {
              setShow2(false);
              setShow1(false);
              setShow0(true);
              setImage1(false);
            }}
          />
        </div>
        <div id="forImageButton2" style={{ display: show3 ? 'block' : 'none' }}>
          <label htmlFor="image2">image2:</label>
          <input
            type="file"
            id="image2"
            alt="item"
            name="image"
            accept="image/*"
            onChange={(e) => {
              e.target.files[0] === undefined
                ? setImage2(false)
                : setImage2(true);
              setImageUpload2(e.target.files[0]);
            }}
            onClick={() => {
              setShow3(true);
              setShow4(false);
              setShow5(true);
              setShow6(true);
            }}
          />
          <input
            type="button"
            id="buttonForRemove2"
            value="Remove"
            style={{ display: show4 ? 'inline-block' : 'none' }}
            onClick={() => {
              setShow4(false);
              setShow3(false);
              setShow2(true);
              setImage2(false);
            }}
          />
        </div>{' '}
        <div
          id="forImageButton3"
          style={{ display: show5 ? 'inline-block' : 'none' }}
        >
          <label htmlFor="image3">image3:</label>
          <input
            type="file"
            id="image3"
            alt="item"
            name="image"
            accept="image/*"
            onChange={(e) => {
              e.target.files[0] === undefined
                ? setImage3(false)
                : setImage3(true);
              setImageUpload3(e.target.files[0]);
            }}
            onClick={() => {
              setShow6(true);
            }}
          />
          <input
            type="button"
            style={{ display: show6 ? 'inline-block' : 'none' }}
            id="buttonForRemove3"
            value="Remove"
            onClick={() => {
              setShow5(false);
              setShow4(true);
              setShow6(false);
              setImage3(false);
            }}
          />
        </div>
        <button
          type="submit"
          onClick={(e) => {
            handleSubmit(e);
          }}
          className="btn btn-primary btn-lg w-100"
        >
          Submit
        </button>
      </form>
    </main>
  );
};

export default NewPost;
