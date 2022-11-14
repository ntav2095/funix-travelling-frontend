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
  language: "vie",
  location: "vietnam",

  name: "",
  journey: "",
  description: "",
  highlights: "",

  departureDates: "",
  days: 0,
  nights: 0,

  currentPrice: 0,
  oldPrice: 0,
  priceIncludes: "",
  priceExcludes: "",

  cancellationPolicy: "",
  images: [],
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
    formData.append("language", values.language);
    formData.append("location", values.location);

    formData.append("name", values.name);
    formData.append("journey", values.journey);
    formData.append("description", values.description);
    formData.append(
      "highlights",
      JSON.stringify(values.highlights.split("\n"))
    );

    formData.append("currentPrice", values.currentPrice);
    formData.append("oldPrice", values.oldPrice);
    formData.append(
      "priceIncludes",
      JSON.stringify(values.priceIncludes.split("\n"))
    );
    formData.append(
      "priceExcludes",
      JSON.stringify(values.priceExcludes.split("\n"))
    );

    formData.append(
      "departureDates",
      JSON.stringify(
        values.departureDates.split("\n").map((item) => stringToDate(item)[1])
      )
    );
    formData.append("days", values.days);
    formData.append("nights", values.nights);

    formData.append(
      "cancellationPolicy",
      JSON.stringify(values.cancellationPolicy.split("\n"))
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
      alert(`Có lỗi xảy ra: ${error.message}`);
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
                  {/* ----------------------- ngôn ngữ ------------------------  */}
                  <label>
                    <p className="newTour__label">Ngôn ngữ</p>
                    <Field as="select" name="language">
                      <option value="vie">Tiếng Việt</option>
                      <option value="eng">English</option>
                    </Field>
                    <ErrorMessage name="language" component="p" />
                  </label>

                  {/* ----------------------- địa điểm ------------------------  */}
                  <label>
                    <p className="newTour__label">Địa điểm</p>
                    <Field as="select" name="location">
                      <option value="vietnam">Việt Nam</option>
                      <option value="europe">Châu Âu</option>
                    </Field>
                    <ErrorMessage name="location" component="p" />
                  </label>

                  {/* ----------------------- tên tour ------------------------  */}
                  <label>
                    <p className="newTour__label">Tên tour {requiredField}</p>
                    <Field component="textarea" name="name" />
                    <ErrorMessage name="name" component="p" />
                  </label>

                  {/* ----------------------- lộ trình ------------------------  */}
                  <label>
                    <p className="newTour__label">Lộ trình {requiredField}</p>
                    <Field component="textarea" name="journey" />
                    <ErrorMessage name="journey" component="p" />
                  </label>

                  {/* ----------------------- mô tả ------------------------  */}
                  <label>
                    <p className="newTour__label">Mô tả {requiredField}</p>
                    <Field component="textarea" name="description" />
                    <ErrorMessage name="description" component="p" />
                  </label>

                  {/* ----------------------- điểm nổi bật ------------------------  */}
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

                  {/* ----------------------- ngày khởi hành ------------------------  */}
                  <label>
                    <p className="newTour__label">
                      Ngày khởi hành <span>(dd/mm/yyyy)</span>{" "}
                      <span>(enter xuống dòng)</span> {requiredField}
                    </p>
                    <Field component="textarea" name="departureDates" />
                    <ErrorMessage name="departureDates" component="p" />
                  </label>

                  {/* ----------------------- thời gian ------------------------  */}
                  <label>
                    <p className="newTour__label">Số ngày {requiredField}</p>
                    <Field type="Number" name="days" />
                    <ErrorMessage name="days" component="p" />
                  </label>

                  <label>
                    <p className="newTour__label">Số đêm {requiredField}</p>
                    <Field type="Number" name="nights" />
                    <ErrorMessage name="nights" component="p" />
                  </label>

                  {/* ----------------------- giá hiện tại ------------------------  */}
                  <label>
                    <p className="newTour__label">
                      Giá hiện tại <span>(vnd)</span> {requiredField}
                    </p>
                    <Field type="number" name="currentPrice" />
                    <ErrorMessage name="currentPrice" component="p" />
                  </label>

                  {/* ----------------------- giá cũ ------------------------  */}
                  <label>
                    <p className="newTour__label">
                      Giá cũ <span>(vnd)</span>
                    </p>
                    <Field type="number" name="oldPrice" />
                    <ErrorMessage name="oldPrice" component="p" />
                  </label>

                  {/* ----------------------- giá bao gồm / không bao gồm ------------------------  */}
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

                  {/* ----------------------- điều kiện hủy ------------------------  */}
                  <label>
                    <p className="newTour__label">
                      Điều kiện hoàn hủy đổi <span>(enter xuống dòng)</span>{" "}
                      {requiredField}
                    </p>
                    <Field component="textarea" name="cancellationPolicy" />
                    <ErrorMessage name="cancellationPolicy" component="p" />
                  </label>

                  {/* ----------------------- hình ------------------------  */}
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
