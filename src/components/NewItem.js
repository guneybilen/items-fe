import { useStoreState, useStoreActions } from 'easy-peasy';
import { useNavigate } from 'react-router-dom';
// import { format } from 'date-fns';

const NewPost = () => {
  const history = useNavigate();

  const items = useStoreState((state) => state.items);
  // console.log(items[0]['user']);
  const brand = useStoreState((state) => state.brand);
  const model = useStoreState((state) => state.model);
  const entry = useStoreState((state) => state.entry);
  const price = useStoreState((state) => state.price);
  // const user = useStoreState((state) => state.user);

  const savePost = useStoreActions((actions) => actions.savePost);
  const setBrand = useStoreActions((actions) => actions.setBrand);
  const setModel = useStoreActions((actions) => actions.setModel);
  const setPrice = useStoreActions((actions) => actions.setPrice);
  const setEntry = useStoreActions((actions) => actions.setEntry);

  const handleSubmit = (e) => {
    e.preventDefault();
    // const datetime = format(new Date(), 'MMMM dd, yyyy pp');

    let emails = items.map((item) => item.user);
    let found = emails.find(
      (email) => email === localStorage.getItem('username')
    );

    let singleItem = '';
    if (found) {
      singleItem = items.find((item) => item.user === found);
      const newPost = {
        brand: brand,
        model: model,
        price: price,
        entry: entry,
        seller: singleItem.seller,
      };
      savePost(newPost);
      history('/');
    }
  };

  return (
    <main className="NewPost">
      <h2>New Item</h2>
      <form
        action=""
        className="newPostForm"
        // ref = {formEll}
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
  );
};

export default NewPost;
