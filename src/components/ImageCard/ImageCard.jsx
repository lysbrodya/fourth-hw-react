const ImageCard = ({ image, title }) => {
  return (
    <div className="image-card">
      <img src={image} alt={title} />
    </div>
  );
};
export default ImageCard;
