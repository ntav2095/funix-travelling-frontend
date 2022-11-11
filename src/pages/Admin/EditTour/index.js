// main
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

// components
import AdminLayout from "../../../layout/AdminLayout";
import SpinnerModal from "../../../components/SpinnerModal";

// apis
import useAxios from "../../../hooks/useAxios";
import { tourApi } from "../../../services/apis";

// helpers
import formatDate from "../../../services/helpers/formatDate";
import { stringToDate } from "../../../services/helpers/dateHandler";

// assets
import { exclamation as exclamationSVG } from "../../../assets/svgs";

// services
import { tourValidator } from "../../../services/validators";

// css
import "./NewTour.css";

function EditTour() {
  const [images, setImages] = useState([]);
  const [fetch, isFetching, tour, fetchingError] = useAxios();
  const [edit, isEditing, editingResult, editingError] = useAxios();
  const [removedImages, setRemovedImages] = useState([]);
  const { tourId } = useParams();
  const navigate = useNavigate();

  const selectImagesHandler = (e) => {
    setImages(Array.from(e.target.files));
  };

  const changeRemoveImageHandler = (url) => {
    if (removedImages.includes(url)) {
      setRemovedImages((prev) => prev.filter((item) => item !== url));
    } else {
      setRemovedImages((prev) => [...prev, url]);
    }
  };

  const initialValues = !tour
    ? null
    : {
        name: tour.item.name || "",
        journey: tour.item.journey || "",
        description: tour.item?.description || "",
        departureDates:
          tour.item.time.departureDates
            .map((item) => formatDate(item))
            .join("\n") || "",
        duration: tour.item.time.duration || "",
        lowestPrice: tour.item.price.from || "",
        oldPrice: tour.item.price.old || "",
        priceIncludes: tour.item.price.includes.join("\n") || "",
        priceExcludes: tour.item.price.includes.join("\n") || "",
        images: tour.item.images,
        highlights: tour.item.highlights.join("\n") || "",
        cancellationPolicy: tour.item.cancellationPolicy.join("\n") || "",
      };

  const submitHandler = (values) => {
    const formData = new FormData();
    formData.append("tourId", tourId);
    formData.append("name", values.name);
    formData.append("journey", values.journey);
    formData.append("lowestPrice", values.lowestPrice);
    formData.append("oldPrice", values.oldPrice);
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

    formData.append("removedImages", JSON.stringify(removedImages));

    edit(tourApi.edit(formData));
  };

  useEffect(() => {
    fetch(tourApi.getSingleTour(tourId));
  }, []);

  useEffect(() => {
    if (editingResult) {
      alert("Cập nhật tour thành công. Bạn sẽ được chuyển đến trang tour.");
      navigate("/admin/tours");
    }
  }, [editingResult]);

  useEffect(() => {
    if (editingError) {
      alert(`Có lỗi xảy ra: ${editingError.message.vi}`);
    }
  }, [editingError]);

  const requiredField = (
    <span title="Trường này là bắt buộc">{exclamationSVG}</span>
  );

  return (
    <>
      <SpinnerModal show={isFetching || isEditing} />

      <AdminLayout title={`Cập nhật tour: ${tour?.item.name || ""}`}>
        <div className="newTour">
          <div className="main">
            {tour && (
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
                        Ngày khởi hành <span>(dd/mm/yyyy) </span>
                        <span>(enter xuống dòng)</span> {requiredField}
                      </p>
                      <Field component="textarea" name="departureDates" />
                      <ErrorMessage name="departureDates" component="p" />
                    </label>

                    <label>
                      <p className="newTour__label">
                        Thời gian {requiredField}
                      </p>
                      <Field type="text" name="duration" />
                      <ErrorMessage name="duration" component="p" />
                    </label>

                    <label>
                      <p className="newTour__label">
                        Giá từ (giá áp dụng) {requiredField}
                      </p>
                      <Field type="number" name="lowestPrice" />
                      <ErrorMessage name="lowestPrice" component="p" />
                    </label>

                    <label>
                      <p className="newTour__label">Giá gốc/giá cũ</p>
                      <Field type="number" name="oldPrice" />
                      <ErrorMessage name="oldPrice" component="p" />
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
                        {requiredField}
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
                      <p className="newTour__label">Thêm hình ảnh mới</p>
                      <input
                        type="file"
                        multiple
                        onChange={selectImagesHandler}
                      />
                      <ErrorMessage name="images" component="p" />
                    </label>

                    {/* handle remove images  */}
                    <p>Chọn hình ảnh bạn muốn loại bỏ dưới đây:</p>
                    <div className="editTour__imagesContainer">
                      {tour.item.images.map((item) => (
                        <div key={item}>
                          <input
                            onChange={() => changeRemoveImageHandler(item)}
                            checked={removedImages.includes(item)}
                            type="checkbox"
                          />

                          <div className="image">
                            <img src={item} />
                            <p className="removeText">remove</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button type="submit">Submit</button>
                  </Form>
                )}
              </Formik>
            )}
          </div>
        </div>
      </AdminLayout>
    </>
  );
}

export default EditTour;
