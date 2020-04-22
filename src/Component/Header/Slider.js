import React from 'react'
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

function Slider() {
    return (
        <OwlCarousel className="owl-theme" loop={false}  items={1}>
        <div className="item slideOne">

          <div className="sliderContent">
          <div>
              <img className="img-responsive" src={require('../../Images/fottballPlayers_2.png')} alt="footballCartoon" />
          </div>
              <p className="sliderHeader">Lorem Ipsum</p>
              <p className="sliderInfo">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          </div>
        </div>
        <div className="item slideTwo">
        {/* <img src="https://coderlust-project.web.app/static/media/stadium.0316b372.jpg" alt="" /> */}
        </div>
        <div className="item slideThree">
        {/* <img src="https://coderlust-project.web.app/static/media/stadium.0316b372.jpg" alt="" /> */}
        </div>

      </OwlCarousel>
    )
}

export default Slider
