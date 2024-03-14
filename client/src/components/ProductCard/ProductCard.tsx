import { useContext } from 'react';
import { IProduct } from '../../models/IProduct';
import cartIcon from '../../assets/img/cart.svg';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { ProductDispatchContext } from '../../contexts/ProductContext/ProductDispatchContext';
import { Link } from 'react-router-dom';
import { IActionType } from '../../reducer/ProductReducer';
interface IProductCardProps {
  product: IProduct;
}
export const ProductCard = ({ product }: IProductCardProps) => {
  const dispatch = useDispatch();
  const productDispatch = useContext(ProductDispatchContext);

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  const handleClick = (id: string) => {
    if (product.id) {
      productDispatch({ type: IActionType.CLICKED, payload: id });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <>
      <section className="product-card ">
        <div className="w-72 bg-white /* shadow-md  */rounded-xl duration-500 /* hover:scale-10 */5 hover:shadow-xl">
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            onClick={() => handleClick(product.id.toString())}
            relative="path"
          >
            <img
              src={
                import.meta.env.VITE_APP_UPLOAD_URL +
                product?.attributes.firstImg.data.attributes.url
              }
              alt={product?.attributes.firstImg.data.attributes.alternativeText}
              className="h-80 w-72 object-cover rounded-t-xl"
            />
            <div className="px-4 py-2 w-72">
              <p
                className="text-lg font-bold truncate block capitalize"
                data-testid="product-name"
              >
                {product?.attributes.name}
              </p>
            </div>{' '}
          </Link>

          <div className="flex items-center px-4 w-72">
            <p
              className=" text-lg font-semibold cursor-auto my-3"
              data-testid="product-price"
            >
              {'$' + product?.attributes.price}
            </p>

            <div
              className="ml-auto w-6 h-6 px-1 rounded hover:bg-hoverBtnColor "
              onClick={handleAddToCart}
            >
              <img
                src={cartIcon}
                alt="Shopping Cart Icon"
                className="w-full h-full"
                data-testid="shopping-cart-icon"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
