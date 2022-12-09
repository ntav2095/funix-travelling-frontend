import { Field, ErrorMessage } from "formik";
import Editor from "../../../../../containers/Editor";
import styles from "./FormGroup.module.css";
import {
  isSameDate,
  stringToDate,
} from "../../../../../services/helpers/dateHandler";
import { format } from "date-fns";

const requiredField = <em title="Bắt buộc">(bắt buộc)</em>;

const allowedChars = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const numberInputHandler = (prevVal, curVal) => {
  // delete
  if (curVal.length < prevVal.length) {
    return [null, Number(curVal.replace(/,/g, "")).toLocaleString()];
  }

  const newChar = curVal.replace(prevVal, "");
  // new char is dot
  if (newChar === ".") {
    if (prevVal.includes(".")) {
      return [true, null];
    } else {
      return [null, Number(prevVal.replace(/,/g, "")).toLocaleString() + "."];
    }
  }

  if (!allowedChars.includes(newChar)) return [true, null];
  return [null, Number(curVal.replace(/,/g, "")).toLocaleString()];
};

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
    ...other
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
    form_field = (
      <Field component={component} type={type} name={name} {...other} />
    );
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

  if (type === "locale-number") {
    form_field = (
      <input
        type="text"
        value={values[name]}
        onChange={(e) => {
          const [error, numberValue] = numberInputHandler(
            values[name],
            e.target.value
          );
          if (error) return;
          setFieldValue(name, numberValue, true);
        }}
      />
    );
  }

  if (type === "departureDates") {
    form_field = (
      <div>
        <input
          required={isRequired}
          type="text"
          name="todo"
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              console.log("hehe");
              e.preventDefault();
              return false;
            }
          }}
          onKeyUp={(e) => {
            if (e.code === "Enter") {
              const [err, newDate] = stringToDate(e.target.value);
              if (!err) {
                if (values.departureDates.includes(newDate)) {
                  alert("Trùng ngày");
                  return;
                }
                setFieldValue(
                  "departureDates",
                  [...values.departureDates, newDate],
                  true
                );
                e.target.value = "";
              }
            }
          }}
        />

        <div className="d-flex flex-wrap">
          {values.departureDates.map((item, index) => (
            <p className="btn btn-sm btn-secondary me-1 mt-2" key={item}>
              {format(new Date(item), "dd/MM/yyyy")}
              <span
                className="ms-2"
                onClick={() => {
                  setFieldValue(
                    "departureDates",
                    values.departureDates.filter(
                      (timestamp) =>
                        !isSameDate(new Date(item), new Date(timestamp))
                    ),
                    true
                  );
                }}
              >
                x
              </span>
            </p>
          ))}
        </div>
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
