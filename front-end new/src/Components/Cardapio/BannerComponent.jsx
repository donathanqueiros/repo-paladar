import { React, useState } from "react";
import { Image } from "react-bootstrap";

import SimpleImageSlider from "react-simple-image-slider";

const BannerComponent = ({ imagens }) => {
  const bannerStyle = {
    width: "100%",
    height: "416px",
    marginTop: "32px",
  };

  const [sliderOptions, setSliderOptions] = useState({
    useGPURender: true,
    showNavs: true,
    showBullets: true,
    navStyle: 1,
    navSize: 50,
    navMargin: 30,
    duration: 0.5,
    bgColor: "#000",
  });

  const images = imagens;

  return (
    <div style={bannerStyle}>
      <SimpleImageSlider
        width={"100%"}
        height={416}
        images={images}
        style={{ margin: "0 auto", marginTop: "50px", width: "100%" }}
        showBullets={sliderOptions.showBullets}
        showNavs={sliderOptions.showNavs}
        startIndex={0}
        useGPURender={sliderOptions.useGPURender}
        navStyle={sliderOptions.navStyle}
        navSize={sliderOptions.navSize}
        navMargin={sliderOptions.navMargin}
        slideDuration={sliderOptions.duration}
      />
    </div>
  );
};

export default BannerComponent;
