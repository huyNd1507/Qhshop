import React, { useState } from "react";
import "./_Checkout.scss";
import { CountryDropdown } from "react-country-region-selector";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SAVE_SHIPPING_ADDRESS } from "../../redux/slice/checkoutSlice";
import CheckoutSummary from "../../components/checkoutSummary/CheckoutSummary";

const initialAddressState = {
  name: "",
  phone: "",
  city: "",
  country: "",
};

const CheckoutDetails = () => {
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
    // console.log(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
    navigate("/checkout");
  };

  return (
    <div className="container">
      <div className="row flex-reverse">
        <div className="col-7 col-sm-12 ">
          <div className="custumer-info">
            <h2>Thông tin vận chuyển</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Họ tên</label>
                <input
                  type="text"
                  required
                  name="name"
                  value={shippingAddress.name}
                  onChange={(e) => handleShipping(e)}
                />
              </div>
              <div className="form-group">
                <label>Số điện thoại</label>
                <input
                  type="number"
                  required
                  name="phone"
                  value={shippingAddress.phone}
                  onChange={(e) => handleShipping(e)}
                />
              </div>
              <div className="form-group">
                <label>Địa chỉ</label>
                <input
                  type="text"
                  required
                  name="city"
                  value={shippingAddress.city}
                  onChange={(e) => handleShipping(e)}
                />
              </div>
              <CountryDropdown
                className="form-group-select"
                valueType="short"
                value={shippingAddress.country}
                onChange={(val) =>
                  handleShipping({
                    target: {
                      name: "country",
                      value: val,
                    },
                  })
                }
              />
              <button className="btn">Tiến hành thanh toán</button>
            </form>
          </div>
        </div>
        <div className="col-5 col-sm-12 ">
          <CheckoutSummary />
        </div>
      </div>
    </div>
  );
};

export default CheckoutDetails;
