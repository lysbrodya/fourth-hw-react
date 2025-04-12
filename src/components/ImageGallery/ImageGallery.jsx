import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ apiImages, getBigImage }) => {
  return (
    <ul className={css.imageGallery}>
      {apiImages.map((apiImages) => (
        <li
          key={apiImages.id}
          className={css.imageGalleryItem}
          onClick={(e) => {
            e.preventDefault();
            console.log(apiImages.urls.regular);
            getBigImage(apiImages);
          }}
        >
          <ImageCard
            image={apiImages.urls.small}
            title={apiImages.alt_description}
            description={apiImages.description}
          />
        </li>
      ))}
    </ul>
  );
};
export default ImageGallery;
