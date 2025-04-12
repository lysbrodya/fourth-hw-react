import { Field, Form, Formik } from "formik";
import css from "./SearchBar.module.css";
import { BiSearchAlt } from "react-icons/bi";
import toast, { Toaster } from "react-hot-toast";
const SearchBar = ({ onSearch }) => {
  return (
    <div className={css.heder}>
      {" "}
      <Formik
        initialValues={{
          value: "",
        }}
        onSubmit={(values, actions) => {
          console.log(values);
          if (values.value.trim() === "") {
            toast.error("Eneter a search term", {
              duration: 2000,
              position: "top-right",
            });
            return;
          }
          onSearch(values.value.trim());
          actions.resetForm();
        }}
      >
        <Form className={css.searchForm}>
          <button type="submit" className={css.searchButton}>
            <BiSearchAlt />
          </button>
          <Field
            name="value"
            placeholder="Search..."
            className={css.searchInput}
          />
        </Form>
      </Formik>
      <Toaster />
    </div>
  );
};
export default SearchBar;
