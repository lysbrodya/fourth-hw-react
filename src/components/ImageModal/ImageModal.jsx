import css from "./ImageModal.module.css";
const ImageModal = ({ imageUrl }) => {
  return (
    <div className={css.imageModal}>
      <img src={imageUrl.urls.regular} alt={imageUrl.alt_description} />
    </div>
  );
};
export default ImageModal;
