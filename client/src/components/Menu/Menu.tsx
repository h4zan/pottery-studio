import { Link } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import { useState } from 'react';
import { Cart } from '../Cart/Cart';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { useAppSelector } from '../../redux/hooks';

export const Menu = () => {
  const [menuToggled, setMenuToggled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const toggleMenu = () => {
    setMenuToggled(!menuToggled);
  };

  const cartQuantities = useAppSelector((state) => state.cart.quantities);
  const cartWorkshops = useAppSelector((state) => state.workshop.workshops);

  const totalProductQuantity = Object.values(cartQuantities).reduce(
    (total, quantity) => total + quantity,
    0
  );

  const totalWorkshopQuantity = Object.values(cartWorkshops).reduce(
    (total, workshopItem) => total + workshopItem.quantity,
    0
  );

  const totalQuantity = totalProductQuantity + totalWorkshopQuantity;

  return (
    <>
      <nav className="w-full z-50 md:h-fit relative flex flex-wrap items-center justify-between mx-auto p-1">
        <Logo></Logo>
        <button
          type="button"
          onClick={toggleMenu}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm  rounded-lg md:hidden hover:bg-hoverBckgColor focus:outline-none ring-porcelien focus:ring-1 "
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div
          className={`w-full min-h-screen relative md:block md:w-auto md:min-h-max border border-gray-300 shadow-xl md:border-none md:shadow-none ${
            menuToggled ? 'bg-cottonCandy ' : ''
          } md:bg-transparent ${menuToggled ? 'block' : 'hidden'}`}
        >
          <ul className="font-medium flex flex-col md:p-0 mt-1 rounded-lg  md:flex-row md:space-x-4 rtl:space-x-reverse md:mt-0 md:border-0 ">
            <li>
              <Link
                to="/about"
                onClick={toggleMenu}
                aria-current="page"
                className="block py-2 px-4 md:rounded-md hover:bg-hoverBtnColor  transition hover:shadow "
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                onClick={toggleMenu}
                className="block py-2 px-4 md:rounded-md hover:bg-hoverBtnColor  transition hover:shadow "
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                to="/collections"
                onClick={toggleMenu}
                className="block py-2 px-4 md:rounded-md hover:bg-hoverBtnColor  transition hover:shadow "
              >
                Collections
              </Link>
            </li>
            <li>
              <Link
                to="/workshops"
                onClick={toggleMenu}
                className="block py-2 px-4 md:rounded-md hover:bg-hoverBtnColor  transition hover:shadow "
              >
                Workshops
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={toggleMenu}
                className="block py-2 px-4 md:rounded-md hover:bg-hoverBtnColor  transition hover:shadow "
              >
                Contact
              </Link>
            </li>

            <li
              onClick={() => setCartOpen(!cartOpen)}
              className="block py-2 px-4 hover:bg-hoverBtnColor rounded-lg"
            >
              <div
                className="flex flex-row justify-between items-center"
                data-testid="shopping-bag-icon"
              >
                <ShoppingBagOutlinedIcon />{' '}
                {totalQuantity > 0 && (
                  <span className="cart-badge relative inline-flex items-end">
                    <span className="flex h-2 w-2 md:absolute md:-right-3 items-center justify-center rounded-full bg-sand p-2.5 font-medium text-sm border border-gray-600 bg-hoverBckgColor">
                      {totalQuantity}
                    </span>
                  </span>
                )}
              </div>
            </li>
          </ul>
          {cartOpen && <Cart />}
        </div>
      </nav>
    </>
  );
};
