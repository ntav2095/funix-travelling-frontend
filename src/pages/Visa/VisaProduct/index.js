import { Col, Container, Row } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Collapse } from "react-bootstrap";
import VisaDetail from "./VisaDetail";
import { useState, useEffect } from "react";
import VisaBooking from "./VisaBooking";

import styles from "./VisaProduct.module.css";

function VisaProduct({ product, color }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      <div className="row">
        <div className="col-4">
          <div>
            <h3 className="fw-bold fs-5">{product.name}</h3>
          </div>
        </div>

        <div className="col-4">
          <div>
            <div className={styles.price}>
              {product.price.toLocaleString()} VND
            </div>
          </div>
        </div>

        <div className="col-4">
          <div className="d-flex justify-content-end">
            <button
              onClick={toggle}
              style={{ background: isOpen ? "#fff" : color.choose }}
              className={styles.chooseBtn + " " + (isOpen && styles.active)}
            >
              {isOpen ? "HỦY" : "CHỌN"}
            </button>
          </div>
        </div>
      </div>

      <Collapse in={isOpen}>
        <div className="mt-2">
          <VisaBooking color={color} product={product} />
        </div>
      </Collapse>

      <div className="mt-3">
        <VisaDetail product={product} />
      </div>
    </>
  );
}

export default VisaProduct;
