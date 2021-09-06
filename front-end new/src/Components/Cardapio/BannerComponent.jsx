import { React, useState } from "react";
import { Image } from "react-bootstrap";
import Carousel from "react-simply-carousel";
import imgbanner from "../../assets/img/lancheBanner.png";

const BannerComponent = () => {
  const bannerStyle = {
    width: "100%",
    height: "416px",
    marginTop: "32px",
  };

  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div style={bannerStyle}>
      <Carousel
        updateOnItemClick
        containerProps={{
          style: {
            width: "100%",
            justifyContent: "space-between",
          },
        }}
        activeSlideIndex={activeSlide}
        onRequestChange={setActiveSlide}
        forwardBtnProps={{
          children: ">",
          style: {
            width: 60,
            height: 60,
            minWidth: 60,
            alignSelf: "center",
          },
        }}
        backwardBtnProps={{
          children: "<",
          style: {
            width: 60,
            height: 60,
            minWidth: 60,
            alignSelf: "center",
          },
        }}
        itemsToShow={2}
        speed={400}
      >
        <div
          style={{
            backgroundColor: "green",
            width: "100%",
            Height: "416px",
            backgroundRepeat: "no-repeat",
          }}
          key={0}
        >
          <Image src={imgbanner} fluid></Image>
        </div>
        <div
          style={{
            backgroundColor: "green",
            width: "100%",
            Height: "416px",
            backgroundRepeat: "no-repeat",
          }}
          key={1}
        >
          <Image src={imgbanner} fluid></Image>
        </div>
      </Carousel>

      {/* <Carousel
        activeSlideIndex={activeSlide}
        onRequestChange={setActiveSlide}
        itemsToShow={1}
        itemsToScroll={1}
        containerProps={{
          style: {
            width: "100%",
            height: "416px",
          },
        }}
        speed={400}
      >
        <div
          style={{
            width: "100%",
            height: "416px",
            backgroundColor: "red",
            // backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div
          style={{
            backgroundColor: "green",
            width: "100%",
            Height: "416px",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Image src={imgbanner} fluid></Image>
        </div>
        <div
          style={{
            backgroundColor: "black",
            width: "100%",
            height: "416px",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Image src={imgbanner} fluid></Image>
        </div>
      </Carousel> */}
    </div>
  );
};

export default BannerComponent;
