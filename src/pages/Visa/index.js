import React, { useRef, useState } from "react";
import usePageTitle from "../../hooks/usePageTitle";

import VisaProduct from "./VisaProduct";
import useAxios from "../../hooks/useAxios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Visa.module.css";
import { useTranslation } from "react-i18next";

function Visa() {
  const [color, setColor] = useState({
    choose: "#000",
    book: "#ec4325",
  });
  const [sendRequest, isLoading, data, error, resetStates] = useAxios();
  const { visaCountry } = useParams();
  const lang = useTranslation().i18n.language;

  useEffect(() => {
    sendRequest({
      method: "GET",
      url: `http://localhost:5000/visa/country/${visaCountry}`,
    });
  }, [lang]);
  usePageTitle(`Visa --- đang cập nhật || Go Travel`);

  const products = data ? data.data : null;
  return (
    <>
      <div className="border border-dark p-2 mb-5">
        <h4>Chỉnh layout</h4>
        <div className="d-flex gap-5 mb-5">
          <div>
            <h6>Nút 'CHỌN'</h6>
            <input
              type="color"
              onChange={(e) =>
                setColor((prev) => ({ ...prev, choose: e.target.value }))
              }
            />
          </div>

          <div>
            <h6>Nút 'ĐẶT'</h6>
            <input
              type="color"
              onChange={(e) =>
                setColor((prev) => ({ ...prev, book: e.target.value }))
              }
            />
          </div>
        </div>
      </div>

      <h1>Dịch vụ làm visa Ý</h1>

      <div className="bg-light p-1">
        <div className="Body-content-2 container">
          <div>
            <h2 className={styles.chooseProductTitle}>Chọn gói dịch vụ</h2>

            <ul className={styles.products}>
              {products &&
                products.length > 0 &&
                products.map((product) => (
                  <li key={product._id}>
                    <VisaProduct product={product} color={color} />
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Visa;
