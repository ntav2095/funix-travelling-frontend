// main
import { useEffect } from "react";
import { useParams } from "react-router-dom";

// components
import AdminLayout from "../../../layout/AdminLayout";
import VisaForm from "../../../containers/VisaForm";
import SpinnerModal from "../../../components/SpinnerModal";

// hooks
import useAxios from "../../../hooks/useAxios";
import { visaApi } from "../../../services/apis";

// css
import styles from "./AddVisa.module.css";
//
function AddVisa() {
  const [fetchVisa, isFetching, fetchData, fetchingError] = useAxios();
  const [startEditing, isEditing, updated, editingError] = useAxios();
  const { visaId } = useParams();

  const visa = fetchData ? fetchData.item : null;

  const submitHandler = (values) => {
    startEditing(visaApi.editVisa({ visaId, ...values }));
  };

  useEffect(() => {
    fetchVisa(visaApi.getSingleVisa(visaId));
  }, []);

  useEffect(() => {
    if (updated) {
      alert("Updated");
    }
  }, [updated]);

  useEffect(() => {
    if (editingError) {
      alert(`Failed: ${editingError.message.vi}`);
    }
  }, [editingError]);

  return (
    <>
      <SpinnerModal show={isFetching || isEditing} />
      <AdminLayout title={`Cập nhật dịch vụ visa ${visa ? visa.name : ""}`}>
        <div className={styles.addVisa}>
          {visa && <VisaForm onSubmit={submitHandler} visaProduct={visa} />}
        </div>
      </AdminLayout>
    </>
  );
}

export default AddVisa;
