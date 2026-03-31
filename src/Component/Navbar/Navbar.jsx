import { LogOut } from "lucide-react";
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
import { useContext, useEffect } from "react";
import { TokenContext } from "../Context/TokenContext";
import { CartContext } from "../Context/CartContext";

export default function Navbar() {
  const { token, logOut } = useContext(TokenContext);
  const { displayToCart, cartInfo } = useContext(CartContext);

  useEffect(() => {
    if (token) {
      displayToCart();
    }
  }, [displayToCart, token]);

  return (
    <>
      <nav className="bg-slate-100 py-6 fixed top-0 w-full z-3 pt-4">
        <div className="container flex justify-between items-center">
          <Link to="/home">
            <img className="w-[200px]" src={imageLogo} alt="FreshCart logo" />
          </Link>

          {token ? (
            <ul className="flex gap-4 items-center text-xl">
              <li className="nav-item">
                <Link to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/products">Products</Link>
              </li>
              <li className="nav-item">
                <Link to="/categories">Categories</Link>
              </li>
              <li className="nav-item">
                <Link to="/brands">Brands</Link>
              </li>
              <li className="nav-item">
                <Link to="/allOrder">Orders</Link>
              </li>
              <li className="nav-item">
                <Link to="/whishlist">WishList</Link>
              </li>
            </ul>
          ) : null}

          <ul className="flex gap-4 *:hover:cursor-pointer text-xl">
            {token ? (
              <li>
                <Link className="relative" to="/cart">
                  <FontAwesomeIcon icon={faShoppingCart} />
                  <h6 className="absolute top-[-20px] right-[-10px] bg-main h-6 w-6 rounded-full p-2 text-white flex justify-center items-center">
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
              <li onClick={logOut} className="nav-item">
                <LogOut />
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
