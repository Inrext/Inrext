import React from "react";
import Image from "next/image";

type PropertyImagesProps = {
  images: string[];
  selectedImage: number;
  setSelectedImage: (idx: number) => void;
};

const PropertyImages: React.FC<PropertyImagesProps> = ({ images, selectedImage, setSelectedImage }) => (
  <div className="col-span-3">
    <div>
      {images[selectedImage] && (
        <Image
          src={images[selectedImage]}
          alt={`Property ${selectedImage + 1}`}
          width={800}
          height={419}
          className="w-full lg:h-[419px] md:h-[300px] h-[200px] object-cover rounded-xl"
          style={{ objectFit: "cover" }}
          sizes="(max-width: 1024px) 100vw, 60vw"
          priority
        />
      )}
    </div>
    <div className="flex gap-2 mt-3">
      {images.map((img: string, idx: number) =>
        img ? (
          <Image
            key={idx}
            src={img}
            alt={`Thumbnail ${idx + 1}`}
            width={80}
            height={60}
            className={`cursor-pointer object-cover rounded-lg border-2 ${selectedImage === idx ? "border-blue-500" : "border-transparent"}`}
            style={{ width: "80px", height: "60px", opacity: selectedImage === idx ? 1 : 0.8, transition: "border 0.2s, opacity 0.2s" }}
            onClick={() => setSelectedImage(idx)}
            sizes="80px"
            priority={selectedImage === idx}
          />
        ) : null
      )}
    </div>
  </div>
);

export default PropertyImages;
