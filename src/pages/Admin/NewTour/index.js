// main
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

// components
import AdminLayout from "../../../layout/AdminLayout";
import SpinnerModal from "../../../components/SpinnerModal";

// apis
import useAxios from "../../../hooks/useAxios";
import { tourApi } from "../../../services/apis";

// helpers
import arrayFormData from "../../../services/helpers/arrayFormData";

// css
import "./NewTour.css";
import { useEffect } from "react";

const initialValues = {
  name: "",
  journey: "",
  description: "",
  departureDates: "",
  duration: "",
  lowestPrice: 0,
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

  if (!values.description) {
    errors.description = "Trường này là bắt buộc";
  }

  if (!values.highlights) {
    errors.highlights = "Trường này là bắt buộc";
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
  const navigate = useNavigate();

  const selectImagesHandler = (e) => {
    setImages(Array.from(e.target.files));
  };

  const submitHandler = (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("journey", values.journey);
    formData.append("lowestPrice", values.lowestPrice);
    formData.append("description", values.description);
    arrayFormData(
      formData,
      "departureDates",
      values.departureDates.split("\n")
    );

    arrayFormData(formData, "priceIncludes", values.priceIncludes.split("\n"));
    arrayFormData(formData, "priceExcludes", values.priceExcludes.split("\n"));
    arrayFormData(
      formData,
      "cancellationPolicy",
      values.cancellationPolicy.split("\n")
    );
    arrayFormData(formData, "highlights", values.highlights.split("\n"));

    formData.append("duration", values.duration);
    images.forEach((item) => {
      formData.append("images", item);
    });

    sendRequest(tourApi.add(formData));
  };

  useEffect(() => {
    if (data) {
      alert("Tạo tour mới thành công");
      navigate("/admin/tours");
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      alert("Có lỗi xảy ra: ", error.mesage);
    }
  }, [error]);

  return (
    <>
      <SpinnerModal show={isLoading} />
      <AdminLayout title="Tạo tour mới">
        <div className="newTour">
          <div className="main">
            <Formik
              initialValues={initialValues}
              validate={validator}
              onSubmit={submitHandler}
            >
              {() => (
                <Form className="newTour__form">
                  <label>
                    <p className="newTour__label">Tên tour</p>
                    <Field component="textarea" name="name" />
                    <ErrorMessage name="name" component="p" />
                  </label>

                  <label>
                    <p className="newTour__label">Lộ trình</p>
                    <Field component="textarea" name="journey" />
                    <ErrorMessage name="journey" component="p" />
                  </label>

                  <label>
                    <p className="newTour__label">Mô tả</p>
                    <Field component="textarea" name="description" />
                    <ErrorMessage name="description" component="p" />
                  </label>

                  <label>
                    <p className="newTour__label">
                      Ngày khởi hành (mm/dd/yyyy){" "}
                      <span>(enter xuống dòng)</span>
                    </p>
                    <Field component="textarea" name="departureDates" />
                    <ErrorMessage name="departureDates" component="p" />
                  </label>

                  <label>
                    <p className="newTour__label">Thời gian</p>
                    <Field type="text" name="duration" />
                    <ErrorMessage name="duration" component="p" />
                  </label>

                  <label>
                    <p className="newTour__label">
                      Giá từ <span>(vnd)</span>
                    </p>
                    <Field type="number" name="lowestPrice" />
                    <ErrorMessage name="lowestPrice" component="p" />
                  </label>

                  <label>
                    <p className="newTour__label">
                      Giá bao gồm <span>(enter xuống dòng)</span>
                    </p>
                    <Field component="textarea" name="priceIncludes" />
                    <ErrorMessage name="priceIncludes" component="p" />
                  </label>

                  <label>
                    <p className="newTour__label">
                      Giá không bao gồm <span>(enter xuống dòng)</span>
                    </p>
                    <Field component="textarea" name="priceExcludes" />
                    <ErrorMessage name="priceExcludes" component="p" />
                  </label>

                  <label>
                    <p className="newTour__label">
                      Điểm nổi bật <span>(enter xuống dòng)</span>
                    </p>
                    <Field component="textarea" name="highlights" />
                    <ErrorMessage name="highlights" component="p" />
                  </label>

                  <label>
                    <p className="newTour__label">
                      Điều kiện hoàn hủy đổi <span>(enter xuống dòng)</span>
                    </p>
                    <Field component="textarea" name="cancellationPolicy" />
                    <ErrorMessage name="cancellationPolicy" component="p" />
                  </label>

                  <label>
                    <p className="newTour__label">Hình ảnh</p>
                    <input
                      type="file"
                      multiple
                      onChange={selectImagesHandler}
                    />
                    <ErrorMessage name="images" component="p" />
                  </label>

                  <button type="submit">Submit</button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}

export default NewTour;
