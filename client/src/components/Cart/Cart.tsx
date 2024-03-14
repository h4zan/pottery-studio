import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  getMemoizedProducts,
  getSubtotal,
  removeFromCart,
  resetCart,
} from '../../redux/cartSlice';
import {
  clearWorkshops,
  decreaseWorkshopQuantity,
  getMemoizedWorkshops,
  getSubtotalWorkshopPrice,
} from '../../redux/workshopSlice';
import { loadStripe } from '@stripe/stripe-js';
import { customAxios } from '../../services/strapiService';
import { PiTag } from 'react-icons/pi';

export const Cart = () => {
  const [isCartClosed, setIsCartClosed] = useState(false);
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector(getMemoizedProducts);
  const quantities = useAppSelector((state) => state.cart.quantities);
  const cartWorkshops = useAppSelector(getMemoizedWorkshops);
  const productSubtotal = useAppSelector(getSubtotal);
  const workshopSubtotal = useAppSelector(getSubtotalWorkshopPrice);

  const closeCart = () => {
    setIsCartClosed(!isCartClosed);
  };

  const handleClearCart = () => {
    dispatch(resetCart());
    dispatch(clearWorkshops());
  };

  const handleSubtotal = () => {
    const productSubtotalValue = parseFloat(productSubtotal);
    const workshopSubtotalValue = parseFloat(workshopSubtotal);
    return (productSubtotalValue + workshopSubtotalValue).toFixed(2);
  };

  const handleTotalPrice = () => {
    const shippingCost = 45;
    const subtotal = parseFloat(handleSubtotal());
    return (subtotal + shippingCost).toFixed(2);
  };
  const handleRemoveWorkshop = (workshopId: number, selectedDate?: string) => {
    if (workshopId && selectedDate) {
      dispatch(decreaseWorkshopQuantity({ workshopId, selectedDate }));
    }
  };

  const stripePromise = loadStripe(
    `${import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY}`
  );

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;

      const res = await customAxios.post('/orders', {
        products: cartProducts,
        workshops: cartWorkshops,
      });

      if (!stripe) {
        console.error('Stripe is null');
        return;
      }

      await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!isCartClosed && (
        <div
          className="absolute w-full z-50 min-h-
          96 md:max-w-sm border border-t-gray-300 md:shadow-xl bg-cottonCandy md:rounded-xl mx-auto p-1 px-4 py-8  lg:px-8 md:right-1 mt-2"
          aria-modal="true"
          role="dialog"
        >
          <h6 className="border-b pb-2 font-medium border-gray-200">
            Shopping Cart
          </h6>
          <button
            className="absolute end-4 top-4  transition hover:scale-110"
            onClick={closeCart}
          >
            <span className="sr-only">Close cart</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {cartProducts.length > 0 || cartWorkshops.length > 0 ? (
            <div className="mt-4 space-y-6">
              <ul className="space-y-4 max-h-96 overflow-y-auto">
                {cartProducts.map((cartProduct) => (
                  <li key={cartProduct.id} className="flex items-center gap-4 ">
                    <img
                      src={
                        import.meta.env.VITE_APP_UPLOAD_URL +
                        cartProduct?.product.attributes.firstImg.data.attributes
                          .url
                      }
                      alt={
                        cartProduct?.product.attributes.firstImg.data.attributes
                          .alternativeText
                      }
                      className="h-32 w-32 rounded object-cover"
                    />

                    <div>
                      <h3 className="text-sm w-28">
                        {cartProduct?.product.attributes.name}
                      </h3>

                      <dl className="mt-0.5 space-y-px text-[10px] ">
                        <div>
                          <dt className="inline">
                            {cartProduct?.product.attributes.categories.data[0].attributes.title
                              .charAt(0)
                              .toUpperCase() +
                              cartProduct?.product.attributes.categories.data[0].attributes.title.slice(
                                1
                              )}
                          </dt>
                        </div>
                      </dl>
                    </div>

                    <div className="flex flex-1 items-center justify-end gap-2">
                      <form>
                        <label htmlFor="Line1Qty" className="sr-only">
                          Quantity
                        </label>

                        <span className="h-8 w-12 p-0.5 outline outline-gray-200 bg-linen text-center  [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none">
                          {quantities[cartProduct.id] || 0}
                        </span>
                      </form>

                      <button
                        className=" transition hover:text-red-700"
                        onClick={() => dispatch(removeFromCart(cartProduct.id))}
                      >
                        <span className="sr-only">Remove item</span>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}{' '}
              </ul>{' '}
              <ul className="space-y-4 max-h-96 overflow-y-auto">
                {cartWorkshops.map((workshopItem, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <img
                      src={
                        import.meta.env.VITE_APP_UPLOAD_URL +
                        workshopItem?.workshop.attributes.img.data.attributes
                          .url
                      }
                      alt={
                        workshopItem?.workshop.attributes.img?.data?.attributes
                          ?.alternativeText
                      }
                      className="h-32 w-32 rounded object-cover"
                    />

                    <div>
                      <h3 className="text-sm w-28">
                        {workshopItem?.workshop.attributes.title}
                      </h3>
                      <span className="text-xs text-gray-600 font-semibold">
                        Selected Dates:{' '}
                      </span>
                      <span className="text-xs text-gray-500">
                        {' '}
                        {workshopItem.selectedDates
                          ? workshopItem.selectedDates.join(', ')
                          : ''}
                      </span>
                    </div>

                    <div className="flex flex-1 items-center justify-end gap-2">
                      <form>
                        <label htmlFor="Line1Qty" className="sr-only">
                          Quantity
                        </label>

                        <span className="h-8 w-12 p-0.5 outline outline-gray-200 bg-linen text-center  [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none">
                          <span className="h-8 w-12 p-0.5 outline outline-gray-200 bg-linen text-center  [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none">
                            {workshopItem.quantity || 0}
                          </span>
                        </span>
                      </form>

                      <button
                        className=" transition hover:text-red-700"
                        onClick={() => {
                          if (workshopItem?.selectedDates) {
                            handleRemoveWorkshop(
                              workshopItem?.workshop.id,
                              workshopItem.selectedDates[0]
                            );
                          }
                        }}
                      >
                        <span className="sr-only">Remove item</span>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                <div className="w-screen max-w-lg space-y-4">
                  <dl className="space-y-0.5 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <dt>Subtotal</dt>
                      <dd>${handleSubtotal()}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Shipping</dt>
                      <dd>$45</dd>
                    </div>
                    <div className=" flex justify-between !text-base">
                      <dt className="font-semibold"> Total</dt>
                      <dd>${handleTotalPrice()}</dd>
                    </div>
                  </dl>

                  <div className="flex flex-row justify-between ">
                    <button
                      onClick={handleClearCart}
                      className="rounded outline outline-gray-200  px-5 py-3 text-sm transition hover:bg-hoverBtnColor hover:text-red-700"
                    >
                      Reset
                    </button>
                    <button
                      onClick={handleCheckout}
                      className=" rounded outline outline-gray-200 block px-5 py-3 text-sm transition hover:bg-hoverBtnColor"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center col p-16 min-h-[250px]">
              <div className="w-screen max-w-lg space-y-4 flex justify-center flex-row items-center">
                <p className="text-center font-medium text-lg ">
                  Cart is empty.
                </p>
                <PiTag />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
