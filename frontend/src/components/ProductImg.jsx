import React, { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const ProductImg = ({ images }) => {
  const [mainImg, setMainImg] = useState(images[0].url);

  return (
    <div className="flex gap-5">
      {/* Thumbnails */}
      <div className="flex flex-col gap-5">
        {images.map((img, index) => (
          <img
            key={index}
            src={img.url}
            alt=""
            className="cursor-pointer w-20 h-20 border shadow-lg"
            onClick={() => setMainImg(img.url)}
          />
        ))}
      </div>

      <Zoom>
        {/* Main Image */}
        <div className="w-[450px] h-[450px] border shadow-lg flex items-center justify-center">
          <img
            src={mainImg}
            alt=""
            className="max-w-full max-h-full object-contain"
          />
        </div>
        
      </Zoom>
    </div>
  );
};

export default ProductImg;
