import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import Calendar from "../../../../containers/Calendar";
import styles from "./DatePickerModal.module.css";

const trans = {
  pick_date: {
    en: "Pick departure date",
    vi: "Chọn ngày khởi hành",
  },
};

function DatePickerModal(props) {
  const lang = useTranslation().i18n.language;
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className={styles.container + " p-2"}>
        <h6 className="text-center pt-1">{trans.pick_date[lang]}</h6>
        <Calendar
          availableDates={props.tour.departureDates.map(
            (item) => new Date(item)
          )}
          onSelect={(d) => {
            props.setSelectedDate(d);
            props.setModalShow("book");
          }}
        />
      </div>
    </Modal>
  );
}

export default DatePickerModal;