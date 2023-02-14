import React from "react";
import { AiFillCar } from "react-icons/ai";

import Sliders from "../../components/slider/Sliders";
import "./_Home.scss";

import ProductSlide from "../../components/productSlide/ProductSlide";
import About from "../../components/about/About";

const Home = () => {
  return (
    <div className="home-container">
      <Sliders />
      <ProductSlide />
      <About />
    </div>
  );
};

export default Home;
