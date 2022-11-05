// main
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// components

// apis
import useAxios from "../../../hooks/useAxios";
import { userApi } from "../../../services/apis";

// store
import { setUser } from "../../../store/user.slice";

// css
import styles from "./Login.module.css";

const validator = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "Missing username";
  }

  if (!values.password) {
    errors.password = "Missing password";
  }

  return errors;
};

const initialValues = {
  username: "",
  password: "",
};

function Login() {
  const [sendRequest, isLoading, data, error] = useAxios();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  console.log(userApi.login());
  const submitHandler = (values) => {
    //
    sendRequest(userApi.login(values.username, values.password));
  };

  useEffect(() => {
    if (data) {
      alert("Login thanh cong");
      dispatch(setUser(data.user));
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
  }, [data]);

  if (user) {
    return <Navigate to="/admin" />;
  }

  return (
    <div className={styles.login}>
      <Formik
        initialValues={initialValues}
        validate={validator}
        onSubmit={submitHandler}
      >
        {({ isSubmitting }) => (
          <Form>
            <label>
              <Field type="text" name="username" placeholder="username" />
              <ErrorMessage name="username" component="span" />
            </label>
            <label>
              <Field type="password" name="password" placeholder="password" />
              <ErrorMessage name="password" component="span" />
            </label>

            {error && <p className={styles.errorMessage}>{error.message}</p>}
            <button type="submit">Login</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
