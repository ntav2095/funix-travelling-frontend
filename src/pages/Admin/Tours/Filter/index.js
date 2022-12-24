import { useState } from "react";
import {
  reset as resetSVG,
  magnifyingGlass,
  funnel_solid,
} from "../../../../assets/svgs";
import styles from "./Filter.module.css";

function Filter({ setFilter, filter }) {
  const [searchInput, setSearchInput] = useState("");

  const changeFilterHandler = (e, type) => {
    if (type === "banner") {
      setFilter((prev) => ({ ...prev, banner: e.target.value, page: 1 }));
    }

    if (type === "category") {
      setFilter((prev) => ({ ...prev, category: e.target.value, page: 1 }));
    }

    if (type === "search" && searchInput.trim()) {
      setFilter((prev) => ({ ...prev, search: searchInput, page: 1 }));
    }

    if (type === "resetSearch") {
      if (filter.search) {
        setFilter((prev) => ({ ...prev, search: "", page: 1 }));
        setSearchInput("");
      }
    }

    if (type === "reset") {
      setSearchInput("");
      setFilter({
        category: "",
        search: "",
        banner: "",
        page: 1,
      });
    }
  };

  const isNoFilter = !filter.category && !filter.banner && !filter.search;

  return (
    <div>
      <div className={styles.filter}>
        <button
          className={
            "border bg-secondary text-white " +
            (isNoFilter && "opacity-50 pe-none")
          }
          onClick={() => changeFilterHandler(null, "reset")}
        >
          <span className="me-1 fs-6">{funnel_solid}</span>
          Đặt lại bộ lọc
        </button>
        <select
          value={filter.category}
          onChange={(e) => changeFilterHandler(e, "category")}
        >
          <option value="">Danh mục</option>
          <option value="">Chưa phân loại --- chưa làm</option>
          <option value="europe">Tour châu Âu</option>
          <option value="vi">Tour Việt Nam</option>
        </select>

        <select onChange={(e) => changeFilterHandler(e, "banner")}>
          <option value="">Banner</option>
          <option value="home-slider">Banner home</option>
          <option value="vn-tours">Banner tours VN</option>
          <option value="eu-tours">Du lịch châu Âu</option>
        </select>

        <form>
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            className={styles.searchBtn}
            onClick={(e) => changeFilterHandler(e, "search")}
            type="button"
          >
            {magnifyingGlass}
          </button>
          <button
            className={styles.resetBtn}
            onClick={(e) => changeFilterHandler(e, "resetSearch")}
            type="button"
            title="reset search"
          >
            {resetSVG}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Filter;
