import { useState } from "react";
import {
  funnel_solid,
  magnifyingGlass,
  reset as resetSVG,
} from "../../../../assets/svgs";
import styles from "./ArticlesFilter.module.css";

function ArticlesFilter({ setFilter, filter }) {
  const [searchInput, setSearchInput] = useState("");

  const changeFilterHandler = (e, type) => {
    if (type === "banner") {
      setFilter((prev) => ({ ...prev, banner: e.target.value, page: 1 }));
    }

    if (type === "category") {
      setFilter((prev) => ({ ...prev, category: e.target.value, page: 1 }));
    }

    if (type === "search") {
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
          <option value="diem-den">Điểm đến hấp dẫn</option>
          <option value="trai-nghiem">Trải nghiệm</option>
          <option value="cam-nang">Cẩm nang du lịch</option>
          <option value="nhat-ky">Nhật ký hành trình</option>
        </select>

        <select onChange={(e) => changeFilterHandler(e, "banner")}>
          <option value="">Banner</option>
          <option value="guides">Banner guides</option>
          <option value="diem-den">Banner điểm đến hấp dẫn</option>
          <option value="trai-nghiem">Banner trải nghiệm</option>
          <option value="cam-nang">Banner cẩm nang du lịch</option>
          <option value="nhat-ky">Banner nhật ký hành trình</option>
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

export default ArticlesFilter;
