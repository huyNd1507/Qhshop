import React from "react";
import sliderData from "./slider-data";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./_Slider.scss";

const Sliders = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    appendDots: (dots) => {
      return <ul style={{ margin: "0px" }}>{dots}</ul>;
    },
  };
  return (
    <>
      <section className="homeSlide contentWidth">
        <div className="container">
          <Slider {...settings}>
            {sliderData.map((value, index) => {
              return (
                <div key={index}>
                  <div className=" box d_flex m_flex  top">
                    <div className="left">
                      <h1>{value.title}</h1>
                      <p>{value.desc}</p>
                      <button className=" btn-primary">
                        Visit Collections
                      </button>
                    </div>
                    <div className="right">
                      <img src={value.cover} alt="" />
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default Sliders;

