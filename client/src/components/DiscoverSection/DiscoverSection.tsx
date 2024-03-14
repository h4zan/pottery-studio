import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductDispatchContext } from '../../contexts/ProductContext/ProductDispatchContext';
import { IProduct } from '../../models/IProduct';
import { IActionType } from '../../reducer/ProductReducer';

interface IDiscoverProps {
  products: IProduct[];
  currentProduct: IProduct;
  shuffledProducts: IProduct[];
}

export const DiscoverSection = ({
  currentProduct,
  shuffledProducts,
}: IDiscoverProps) => {
  const dispatch = useContext(ProductDispatchContext);

  const remainingProducts = shuffledProducts.filter(
    (p) => p.id !== currentProduct.id
  );

  const limitedProducts = remainingProducts.slice(0, 4);

  const handleClick = (id: string) => {
    if (currentProduct.id) {
      dispatch({ type: IActionType.CLICKED, payload: id });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <article className="discover-section mt-14 flex flex-col justify-center lg:mx-4 ">
        <h6 className="text-center text-xs md:text-base font-semibold">
          Elevate Your Collection with More Studio Gems
        </h6>
        <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center md:justify-items-stretch justify-center gap-y-20 gap-x-14 mt-10 mb-5">
          {limitedProducts.map((product, index) => (
            <Link
              key={index}
              to={`/product/${product.id}`}
              className=""
              onClick={() => handleClick(product.id.toString())}
            >
              <aside>
                <img
                  src={
                    import.meta.env.VITE_APP_UPLOAD_URL +
                    product.attributes.firstImg.data.attributes.url
                  }
                  alt={
                    product.attributes.firstImg.data.attributes.alternativeText
                  }
                  className="h-80 w-72 object-cover rounded-t-xl"
                />
                {/*    <div className="flex items-center">
                  <div className="px-4 py-3 w-72">
                    <p className=" font-bold truncate block capitalize">
                      {product.attributes.name}
                    </p>
                  </div>
                </div> */}
              </aside>
            </Link>
          ))}
        </section>
      </article>
    </>
  );
};
