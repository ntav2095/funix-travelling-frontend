// main
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

// components
import AdminLayout from "../../../layout/AdminLayout";
import Initerary from "./Itinerary";

// apis
import useAxios from "../../../hooks/useAxios";
import { tourApi } from "../../../services/adminApis";

// css
import "./NewTour.css";
import { useEffect } from "react";

const initialValues = {
  name: "", // required
  journey: "", // required
  departureDates: "", // require
  duration: "", // required
  lowestPrice: 0, // required
  priceIncludes: "",
  priceExcludes: "",
  images: [],
  highlights: "",
  cancellationPolicy: "",
};

const validator = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Trường này là bắt buộc";
  }

  if (!values.journey) {
    errors.journey = "Trường này là bắt buộc";
  }

  if (Number(values.lowestPrice) <= 0) {
    errors.lowestPrice = "Giá phải lớn hơn 0";
  }

  if (isNaN(Number(values.lowestPrice))) {
    errors.lowestPrice = "Trường này phải là số";
  }

  if (!values.duration) {
    errors.duration = "Trường này là bắt buộc";
  }

  if (!values.departureDates) {
    errors.departureDates = "Trường này là bắt buộc";
  }

  return errors;
};

function NewTour() {
  const [images, setImages] = useState([]);
  const [sendRequest, isLoading, data, error] = useAxios();
  const selectImagesHandler = (e) => {
    setImages(Array.from(e.target.files));
  };

  const submitHandler = (values, { setSubmitting }) => {
    console.log(values.highlights);
    const x = values.highlights;
    console.log(x.split("\n"));
    console.log(images);

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("journey", values.journey);
    formData.append("lowestPrice", values.lowestPrice);
    formData.append("departureDates", values.departureDates.split("\n"));
    formData.append("priceIncludes", values.priceIncludes.split("\n"));
    formData.append("priceExcludes", values.priceExcludes.split("\n"));
    formData.append(
      "cancellationPolicy",
      values.cancellationPolicy.split("\n")
    );
    formData.append("highlights", values.highlights.split("\n"));
    formData.append("duration", values.duration);
    images.forEach((item) => {
      formData.append("images", item);
    });

    sendRequest(tourApi.addTour(formData));
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <AdminLayout>
      <div className="newTour">
        <h1>New tour</h1>

        <div className="main">
          <Formik
            initialValues={initialValues}
            validate={() => ({})}
            onSubmit={submitHandler}
          >
            {({ isSubmitting }) => (
              <Form className="newTour__form">
                <label>
                  <p className="newTour__label">Tên tour</p>
                  <Field type="textarea" name="name" />
                  <ErrorMessage name="name" component="p" />
                </label>

                <label>
                  <p className="newTour__label">Lộ trình</p>
                  <Field type="textarea" name="journey" />
                  <ErrorMessage name="journey" component="p" />
                </label>

                <label>
                  <p className="newTour__label">
                    Ngày khởi hành (dd/mm/yyyy) (enter xuống dòng)
                  </p>
                  <Field type="textarea" name="departureDates" />
                  <ErrorMessage name="departureDates" component="p" />
                </label>

                <label>
                  <p className="newTour__label">Thời gian</p>
                  <Field type="text" name="duration" />
                  <ErrorMessage name="duration" component="p" />
                </label>

                <label>
                  <p className="newTour__label">Giá từ</p>
                  <Field type="number" name="lowestPrice" />
                  <ErrorMessage name="lowestPrice" component="p" />
                </label>

                <label>
                  <p className="newTour__label">
                    Giá bao gồm (enter xuống dòng)
                  </p>
                  <Field component="textarea" name="priceIncludes" />
                  <ErrorMessage name="priceIncludes" component="p" />
                </label>

                <label>
                  <p className="newTour__label">
                    Giá không bao gồm (enter xuống dòng)
                  </p>
                  <Field component="textarea" name="priceExcludes" />
                  <ErrorMessage name="priceExcludes" component="p" />
                </label>

                <label>
                  <p className="newTour__label">
                    Điểm nổi bật (enter xuống dòng)
                  </p>
                  <Field component="textarea" name="highlights" />
                  <ErrorMessage name="highlights" component="p" />
                </label>

                <label>
                  <p className="newTour__label">
                    Điều kiện hoàn hủy đổi (enter xuống dòng)
                  </p>
                  <Field component="textarea" name="cancellationPolicy" />
                  <ErrorMessage name="cancellationPolicy" component="p" />
                </label>

                <label>
                  <p className="newTour__label">Hình ảnh</p>
                  <input type="file" multiple onChange={selectImagesHandler} />
                  <ErrorMessage name="images" component="p" />
                </label>

                <Initerary />

                <button type="submit">Submit</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </AdminLayout>
  );
}

export default NewTour;
