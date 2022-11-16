// main
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Tab } from "semantic-ui-react";
import { format } from "date-fns";

// components
import AdminLayout from "../../../../layout/AdminLayout";
import SpinnerModal from "../../../../components/SpinnerModal";
import TourForm from "../TourForm";

// apis
import useAxios from "../../../../hooks/useAxios";
import { adminApis } from "../../../../services/apis";

// helpers
import { stringToDate } from "../../../../services/helpers/dateHandler";

// css
import "semantic-ui-css/semantic.min.css";
import styles from "./EditTour.module.css";

function EditTour() {
  const [goEdit, editing, isSuccess, editingError] = useAxios();
  const [fetchTour, fetching, fetchedData, fetchingError] = useAxios();
  const [tour, setTour] = useState(null);
  const [lang, setLang] = useState("vi");
  const { tourId } = useParams();

  const langs = fetchedData
    ? fetchedData.metadata.categories
        .filter((item) => item.type === "language")
        .map((item) => item.code)
    : [];

  const submitHandler = (values) => {
    const formData = new FormData();

    formData.append("language", values.language);
    formData.append("category", JSON.stringify(values.category));
    formData.append("tourId", tourId);
    formData.append("removedImages", JSON.stringify(values.removedImages));

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

    values.slider.forEach((item) => {
      formData.append("slider", item);
    });

    formData.append("thumb", values.thumb);

    goEdit(adminApis.tour.edit(formData));
  };

  useEffect(() => {
    fetchTour(adminApis.tour.getSingle(tourId, lang));
  }, [lang]);

  useEffect(() => {
    if (fetchedData) {
      setTour(fetchedData.data);
    }
  }, [fetchedData]);

  useEffect(() => {
    if (fetchingError) {
      alert(`Có lỗi xảy ra`);
    }
  }, [fetchingError]);

  useEffect(() => {
    if (isSuccess) {
      alert(`Thành công`);
    }
  }, [isSuccess]);

  const initialValues = tour
    ? {
        ...tour,
        removedImages: [],
        departureDates: tour.departureDates
          .map((item) => format(new Date(item), "dd/MM/yyyy"))
          .join("\n"),
        highlights: tour.highlights.join("\n"),
        priceIncludes: tour.priceIncludes.join("\n"),
        priceExcludes: tour.priceExcludes.join("\n"),
        cancellationPolicy: tour.cancellationPolicy.join("\n"),
        language: lang,
      }
    : null;

  return (
    <>
      <SpinnerModal show={editing || fetching} />

      <AdminLayout title="Cập nhật tour ">
        <div className={styles.editPost}>
          <h1>Tour ID: {tourId}</h1>

          <label className={styles.langSelect}>
            <span>Ngôn ngữ</span>
            <select value={lang} onChange={(e) => setLang(e.target.value)}>
              {langs.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          {initialValues && !fetching && (
            <div className={styles.container}>
              <TourForm
                key={lang}
                initialValues={initialValues}
                onSubmit={submitHandler}
                cat={fetchedData.metadata.categories}
              />
            </div>
          )}

          {!initialValues && (
            <div>
              <h2>Hiện chưa có version "{lang}" của tour này</h2>
              <button onClick={() => setTour(fetchedData.metadata.original)}>
                Thêm version tiếng "{lang}"
              </button>
            </div>
          )}
        </div>
      </AdminLayout>
    </>
  );
}

export default EditTour;
