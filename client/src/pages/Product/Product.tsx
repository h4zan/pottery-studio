import { useParams } from 'react-router-dom';
import { getProductById } from '../../services/strapiService';
import { ProductsContext } from '../../contexts/ProductContext/ProductContext';
import { ProductDispatchContext } from '../../contexts/ProductContext/ProductDispatchContext';
import { useContext, useEffect, useState } from 'react';
import { IProduct, initialProduct } from '../../models/IProduct';
import { Carousel } from '@material-tailwind/react';
import { DiscoverSection } from '../../components/DiscoverSection/DiscoverSection';
import { useAppDispatch } from '../../redux/hooks';
import { addToCart } from '../../redux/cartSlice';
import { IActionType } from '../../reducer/ProductReducer';

export const Product = () => {
  const { id } = useParams();
  const products = useContext(ProductsContext);
  const dispatch = useContext(ProductDispatchContext);
  const [product, setProduct] = useState<IProduct>(initialProduct);
  const [quantity, setQuantity] = useState(0);
  const cartDispatch = useAppDispatch();
  const [shuffledProducts, setShuffledProducts] = useState<IProduct[]>([]);

  const handleAddToCart = () => {
    if (quantity > 0) {
      cartDispatch(addToCart({ product, quantity }));
      setQuantity(0);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    if (id) {
      const existingProduct = products.find((p) => p.id.toString() === id);
      if (existingProduct) {
        setProduct(existingProduct);
      } else {
        const fetchProductDetails = async () => {
          try {
            const fetchedProduct = await getProductById(parseInt(id, 10));
            setProduct(fetchedProduct);
            dispatch({
              type: IActionType.CLICKED,
              payload: fetchedProduct.id.toString(),
            });
          } catch (error) {
            console.error('Error fetching product details:', error);
          }
        };

        fetchProductDetails();
      }
    }
  }, [id, products, dispatch]);

  useEffect(() => {
    const shuffled = [...products].sort(() => Math.random() - 0.5);
    setShuffledProducts(shuffled);
  }, [products]);

  return (
    <>
      {' '}
      {product ? (
        <div className="bg-cottonCandy min-h-screen">
          <div className="relative flex flex-col bg-white  bg-clip-border  md:flex-row md:w-screen md:p-8 md:h-auto  ">
            <div className="relative mt-4 overflow-hidden bg-white bg-clip-border rounded-xl h-96 md:w-full md:h-[600px] lg:h-[700px] xl:lg:h-[800px] 2xl:h-[900px]">
              <Carousel
                className="rounded-xl"
                placeholder="Carousel of product images"
              >
                <img
                  src={
                    import.meta.env.VITE_APP_UPLOAD_URL +
                    product?.attributes.firstImg.data.attributes.url
                  }
                  alt={
                    product?.attributes.firstImg.data.attributes.alternativeText
                  }
                  className="h-full w-full object-cover"
                  /*                 className="h-80 w-72 object-cover rounded-t-xl"
                   */
                />

                {product?.attributes?.secondImg?.data?.attributes && (
                  <img
                    className="h-full w-full object-cover"
                    /*                   className="h-80 w-72 object-cover rounded-t-xl"
                     */ src={
                      import.meta.env.VITE_APP_UPLOAD_URL +
                      product.attributes.secondImg.data.attributes.url
                    }
                    alt={
                      product.attributes.secondImg.data.attributes
                        .alternativeText
                    }
                  />
                )}
              </Carousel>
            </div>
            <div className="md:w-2/4 p-6 ">
              <div className="flex flex-col p-2 mb-2">
                <span className=" mr-3 uppercase text-xs md:text-base">
                  {product?.attributes.categories.data[0]?.attributes.title}
                </span>

                <p className="text-lg font-bold truncate block capitalize">
                  {product?.attributes.name}
                </p>
              </div>
              <p className="block font-sans text-sm font-normal leading-normal p-2 md:text-base">
                {product?.attributes.description}
              </p>
              <p className="block font-sans text-sm font-normal leading-normal p-2 md:text-base">
                <span className="font-semibold md:text-base">Material: </span>
                {product?.attributes.types
                  ? product.attributes.types.charAt(0).toUpperCase() +
                    product.attributes.types.slice(1)
                  : ''}
              </p>
              <div className="flex items-center justify-between  p-2">
                <p className="text-base font-semibold cursor-auto my-3">
                  {'   $  ' + product?.attributes.price}
                </p>

                <div className="text-lg font-semibold  cursor-auto my-3">
                  <p>
                    <label htmlFor="Quantity" className="sr-only">
                      {quantity}
                    </label>

                    <span className="flex items-center rounded border border-gray-200">
                      <button
                        type="button"
                        className="h-10 w-10 leading-10  transition hover:"
                        onClick={handleDecrease}
                      >
                        -
                      </button>
                      <span className=" text-center	h-10 w-10 leading-10  transition hover:">
                        {quantity}
                      </span>

                      <button
                        type="button"
                        className="h-10 w-10 leading-10  transition hover:"
                        onClick={handleIncrease}
                      >
                        +
                      </button>
                    </span>
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0 flex justify-center">
                <button
                  className="align-middle select-none font-bold text-center uppercase text-xs py-3 px-6  inline-block w-fit rounded border border-gray-300 transition hover:bg-hoverBtnColor "
                  type="button"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <DiscoverSection
            products={products.filter((p) => p.id !== product.id)}
            shuffledProducts={shuffledProducts}
            currentProduct={product}
          />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};
