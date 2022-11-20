import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Formik, Field, ErrorMessage, Form } from "formik";
import styles from "./CatForm.module.css";
import Spinner from "../../../../components/Spinner";

const validator = (values) => {
  const errors = {};
  if (!values.type) {
    errors.type = "Bắt buộc";
  }

  if (!values.code) {
    errors.code = "Bắt buộc";
  }

  if (!values.name) {
    errors.name = "Bắt buộc";
  }

  return errors;
};

function CatForm({ initialValues, onSubmit, categories }) {
  const submitHandler = (values) => {
    onSubmit(values);
  };

  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={submitHandler}
        validate={validator}
      >
        {() => (
          <Form>
            <label>
              <h6>Type</h6>
              <Field name="type" />
              <ErrorMessage component="p" name="type" />
            </label>

            <label>
              <h6>Name</h6>
              <Field name="name" />
              <ErrorMessage component="p" name="name" />
            </label>

            <label>
              <h6>Code</h6>
              <Field name="code" />
              <ErrorMessage component="p" name="code" />
            </label>

            <label>
              <h6>Parent</h6>
              <Field as="select" name="parent">
                <option value="">Không</option>
                {categories &&
                  categories.map((catItem, index) => (
                    <option key={index} value={catItem._id}>
                      {catItem.type}: {catItem.name || catItem.code}
                    </option>
                  ))}
              </Field>
              <ErrorMessage component="p" name="parent" />
            </label>

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CatForm;
