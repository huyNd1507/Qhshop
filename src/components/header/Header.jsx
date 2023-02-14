import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineUser,
  AiOutlineShopping,
} from "react-icons/ai";
// import styles from "./Header.module.scss";
import styles from "./_Header.scss";
import classNames from "classnames/bind";

import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_ACTIVE_USER,
  REMOVE_ACTIVE_USER,
} from "../../redux/slice/authSlice";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLink/hiddenLink";
import { AdminOnlyLink } from "../adminOnlyRoute/AdminOnlyRoute";
import {
  CALCULATE_TOTAL_QUANTITY,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";

const cx = classNames.bind(styles);

const Header = () => {
  const activeLink = ({ isActive }) => (isActive ? "active" : "");
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setdisplayName] = useState("");
  const [scrollPage, setScrollPage] = useState(false);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, []);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const fixNavbar = () => {
    if (window.scrollY > 50) {
      setScrollPage(true);
    } else {
      setScrollPage(false);
    }
  };
  window.addEventListener("scroll", fixNavbar);

  // Monitor currently sign in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        // console.log(user);
        if (user.displayName == null) {
          const u1 = user.email.slice(0, -10);
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setdisplayName(uName);
        } else {
          setdisplayName(user.displayName);
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          })
        );
      } else {
        setdisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout successfully.");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <header className={scrollPage ? `${cx("fixed")}` : ""}>
      <div className={cx("mobile-menu bg-second")}>
        <Link to="/" className={cx("mb-logo")}>
          QHShop
        </Link>
        <span className={cx("mb-menu-toggle")}>
          <AiOutlineMenu onClick={toggleMenu} />
        </span>
      </div>

      <div
        className={
          !showMenu
            ? `${cx("header-wrapper")}`
            : `${cx("header-wrapper active")}`
        }
      >
        <span className={cx("mb-menu-toggle mb-menu-close")}>
          <AiOutlineClose onClick={toggleMenu} />
        </span>

        <div className={cx("bg-main")}>
          <div className={cx("mid-header container")}>
            <Link to="/" className={cx("logo")} onClick={toggleMenu}>
              QHShop
            </Link>
            <ul className={cx("main-menu")} onClick={toggleMenu}>
              <li>
                <AdminOnlyLink>
                  <Link to="/admin/home">Admin</Link>
                </AdminOnlyLink>
              </li>
              <li>
                <NavLink to="/" className="cc" onClick={activeLink}>
                  Home
                </NavLink>
              </li>
              <li className={cx("mega-dropdown")} onClick={activeLink}>
                <NavLink to="/shop" className="cc" onClick={activeLink}>
                  Shop
                </NavLink>
              </li>
              <li onClick={activeLink}>
                <NavLink to="/blog" className="cc" onClick={activeLink}>
                  posts
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="cc" onClick={activeLink}>
                  contact
                </NavLink>
              </li>
            </ul>
            <ul className={cx("user-menu")} onClick={toggleMenu}>
              <li>
                <Link to="/login">
                  <AiOutlineUser className={cx("bx bx-user-circle")} />
                </Link>
                <div className={cx("mega-contents")} onClick={toggleMenu}>
                  <div className={cx("boxs")}>
                    <ul>
                      <li className={cx("text-red ")}>
                        <ShowOnLogin>
                          <Link to="/">Hi, {displayName}</Link>
                        </ShowOnLogin>
                      </li>
                      <li>
                        <ShowOnLogin>
                          <Link to="/order-history">My Orders</Link>
                        </ShowOnLogin>
                      </li>
                      <li>
                        <ShowOnLogin>
                          <Link to="/reset">reset password</Link>
                        </ShowOnLogin>
                      </li>
                      <li>
                        <ShowOnLogin>
                          <Link to="/" onClick={logoutUser}>
                            Logout
                          </Link>
                        </ShowOnLogin>
                      </li>
                      <li>
                        <ShowOnLogout>
                          <Link to="/login">Login</Link>
                        </ShowOnLogout>
                      </li>
                      <li>
                        <ShowOnLogout>
                          <Link to="/register">Register</Link>
                        </ShowOnLogout>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className={cx("carts")}>
                <Link to="/cart">
                  <AiOutlineShopping />
                  <span>{cartTotalQuantity}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={cx("bg-second")}>
          <div className={cx("bottom-header container")}></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
