import React from "react";
import banner1 from "../../assets/banner-1.png";
import banner2 from "../../assets/banner-2.png";
import { AiFillCar } from "react-icons/ai";

const diliverydata = [
  {
    cover: <AiFillCar />,
    title: "Worldwide Delivery",
    decs: "We offer competitive prices on our 100 million plus product any range.",
  },
  {
    cover: <AiFillCar />,
    title: "Safe Payment",
    decs: "We offer competitive prices on our 100 million plus product any range.",
  },
  {
    cover: <AiFillCar />,
    title: "Shop With Confidence ",
    decs: "We offer competitive prices on our 100 million plus product any range.",
  },
  {
    cover: <AiFillCar />,
    title: "24/7 Support ",
    decs: "We offer competitive prices on our 100 million plus product any range.",
  },
];

const About = (props) => {
  return (
    <>
      <section className="annocument ">
        <div className="row">
          <div className="col-4 col-md-12 ">
            <img src={banner1} alt="" width="100%" height="100%" />
          </div>
          <div className="col-8 col-md-12 ">
            <img src={banner2} alt="" width="100%" height="100%" />
          </div>
        </div>
      </section>
      <section className="delivery">
        <div className="row">
          {diliverydata.map((item, index) => {
            return (
              <div className="col-3 col-sm-12" key={index}>
                <div className="delivery-item">
                  <div className="icon">{item.cover}</div>
                  <h3>{item.title}</h3>
                  <p>{item.decs}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default About;
