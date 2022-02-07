import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { formatDistance, parseISO } from 'date-fns';

const EditItem = () => {
  const history = useNavigate();
  const scrollRef = useRef(null);

  const formEl = useRef(null);

  const { slug } = useParams();

  const brand = useStoreState((state) => state.brand);

  const model = useStoreState((state) => state.model);
  const entry = useStoreState((state) => state.entry);
  const price = useStoreState((state) => state.price);
  const image1 = useStoreState((state) => state.image1);
  const image2 = useStoreState((state) => state.image2);
  const image3 = useStoreState((state) => state.image3);
  const [error, setError] = useState('');
  const [closeButtonShouldShow, setCloseButtonShouldShow] = useState(false);

  const setBrand = useStoreActions((actions) => actions.setBrand);
  const setModel = useStoreActions((actions) => actions.setModel);
  const setPrice = useStoreActions((actions) => actions.setPrice);
  const setImage1 = useStoreActions((actions) => actions.setImage1);
  const setImage2 = useStoreActions((actions) => actions.setImage2);
  const setImage3 = useStoreActions((actions) => actions.setImage3);
  const [imageUpload1, setImageUpload1] = useState(null);
  const [imageUpload2, setImageUpload2] = useState(null);
  const [imageUpload3, setImageUpload3] = useState(null);
  const [dt, setDt] = useState('');

  const [deleteImage1, setDeleteImage1] = useState(false);
  const [deleteImage2, setDeleteImage2] = useState(false);
  const [deleteImage3, setDeleteImage3] = useState(false);

  const setEntry = useStoreActions((actions) => actions.setEntry);
  const setSlug = useStoreActions((actions) => actions.setSlug);
  const editItem = useStoreActions((actions) => actions.editItem);

  const getItemById = useStoreState((state) => state.getItemById);
  const item = getItemById(slug);

  const scrollTo = (ref) => {
    if (ref && ref.current /* + other conditions */) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    if (item) {
      setDt(formatDistance(new Date(), parseISO(item.createdAt)));
      setBrand(item.brand);
      setModel(item.model);
      setPrice(item.price);
      setEntry(item.entry);
      setSlug(item.slug);
      setImage1(item.item_image1);
      setImage2(item.item_image2);
      setImage3(item.item_image3);
    }
  }, [
    item,
    setBrand,
    setModel,
    setPrice,
    setEntry,
    setImage1,
    setImage2,
    setImage3,
    setSlug,
  ]);

  const handleEdit = (e) => {
    e.preventDefault();

    let form_data = new FormData();

    if (imageUpload1) form_data.append('item_image1', imageUpload1);
    if (imageUpload2) form_data.append('item_image2', imageUpload2);
    if (imageUpload3) form_data.append('item_image3', imageUpload3);

    form_data.append('brand', brand);
    form_data.append('price', price);
    form_data.append('entry', entry);
    form_data.append('model', model);
    form_data.append('deleteImage1', deleteImage1);
    form_data.append('deleteImage2', deleteImage2);
    form_data.append('deleteImage3', deleteImage3);
    form_data.append('seller', localStorage.getItem('seller'));
    form_data.append('nickname', localStorage.getItem('nickname'));

    editItem({
      form_data,
      slug,
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

        if (!brandormodelerror && !error_sentence) {
          history(`/items/${slug}`);
        }
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
      {item && (
        <>
          <h2>Edit Item</h2>
          <span className="postDate">...{dt}</span>
          <form
            action=""
            className="newPostForm"
            ref={formEl}
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
            <label htmlFor="itemPrice">CAD$ Price:</label>
            <input
              type="text"
              id="itemPrice"
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
            <div>
              <br />
              {imageUpload1 && (
                <img
                  className="itemImage"
                  id="newImage1"
                  src={URL.createObjectURL(imageUpload1)}
                  alt="newImage1"
                  width="150px"
                  height="75px"
                />
              )}
              <span className="spanImage">
                {image1 && (
                  <img
                    src={item?.item_image1}
                    alt="1"
                    className={
                      !!item.item_image1 === false
                        ? 'itemImageonError'
                        : 'itemImage'
                    }
                    width="150px"
                    height="75px"
                  />
                )}
              </span>

              {(imageUpload1 || image1) && (
                <input
                  type="button"
                  value="delete image1"
                  className="btn btn-sm btn-danger"
                  onClick={() => {
                    setDeleteImage1(true);
                    setImage1(false);
                    setImageUpload1(false);
                  }}
                />
              )}

              <br />
            </div>
            <div>
              <label htmlFor="image1">
                {image1 ? 'change image1' : 'add image 1'} &nbsp;
              </label>
              <input
                type="file"
                alt="item"
                name="image"
                accept="image/*"
                onChange={(e) => {
                  setDeleteImage1(false);
                  e.target.files[0] === undefined ||
                    setImageUpload1(e.target.files[0]);
                }}
              />
            </div>
            <br />
            <div>
              {imageUpload2 && (
                <img
                  className="itemImage"
                  id="newImage2"
                  src={URL.createObjectURL(imageUpload2)}
                  alt="newImage2"
                  width="150px"
                  height="75px"
                />
              )}
              <span className="spanImage">
                {image2 && (
                  <img
                    src={item?.item_image2}
                    alt="2"
                    className={
                      !!item.item_image2 === false
                        ? 'itemImageonError'
                        : 'itemImage'
                    }
                    width="150px"
                    height="75px"
                  />
                )}
                {(imageUpload2 || image2) && (
                  <input
                    type="button"
                    value="delete image2"
                    className="btn btn-sm btn-danger"
                    onClick={() => {
                      setDeleteImage2(true);
                      setImage2(false);
                      setImageUpload2(false);
                    }}
                  />
                )}
              </span>
              <br />
              <label htmlFor="image2">
                {image2 ? 'change image2' : 'add image 2'} &nbsp;
              </label>
              <input
                type="file"
                id="image2"
                alt="item"
                name="image"
                accept="image/*"
                onChange={(e) => {
                  setDeleteImage2(false);
                  e.target.files[0] === undefined ||
                    setImageUpload2(e.target.files[0]);
                }}
              />
            </div>
            <br />
            <div>
              {imageUpload3 && (
                <img
                  className="itemImage"
                  id="newImage3"
                  src={URL.createObjectURL(imageUpload3)}
                  alt="newImage3"
                  width="150px"
                  height="75px"
                />
              )}
              <span className="spanImage">
                {image3 && (
                  <img
                    src={item.item_image3}
                    alt="3"
                    className={
                      !!item.item_image3 === false
                        ? 'itemImageonError'
                        : 'itemImage'
                    }
                    width="150px"
                    height="75px"
                  />
                )}

                {(imageUpload3 || image3) && (
                  <input
                    type="button"
                    value="delete image3"
                    className="btn btn-sm btn-danger"
                    onClick={() => {
                      setDeleteImage3(true);
                      setImage3(false);
                      setImageUpload3(false);
                    }}
                  />
                )}
              </span>
              <br />
              <label htmlFor="image3">
                {image3 ? 'change image3' : 'add image 3'} &nbsp;
              </label>
              <input
                type="file"
                id="image3"
                alt="item"
                name="image"
                accept="image/*"
                onChange={(e) => {
                  setDeleteImage3(false);
                  e.target.files[0] === undefined ||
                    setImageUpload3(e.target.files[0]);
                }}
              />
            </div>
            <button
              type="submit"
              onClick={(e) => {
                handleEdit(e);
              }}
              className="btn btn-primary btn-lg w-100"
            >
              Submit
            </button>
          </form>
        </>
      )}
    </main>
  );
};
export default EditItem;
