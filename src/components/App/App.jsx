import { useEffect, useState, useRef } from "react"; // Добавляем useRef
import { DotLoader } from "react-spinners";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import { fetchImages } from "../images-api";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Modal from "react-modal";
import ImageModal from "../ImageModal/ImageModal";
import css from "./App.module.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    // right: "auto",
    // bottom: "auto",
    // marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    height: "90%",
    objectFit: "contain",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },
};
Modal.setAppElement("#root");

const App = () => {
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  const loadMoreRef = useRef(null); // Реф для кнопки "Load more"

  function openModal() {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  }

  useEffect(() => {
    if (searchValue === "") {
      return;
    }

    async function getImages() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchImages(searchValue, page);
        setImages((prevArticles) => {
          return [...prevArticles, ...data];
        });

        // Прокрутка к кнопке "Load more" после загрузки новых изображений
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getImages();
  }, [searchValue, page]);

  const handleSearch = (value) => {
    setSearchValue(value);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    openModal();
  };

  useEffect(() => {
    if (page > 1 && !loading && loadMoreRef.current) {
      loadMoreRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [images, loading, page]);

  return (
    <div className={css.app}>
      <SearchBar onSearch={handleSearch} />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <ImageModal imageUrl={selectedImage}></ImageModal>
      </Modal>
      {error && <ErrorMessage />}
      {images.length > 0 && (
        <ImageGallery apiImages={images} getBigImage={handleImageClick} />
      )}
      {images.length > 0 && !loading && (
        <button
          onClick={handleLoadMore}
          className={css.loadMoreButton}
          ref={loadMoreRef} // Привязываем реф к кнопке
        >
          Load more
        </button>
      )}
      {loading && <DotLoader color="purple" />}
    </div>
  );
};

export default App;

// import { useEffect, useState, useRef } from "react";
// import { DotLoader } from "react-spinners";
// import SearchBar from "../SearchBar/SearchBar";
// import ImageGallery from "../ImageGallery/ImageGallery";
// import { fetchImages } from "../images-api";
// import ErrorMessage from "../ErrorMessage/ErrorMessage";
// import Modal from "react-modal";
// import ImageModal from "../ImageModal/ImageModal";
// import css from "./App.module.css";

// const customStyles = {
//   content: {
//     top: "50%",
//     left: "50%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//     width: "100%",
//     height: "100%",
//     objectFit: "contain",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "green",
//   },
// };
// Modal.setAppElement("#root");

// const App = () => {
//   const [searchValue, setSearchValue] = useState("");
//   const [page, setPage] = useState(1);
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [modalIsOpen, setIsOpen] = useState(false);

//   const [showHeader, setShowHeader] = useState(true);
//   const lastScrollY = useRef(0);

//   const loadMoreRef = useRef(null);

//   function openModal() {
//     setIsOpen(true);
//     document.body.style.overflow = "hidden";
//   }

//   function closeModal() {
//     setIsOpen(false);
//     document.body.style.overflow = "auto";
//   }

//   useEffect(() => {
//     if (searchValue === "") return;

//     async function getImages() {
//       try {
//         setLoading(true);
//         setError(false);
//         const data = await fetchImages(searchValue, page);
//         setImages((prev) => [...prev, ...data]);
//       } catch (error) {
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     }
//     getImages();
//   }, [searchValue, page]);

//   const handleSearch = (value) => {
//     setSearchValue(value);
//     setPage(1);
//     setImages([]);
//   };

//   const handleLoadMore = () => {
//     setPage(page + 1);
//   };

//   const handleImageClick = (imageUrl) => {
//     setSelectedImage(imageUrl);
//     openModal();
//   };

//   useEffect(() => {
//     if (page > 1 && !loading && loadMoreRef.current) {
//       loadMoreRef.current.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }
//   }, [images, loading, page]);

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
//       console.log(currentScrollY);
//       if (currentScrollY < lastScrollY.current) {
//         setShowHeader(true);
//       } else if (currentScrollY > lastScrollY.current + 50) {
//         setShowHeader(false);
//       }
//       lastScrollY.current = currentScrollY;
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div className={css.app}>
//       <div
//         className={`${css.headerWrapper} ${showHeader ? css.show : css.hide}`}
//       >
//         <SearchBar onSearch={handleSearch} />
//       </div>

//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         style={customStyles}
//         contentLabel="Example Modal"
//       >
//         <ImageModal imageUrl={selectedImage}></ImageModal>
//       </Modal>

//       {error && <ErrorMessage />}

//       {images.length > 0 && (
//         <ImageGallery apiImages={images} getBigImage={handleImageClick} />
//       )}

//       {images.length > 0 && !loading && (
//         <button
//           onClick={handleLoadMore}
//           className={css.loadMoreButton}
//           ref={loadMoreRef}
//         >
//           Load more
//         </button>
//       )}

//       {loading && <DotLoader color="purple" />}
//     </div>
//   );
// };

// export default App;
