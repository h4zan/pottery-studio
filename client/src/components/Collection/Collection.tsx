import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductsContext } from '../../contexts/ProductContext/ProductContext';
import { ICollection, initialCollection } from '../../models/IProduct';
import { ProductDispatchContext } from '../../contexts/ProductContext/ProductDispatchContext';
import { IActionType } from '../../reducer/ProductReducer';
import { Link } from 'react-router-dom';

export const Collection = () => {
  const { id } = useParams();
  const products = useContext(ProductsContext);
  const dispatch = useContext(ProductDispatchContext);
  const [selectedCollection, setSelectedCollection] =
    useState<ICollection>(initialCollection);

  useEffect(() => {
    const foundCollection = products
      .map((product) => product.attributes.collections.data)
      .flat()
      .find((collection) => collection.id === Number(id));

    if (foundCollection) {
      setSelectedCollection({ ...foundCollection });
    }
  }, [id, products]);

  useEffect(() => {
    const selectedCollectionId = selectedCollection.id.toString();

    if (id && selectedCollection && id !== selectedCollectionId) {
      dispatch({
        type: IActionType.SORTEDBYCOLLECTION,
        payload: id,
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [id, dispatch, selectedCollection]);

  return (
    <>
      {selectedCollection ? (
        <section>
          <div className="mx-auto  px-4 py-8 sm:px-6 sm:py-12 ">
            <div className="grid grid-cols-1 gap-4 ">
              <div className="grid place-content-center rounded bg-linen p-6 sm:p-8">
                <div className="mx-auto max-w-md text-center lg:text-left">
                  <header>
                    <h2 className="text-center text-xs md:text-base lg:text-left lg:text-2xl font-semibold">
                      {selectedCollection.attributes.title}
                    </h2>
                    <p className="mt-4 text-xs md:text-base lg:text-2xl">
                      {selectedCollection.attributes.desc}
                    </p>
                  </header>{' '}
                  <Link to={`/products`} relative="path">
                    <button className="text-center mt-8 inline-block rounded border border-gray-300 px-3 py-3 text-sm md:text-base lg:text-2xl transition hover:bg-hoverBtnColor">
                      Browse Products{' '}
                    </button>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-2 lg:py-8">
                <ul className="grid grid-cols-2 gap-4">
                  {products.map((product) => (
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
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};
