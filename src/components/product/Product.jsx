import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDoubleRight } from "react-icons/ai";

import "./_Product.scss";
import ProductList from "./components/ProductList";
import ProductFilter from "./components/ProductFilter";
import useFetchCollection from "../../customHooks/useFetchCollection";
import ImgLoading from "../../assets/spinner.jpg";

import {
  GET_PRICE_RANGE,
  selectProducts,
  STORE_PRODUCTS,
} from "../../redux/slice/productSlice";
import { Link } from "react-router-dom";

const Product = () => {
  const { data, isLoading } = useFetchCollection("products");
  const [showFilter, setShowFilter] = useState(false);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );

    dispatch(
      GET_PRICE_RANGE({
        products: data,
      })
    );
  }, [dispatch, data]);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <>
      <div className="bg-main">
        <div className="breadcumb">
          <Link to="/">Home</Link>
          <span>
            <AiOutlineDoubleRight />
          </span>
          <Link to="/shop">All products</Link>
        </div>
      </div>
      <div className="row">
        <div
          className={
            showFilter ? "col-3  filter-col active" : "col-3  filter-col"
          }
        >
          <div className="box filter-toggle-box">
            <button className="btn-flat btn-hover" onClick={toggleFilter}>
              Đóng
            </button>
          </div>
          <ProductFilter />
        </div>
        <div className="col-9 col-md-12">
          <div className="box filter-toggle-box">
            <button className="btn-flat btn-hover" onClick={toggleFilter}>
              Bộ lọc
            </button>
          </div>
          {isLoading ? (
            <img src={ImgLoading} alt="Loading.." className="img-loading" />
          ) : (
            <div>
              <ProductList products={products} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Product;
