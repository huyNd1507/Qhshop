import React, { useEffect } from "react";
import {
  AiFillHeart,
  AiOutlineArrowRight,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { selectProducts, STORE_PRODUCTS } from "../../redux/slice/productSlice";
import ImgLoading from "../../assets/spinner.jpg";
import { useDispatch, useSelector } from "react-redux";
import useFetchCollection from "../../customHooks/useFetchCollection";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
} from "../../redux/slice/cartSlice";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="next">
        <AiOutlineArrowRight />
      </button>
    </div>
  );
};
const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="prev">
        <AiOutlineArrowLeft />
      </button>
    </div>
  );
};

const settings = {
  dots: false,
  infinite: true,
  speed: 1000,
  autoplay: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  rows: 2,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1008,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 800,
      settings: "unslick",
      // settings: {
      //   slidesToShow: 1,
      //   slidesToScroll: 1,
      // },
    },
  ],
};

const ProductSlide = () => {
  const products = useSelector(selectProducts);
  const { data, isLoading } = useFetchCollection("products");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  return (
    <section className="product-wrapper">
      <h1 className="product-heading">New Product</h1>
      <Slider {...settings}>
        {isLoading ? (
          <img src={ImgLoading} alt="Loading.." className="img-loading" />
        ) : (
          products.map((product, id) => {
            return (
              <div className="col-4 col-md-6 col-sm-12" key={id}>
                <div className="product-card">
                  <Link to={`/product-details/${product.id}`}>
                    <div className="product-card-img">
                      <img src={product.imageURL} alt={product.name}></img>
                      <img src={product.imageURL} alt={product.name}></img>
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
                    <Link to={`/product-details/${product.id}`}>
                      <div className="product-card-name">
                        <h2>{product.name}</h2>
                      </div>
                    </Link>
                    <div className="product-card-price">
                      <span className="curr-price">${product.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </Slider>
    </section>
  );
};

export default ProductSlide;
