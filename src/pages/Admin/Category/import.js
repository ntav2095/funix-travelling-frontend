// main
import { useEffect } from "react";
import { useRef } from "react";

// components
import AdminLayout from "../../../layout/AdminLayout";
import SpinnerModal from "../../../components/SpinnerModal";

// hooks
import useAxios from "../../../hooks/useAxios";
import { adminApis, categoryApi } from "../../../services/apis";

// css
import styles from "./Category.module.css";

const CatGroup = ({ type, cat }) => {
  return (
    <div className={styles.catGroup}>
      <h6>{type}</h6>

      <ul>
        {cat
          .filter((item) => item.type === type)
          .map((item) => (
            <li key={item.code}>{item.code}</li>
          ))}
      </ul>
    </div>
  );
};

export {
  useEffect,
  AdminLayout,
  SpinnerModal,
  useAxios,
  adminApis,
  categoryApi,
  useRef,
  styles,
  CatGroup,
};
