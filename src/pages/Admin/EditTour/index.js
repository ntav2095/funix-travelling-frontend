// main
import { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useParams } from "react-router-dom";

// components
import AdminLayout from "../../../layout/AdminLayout";

// apis
import useAxios from "../../../hooks/useAxios";
import { tourApi } from "../../../services/apis";

// helpers
import arrayFormData from "../../../services/helpers/arrayFormData";

// css
import "./NewTour.css";
import { useEffect } from "react";

const initialValues = {
  name: "", // required
  journey: "", // required
  description: "",
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

  return {};

  return errors;
};

function EditTour() {
  const [images, setImages] = useState([]);
  const [fetch, isFetching, tour, fetchingError] = useAxios();
  const [removedImages, setRemovedImages] = useState([]);
  const [edit, isEditing, editingResult, editingError] = useAxios();
  const { tourId } = useParams();

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
        name: tour.item.name, // required
        journey: tour.item.journey, // required
        description: tour.item.description, // required
        departureDates: tour.item.time.departureDates.join("\n"), // require
        duration: tour.item.time.duration, // required
        lowestPrice: tour.item.price.from, // required
        priceIncludes: tour.item.price.includes.join("\n"),
        priceExcludes: tour.item.price.includes.join("\n"),
        images: tour.item.images,
        highlights: tour.item.highlights.join("\n"),
        cancellationPolicy: tour.item.cancellationPolicy.join("\n"),
      };

  const submitHandler = (values, { setSubmitting }) => {
    console.log(values.cancellationPolicy);

    const formData = new FormData();
    console.log(tourId);
    formData.append("tourId", tourId);
    formData.append("name", values.name);
    formData.append("journey", values.journey);
    formData.append("description", values.description);
    formData.append("lowestPrice", values.lowestPrice);
    arrayFormData(
      formData,
      "departureDates",
      values.departureDates.split("\n")
    );
    arrayFormData(formData, "removedImages", removedImages);
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

    edit(tourApi.edit(formData));
  };

  useEffect(() => {
    fetch(tourApi.getSingleTour(tourId));
  }, []);

  console.log(tour, "xxxx");

  return (
    <AdminLayout>
      <div className="newTour">
        <h1>New tour</h1>

        <div className="main">
          {tour && (
            <Formik
              initialValues={initialValues}
              validate={validator}
              onSubmit={submitHandler}
            >
              {({ isSubmitting }) => (
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
                      Ngày khởi hành (dd/mm/yyyy) (enter xuống dòng)
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
                    <p className="newTour__label">Thêm hình ảnh mới</p>
                    <input
                      type="file"
                      multiple
                      onChange={selectImagesHandler}
                    />
                    <ErrorMessage name="images" component="p" />
                  </label>

                  {/* handle remove images  */}
                  {tour.item.images.map((item) => (
                    <div key={item}>
                      <input
                        onChange={() => changeRemoveImageHandler(item)}
                        checked={removedImages.includes(item)}
                        type="checkbox"
                      />
                      <img src={item} />
                    </div>
                  ))}

                  <button type="submit">Submit</button>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default EditTour;
