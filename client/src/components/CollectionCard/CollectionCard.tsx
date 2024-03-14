import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ICollection, IProduct } from '../../models/IProduct';
import { ProductDispatchContext } from '../../contexts/ProductContext/ProductDispatchContext';
import { IActionType } from '../../reducer/ProductReducer';

interface ICollectionCardProps {
  collection: ICollection;
  products: IProduct[];
}

export const CollectionCard = ({
  collection,
  products,
}: ICollectionCardProps) => {
  const dispatch = useContext(ProductDispatchContext);

  const collectionProducts = products
    .filter((product) =>
      product.attributes.collections.data.some(
        (col) => col.id === collection.id
      )
    )
    .map((product) => ({ ...product }));

  const limitedCollectionProducts = collectionProducts.slice(0, 2);

  const handleClick = () => {
    if (collection.id) {
      dispatch({
        type: IActionType.SORTEDBYCOLLECTION,
        payload: collection.id.toString(),
      });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section>
      <div className="mx-auto  px-4 py-8 sm:px-6 sm:py-12 lg:px-">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
          <div className="grid place-content-center rounded bg-linen p-6 sm:p-8">
            <div className="mx-auto max-w-md text-center lg:text-left">
              <header>
                <h2 className="text-center text-xs md:text-base lg:text-left lg:text-2xl font-semibold">
                  {collection.attributes.title}
                </h2>
                <p className="mt-4 text-xs md:text-base lg:text-2xl">
                  {collection.attributes.desc}
                </p>
              </header>
              <Link to={`/collection/${collection.id}`} relative="path">
                <button
                  onClick={handleClick}
                  className="text-center mt-8 inline-block rounded border border-gray-300 px-3 py-3 text-sm md:text-base lg:text-2xl transition hover:bg-hoverBtnColor"
                >
                  {'Explore ' + collection.attributes.title}
                </button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2 lg:py-8 md:self-center">
            <ul className="grid grid-cols-2 gap-4">
              {limitedCollectionProducts.map((product) => (
                <li key={product.id}>
                  <a href="#" className="group block">
                    <img
                      src={
                        import.meta.env.VITE_APP_UPLOAD_URL +
                        product?.attributes.firstImg.data.attributes.url
                      }
                      alt={
                        product?.attributes.firstImg.data.attributes
                          .alternativeText
                      }
                      className="aspect-square w-full rounded object-cover"
                    />
                    {/*  <div className="mt-3">
                      <h3 className="font-medium text-xs group-hover:underline group-hover:underline-offset-4 lg:text-2xl">
                        {product.attributes.name}
                      </h3>
                    </div> */}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
