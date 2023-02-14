import React from "react";
import { FaCartPlus } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
} from "../../../redux/slice/cartSlice";
// import {formatPrice} from '../../../untils/'

const ProductItem = ({ product, id, name, price, desc, imageURL }) => {
  const dispatch = useDispatch();

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };
  return (
    <div className="col-4 col-md-6 col-sm-12">
      <div className="product-card">
        <Link to={`/product-details/${id}`}>
          <div className="product-card-img">
            <img src={imageURL} alt={name}></img>
            <img src={imageURL} alt={name}></img>
          </div>
        </Link>

        <div className="product-card-info">
          <div className="product-btn">
            <button
              className="btn-flat btn-hover btn-shop-now"
              onClick={() => addToCart(product)}
            >
              Mua ngay
            </button>
            <button className="btn-flat btn-hover btn-cart-add">
              <FaCartPlus onClick={() => addToCart(product)} />
            </button>
            <button className="btn-flat btn-hover btn-cart-add">
              <AiFillHeart />
            </button>
          </div>
          <Link to={`/product-details/${id}`}>
            <div className="product-card-name">
              <h2>{name}</h2>
            </div>
          </Link>
          <div className="product-card-price">
            {/* <span>
              <del>$100</del>
            </span> */}
            <span className="curr-price">${price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
