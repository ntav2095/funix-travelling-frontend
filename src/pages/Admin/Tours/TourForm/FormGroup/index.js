import { Field, ErrorMessage } from "formik";
import Editor from "../../../../../containers/Editor";
import styles from "./FormGroup.module.css";

const requiredField = <em title="Bắt buộc">(bắt buộc)</em>;

function FormGroup(props) {
  const {
    isRequired,
    label,
    note,
    component,
    type,
    name,
    setFieldValue,
    setFieldTouched,
    values,
  } = props;

  // label
  let form_label = (
    <p className={styles.label}>
      {label} {note && <em>{note}</em>} {isRequired && requiredField}
    </p>
  );

  // field
  let form_field;

  if (type !== "file") {
    form_field = <Field component={component} type={type} name={name} />;
  }

  if (type === "file") {
    form_field = (
      <input
        type="file"
        name={name}
        onChange={(e) => setFieldValue(name, Array.from(e.target.files)[0])}
      />
    );
  }

  if (type === "editor") {
    form_field = (
      <div className={styles.editor}>
        <Editor
          initialValue={values[name]}
          onChange={(delta) => setFieldValue(name, delta)}
          onBlur={() => setFieldTouched(name, true, true)}
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {form_label}
      {form_field}
      <div className={styles.errorMessage}>
        <ErrorMessage name={name} component="h6" />
      </div>
    </div>
  );
}

export default FormGroup;
