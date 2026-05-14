import { LogOut, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import imageLogo from "../../assets/Images/freshcart-logo.svg";
import { faFacebook } from "@fortawesome/free-brands-svg-icons/faFacebook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faShoppingCart, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../Context/TokenContext";
import { CartContext } from "../Context/CartContext";

export default function Navbar() {
  const { token, logOut } = useContext(TokenContext);
  const { displayToCart, cartInfo } = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogOut = () => {
    logOut();
    closeMenu();
  };

  useEffect(() => {
    if (token) {
      displayToCart();
    }
  }, [displayToCart, token]);

  return (
    <>
      <nav className="bg-slate-100 fixed top-0 w-full z-30 shadow-sm">
        <div className="container flex flex-wrap items-center justify-between gap-4 py-3">
          <Link to="/home" onClick={closeMenu}>
            <img className="w-[160px] sm:w-[200px]" src={imageLogo} alt="FreshCart logo" />
          </Link>

          <button
            className="rounded-md border border-slate-300 p-2 text-slate-700 md:hidden"
            type="button"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } w-full flex-col gap-5 border-t border-slate-200 pt-4 md:flex md:w-auto md:flex-row md:items-center md:border-0 md:pt-0`}
          >
            {token ? (
              <ul className="flex flex-col gap-4 text-lg md:flex-row md:items-center md:text-xl">
                <li className="nav-item w-fit">
                  <Link onClick={closeMenu} to="/home">Home</Link>
                </li>
                <li className="nav-item w-fit">
                  <Link onClick={closeMenu} to="/products">Products</Link>
                </li>
                <li className="nav-item w-fit">
                  <Link onClick={closeMenu} to="/categories">Categories</Link>
                </li>
                <li className="nav-item w-fit">
                  <Link onClick={closeMenu} to="/brands">Brands</Link>
                </li>
                <li className="nav-item w-fit">
                  <Link onClick={closeMenu} to="/allOrder">Orders</Link>
                </li>
                <li className="nav-item w-fit">
                  <Link onClick={closeMenu} to="/whishlist">WishList</Link>
                </li>
              </ul>
            ) : null}

            <ul className="flex flex-wrap items-center gap-4 *:hover:cursor-pointer text-lg md:text-xl">
              {token ? (
                <li>
                  <Link className="relative block" onClick={closeMenu} to="/cart">
                    <FontAwesomeIcon icon={faShoppingCart} />
                    <h6 className="absolute top-[-18px] right-[-12px] bg-main h-6 w-6 rounded-full p-2 text-sm text-white flex justify-center items-center">
                      {cartInfo == null ? (
                        <FontAwesomeIcon icon={faSpinner} />
                      ) : (
                        cartInfo.numOfCartItems
                      )}
                    </h6>
                  </Link>
                </li>
              ) : null}

              <li>
                <FontAwesomeIcon icon={faFacebook} />
              </li>
              <li>
                <FontAwesomeIcon icon={faInstagram} />
              </li>
              <li>
                <FontAwesomeIcon icon={faLinkedin} />
              </li>
              <li>
                <FontAwesomeIcon icon={faTwitter} />
              </li>

              {token ? (
                <li onClick={handleLogOut} className="nav-item w-fit">
                  <LogOut />
                </li>
              ) : (
                <>
                  <li className="nav-item w-fit">
                    <Link onClick={closeMenu} to="/login">Login</Link>
                  </li>
                  <li className="nav-item w-fit">
                    <Link onClick={closeMenu} to="/register">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
