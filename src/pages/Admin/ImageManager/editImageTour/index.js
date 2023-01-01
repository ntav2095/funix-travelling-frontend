import { Form, Formik } from "formik";
import tourValidator from "./tour.validator";
import FormGroup from "./FormGroup";
import { AdminLayout, formPacker, StatusBar, tourApis, useAxios, usePageTitle } from "../../Tours/EditTour/import";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styles from './image.module.css'



function EditImangeTour() {
  const [goEdit, editing, isSuccess, editingError] = useAxios();
  const [fetchTour, fetching, fetchedData, fetchingError] = useAxios();
  const [tour, setTour] = useState(null);
  const [lang, setLang] = useState("vi");
  const { tourId } = useParams();
  const submitRef = useRef();

  const submitHandler = (values) => {
    const formData = formPacker(values, tourId);
    goEdit(tourApis.edit(formData));
  };

  useEffect(() => {
    fetchTour(tourApis.getSingle(tourId, lang));
  }, [lang]);

  useEffect(() => {
    if (fetchedData) {
      setTour(fetchedData.data);
    }
  }, [fetchedData]);

  useEffect(() => {
    if (isSuccess) {
      alert(`Thành công`);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (editingError) {
      alert(`Có lỗi xảy ra: ${editingError.message}`);
    }
  }, [editingError]);

  const images = tour
    ? tour.itinerary.reduce((p, c) => [...p, ...c.images], [])
    : [];
  console.log("editimages", images);
  const initialValues = tour
    ? {
        ...tour,
        removedImages: [],
        departureDates: tour.departureDates,
        highlights: tour.highlights,

        days: tour.duration.days,
        nights: tour.duration.nights,

        priceIncludes: tour.price_policies.includes,
        priceExcludes: tour.price_policies.excludes,
        priceOther: tour.price_policies.other,

        cancellationPolicy: tour.terms.cancellation,
        registrationPolicy: tour.terms.registration,
        notes: tour.terms.notes,
        paymentPolicy: tour.terms.payment,

        language: lang,
        price: tour.price.toLocaleString("en-US"),
        images,
      }
    : null;
  console.log("initialValues", initialValues);
  usePageTitle("Cập nhật hình ảnh | Admin | Travel Funix");

  return (
    <AdminLayout>
      <StatusBar
        title={`Cập nhật tour: ${fetchedData?.metadata.original.code || ""}`}
      >

        <button
          type="button"
          onClick={() => {
            if (submitRef.current) {
              submitRef.current.click();
            }
          }}
          className="btn btn-primary btn-sm"
        >
          Cập nhật
        </button>
      </StatusBar>
      <div>
        <Formik
          initialValues={initialValues}
          onSubmit={submitHandler}
          validate={tourValidator}
        >
          {({ setFieldValue, values, touched, errors }) => {
            console.log("values", values);
            return (
              <Form>
                <div>
                  <FormGroup
                    label="Chọn ảnh đại diện"
                    isRequired
                    name="thumb"
                    type="file"
                    setFieldValue={setFieldValue}
                  />
                  {values?.thumb && (
                    <div className={styles.currentImages}>
                      <h6>Hình đại diện</h6>
                      <div className={styles.preview}>
                        <label>
                          <img
                            src={
                              typeof values.thumb === "string"
                                ? values.thumb
                                : URL.createObjectURL(values.thumb)
                            }
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <FormGroup
                    label="Chọn ảnh banner"
                    // isRequired
                    name="banner"
                    type="file"
                    setFieldValue={setFieldValue}
                  />

                  {values?.banner && (
                    <div className={styles.currentImages}>
                      <h6>Hình banner</h6>
                      <div className={styles.preview}>
                        <label>
                          <img
                            src={
                              typeof values.banner === "string"
                                ? values.banner
                                : URL.createObjectURL(values.banner)
                            }
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>
                <button type="submit" ref={submitRef} hidden></button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </AdminLayout>
  );
}
export default EditImangeTour;
