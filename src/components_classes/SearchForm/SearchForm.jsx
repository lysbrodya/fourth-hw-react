const SearchForm = ({ onSearch }) => {
  const hendleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const topic = form.elements.topic.value;

    if (form.elements.topic.value.trim() === "") {
      alert("Please enter search term!");
      return;
    }

    onSearch(topic);
    form.reset();
  };

  return (
    <form onSubmit={hendleSubmit}>
      <input type="text" name="topic" placeholder="Search..." />
      <button>Search</button>
    </form>
  );
};
export default SearchForm;

// const SearchForm = ({ onSearch }) => {
//     const handleSubmit = (evt) => {
//       evt.preventDefault();
//       const form = evt.target;
//       const topic = form.elements.topic.value;

//       if (form.elements.topic.value.trim() === "") {
//         alert("Please enter search term!");
//         return;
//       }

//       onSearch(topic);
//       form.reset();
//     };

//     return (
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="topic" placeholder="Пошук статей..." />
//         <button>Пошук</button>
//       </form>
//     );
//   };

//   export default SearchForm;
