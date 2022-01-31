import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
// import { format } from 'date-fns';

const EditItem = () => {
  const history = useNavigate();
  const updated = useRef(false);
  const dirty = useRef(false);

  const formEl = useRef(null);

  const { slug } = useParams();

  const brand = useStoreState((state) => state.brand);

  const model = useStoreState((state) => state.model);
  const entry = useStoreState((state) => state.entry);
  const price = useStoreState((state) => state.price);
  const image1 = useStoreState((state) => state.image1);
  const image2 = useStoreState((state) => state.image2);
  const image3 = useStoreState((state) => state.image3);

  const sluggy = useStoreState((state) => state.slug);
  const setBrand = useStoreActions((actions) => actions.setBrand);
  const setModel = useStoreActions((actions) => actions.setModel);
  const setPrice = useStoreActions((actions) => actions.setPrice);
  const setImage1 = useStoreActions((actions) => actions.setImage1);
  const setImage2 = useStoreActions((actions) => actions.setImage2);
  const setImage3 = useStoreActions((actions) => actions.setImage3);

  const setEntry = useStoreActions((actions) => actions.setEntry);
  const setSlug = useStoreActions((actions) => actions.setSlug);
  const editItem = useStoreActions((actions) => actions.editItem);

  const getItemById = useStoreState((state) => state.getItemById);
  const item = getItemById(slug);

  useEffect(() => {
    if (updated.current === true && dirty.current === false) {
      history(`/items/${slug}`);
    }

    if (updated.current === true && dirty.current === true) {
      history(`/items/${sluggy}`);
    }
  });

  useEffect(() => {
    if (item) {
      setSlug(slug);
      setBrand(item.brand);
      setModel(item.model);
      setPrice(item.price);
      setEntry(item.entry);
      setSlug(item.slug);
      setImage1(item.item_image1);
      setImage2(item.item_image2);
      setImage3(item.item_image3);
    }

    let eventVar;
    if (formEl && formEl.current) {
      eventVar = formEl.current.addEventListener('input', () => {
        dirty.current = true;
      });
    }

    return () => eventVar?.removeEventListener('input');

    //eslint-disable-next-line
  }, [item, setBrand, setModel, setPrice, setEntry, setSlug]);

  const handleEdit = (sluggy) => {
    // const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    let form_data = new FormData();
    console.log(image1);
    console.log(image2);
    console.log(image3);

    if (image1) form_data.append('item_image1', image1);
    if (image2) form_data.append('item_image2', image2);
    if (image3) form_data.append('item_image3', image3);
    form_data.append('slug', sluggy);
    form_data.append('brand', brand);
    form_data.append('price', price);
    form_data.append('entry', entry);
    form_data.append('model', model);
    form_data.append('seller', localStorage.getItem('seller'));
    form_data.append('nickname', localStorage.getItem('nickname'));

    // const updatedItem = {
    //   slug: sluggy,
    //   brand: brand,
    //   model: model,
    //   price: price,
    //   entry: entry,
    //   seller: localStorage.getItem('seller'),
    //   nickname: localStorage.getItem('nickname'),
    //   item_image1: image1,
    //   item_image2: image2,
    //   item_image3: image3,
    // };
    editItem({ form_data, sluggy });
    updated.current = true;
  };

  return (
    <main className="NewPost">
      {item && (
        <>
          <h2>Edit Item</h2>
          <form
            action=""
            className="newPostForm"
            ref={formEl}
            encType="multipart/form-data"
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
            <label htmlFor="itemPrice">CAD$ Price:</label>
            <input
              type="text"
              id="itemPrice"
              value={price ? '' : price}
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
              onClick={() => {
                handleEdit(sluggy);
              }}
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
