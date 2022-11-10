// main
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

// components
import AdminLayout from "../../../layout/AdminLayout";
import SpinnerModal from "../../../components/SpinnerModal";

// apis
import useAxios from "../../../hooks/useAxios";
import { tourApi } from "../../../services/apis";

// helpers
import { stringToDate } from "../../../services/helpers/dateHandler";

// services
import { tourValidator } from "../../../services/validators";

// assets
import { exclamation as exclamationSVG } from "../../../assets/svgs";

// css
import "./NewTour.css";

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
    formData.append(
      "departureDates",
      JSON.stringify(
        values.departureDates.split("\n").map((item) => stringToDate(item)[1])
      )
    );

    formData.append(
      "priceIncludes",
      JSON.stringify(values.priceIncludes.split("\n"))
    );
    formData.append(
      "priceExcludes",
      JSON.stringify(values.priceExcludes.split("\n"))
    );
    formData.append(
      "cancellationPolicy",
      JSON.stringify(values.cancellationPolicy.split("\n"))
    );
    formData.append(
      "highlights",
      JSON.stringify(values.highlights.split("\n"))
    );
    formData.append("duration", values.duration);
    images.forEach((item) => {
      formData.append("images", item);
    });

    sendRequest(tourApi.add(formData));
  };

  useEffect(() => {
    if (data) {
      alert("Tạo tour mới thành công. Bạn sẽ được chuyển đến tranng tours.");
      navigate("/admin/tours");
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      alert(`Có lỗi xảy ra: ${error.message.vi}`);
    }
  }, [error]);

  const requiredField = (
    <span title="Trường này là bắt buộc">{exclamationSVG}</span>
  );

  return (
    <>
      <SpinnerModal show={isLoading} />

      <AdminLayout title="Tạo tour mới">
        <div className="newTour">
          <div className="main">
            <Formik
              initialValues={initialValues}
              validate={tourValidator}
              onSubmit={submitHandler}
            >
              {() => (
                <Form className="newTour__form">
                  <label>
                    <p className="newTour__label">Tên tour {requiredField}</p>
                    <Field component="textarea" name="name" />
                    <ErrorMessage name="name" component="p" />
                  </label>

                  <label>
                    <p className="newTour__label">Lộ trình {requiredField}</p>
                    <Field component="textarea" name="journey" />
                    <ErrorMessage name="journey" component="p" />
                  </label>

                  <label>
                    <p className="newTour__label">Mô tả {requiredField}</p>
                    <Field component="textarea" name="description" />
                    <ErrorMessage name="description" component="p" />
                  </label>

                  <label>
                    <p className="newTour__label">
                      Ngày khởi hành <span>(dd/mm/yyyy)</span>{" "}
                      <span>(enter xuống dòng)</span> {requiredField}
                    </p>
                    <Field component="textarea" name="departureDates" />
                    <ErrorMessage name="departureDates" component="p" />
                  </label>

                  <label>
                    <p className="newTour__label">Thời gian {requiredField}</p>
                    <Field type="text" name="duration" />
                    <ErrorMessage name="duration" component="p" />
                  </label>

                  <label>
                    <p className="newTour__label">
                      Giá từ <span>(vnd)</span> {requiredField}
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
                      Điểm nổi bật <span>(enter xuống dòng)</span>{" "}
                      <span title="Trường này là bắt buộc">
                        {exclamationSVG}
                      </span>
                    </p>
                    <Field component="textarea" name="highlights" />
                    <ErrorMessage name="highlights" component="p" />
                  </label>

                  <label>
                    <p className="newTour__label">
                      Điều kiện hoàn hủy đổi <span>(enter xuống dòng)</span>{" "}
                      {requiredField}
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
