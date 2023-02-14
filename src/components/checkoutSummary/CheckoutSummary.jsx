import React from "react";
import "./_CheckoutSummary.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";

const CheckoutSummary = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  return (
    <>
      {cartItems.lenght === 0 ? (
        <>
          <p>Không có sản phẩm trong giỏ hàng.</p>
          <button className="--btn">
            <Link to="/#products">Trở lại</Link>
          </button>
        </>
      ) : (
        <div className="checkout-summery">
          <h2>Thông tin sản phẩm</h2>
          <h3>Tổng số sản phẩm: {cartTotalQuantity}</h3>
          {cartItems.map((item, index) => {
            const { id, name, price, imageURL, category, brand, cartQuantity } =
              item;
            return (
              <div key={id} className="product-item">
                <div className="product-img">
                  <img src={imageURL} alt={name} />
                </div>
                <div className="product-content">
                  <h4>{name}</h4>
                  <span>
                    Đơn giá: <b>${price}</b>
                  </span>
                  <span>
                    Giá đặt <b>${price * cartQuantity}</b>
                  </span>
                  <span>
                    Danh mục:<b> {category}</b>
                  </span>
                  <span>
                    Thương hiệu: <b>{brand}</b>
                  </span>
                  <span>
                    Số lượng: <b>{cartQuantity}</b>
                  </span>
                </div>
              </div>
            );
          })}

          <div className="info-total">
            <p>Tổng:</p>
            <p>${cartTotalAmount}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutSummary;
