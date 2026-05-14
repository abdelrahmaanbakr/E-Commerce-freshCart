import { LogOut, Menu, Moon, Sun, X } from "lucide-react";
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
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogOut = () => {
    logOut();
    closeMenu();
  };

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    if (token) {
      displayToCart();
    }
  }, [displayToCart, token]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <nav className="fixed top-0 z-30 w-full bg-slate-100 text-slate-900 shadow-sm transition-colors dark:bg-slate-900 dark:text-slate-100">
        <div className="container flex flex-wrap items-center justify-between gap-4 py-3">
          <Link to="/home" onClick={closeMenu}>
            <img className="w-[160px] sm:w-[200px]" src={imageLogo} alt="FreshCart logo" />
          </Link>

          <div className="flex items-center gap-2 md:hidden">
            <button
              className="rounded-md border border-slate-300 p-2 text-slate-700 transition-colors hover:border-main hover:text-main dark:border-slate-700 dark:text-slate-100"
              type="button"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              onClick={toggleTheme}
            >
              {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
            </button>

            <button
              className="rounded-md border border-slate-300 p-2 text-slate-700 transition-colors dark:border-slate-700 dark:text-slate-100"
              type="button"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((current) => !current)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } w-full flex-col gap-5 border-t border-slate-200 pt-4 dark:border-slate-700 md:flex md:w-auto md:flex-row md:items-center md:border-0 md:pt-0`}
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
              <li className="hidden md:block">
                <button
                  className="rounded-md border border-slate-300 p-2 text-slate-700 transition-colors hover:border-main hover:text-main dark:border-slate-700 dark:text-slate-100"
                  type="button"
                  aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                  onClick={toggleTheme}
                >
                  {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                </button>
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
