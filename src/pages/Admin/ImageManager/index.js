import { useRef } from "react";
import { PageItem } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import FormEditImage from "./formEditImage";
import {
  // main
  useEffect,
  useState,
  Link,

  // components
  AdminLayout,
  SpinnerModal,
  ErrorMessage,
  Pagination,
  StatusBar,
  Filter,
  NotifyModal,

  // api
  useAxios,
  tourApis,

  // other
  PAGE_SIZE,
  usePageTitle,
  svg,
  styles,
} from "./import";

import "./Tours.override.css";

const checkMark = <span className={styles.checkSVG}>{svg.checkCircle}</span>;

function Tours() {
  
  const [sendRequest, isLoading, data, error] = useAxios();
  const [sendRequestTour, loadingTour, tour, tourError] = useAxios();

  const submitRef = useRef();
  const [state, setState] = useState(null);
  const [filter, setFilter] = useState({
    category: "",
    search: "",
    banner: "",
    page: 1,
  });

  const query = { page: filter.page, page_size: PAGE_SIZE };
  if (filter.category) {
    query.cat = filter.category;
  }

  if (filter.search.trim()) {
    query.search = filter.search.trim();
  }

  if (filter.banner) {
    query.banner = filter.banner;
  }

  const handleSusses = () => {
    setState("");
  };
  const handleImage = async (id) => {
    await sendRequestTour(tourApis.getSingle(id));
  };

  useEffect(() => {
    if (tour) {
      setState(tour.data);
    }
  }, [tour]);

  useEffect(() => {
    sendRequest(tourApis.get(query));
  }, [filter]);

  usePageTitle("Danh sách tours | Admin | Joya Travel");

  return (
    <>
      <AdminLayout>
        <StatusBar title="Quản lý hình ảnh">
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

        <div className={styles.tours}>
          <Filter setFilter={setFilter} filter={filter} />

          {data && data.data.length > 0 && (
            <table className="table table-bordered ">
              <thead className="bg-dark text-light">
                <tr>
                  <th rowSpan={2}>
                    <div>STT</div>
                  </th>
                  <th rowSpan={2}>
                    <div>Mã tour</div>
                  </th>
                  <th rowSpan={2}>
                    <div>Tên tour</div>
                  </th>
                  <th rowSpan={2}>
                    <div>Danh mục</div>
                  </th>
                  <th colSpan={3}>
                    <div className="text-center">Banner</div>
                  </th>
                  <th rowSpan={2}>
                    <div>lộ trình</div>
                  </th>
                </tr>

                <tr>
                  <th>
                    <div>slider home</div>
                  </th>

                  <th>
                    <div>slider tour eu</div>
                  </th>

                  <th>
                    <div>slider tour vn</div>
                  </th>
                </tr>
              </thead>

              <tbody className="bg-light">
                {data.data.map((item, index) => (
                  <tr key={item._id}>
                    <td>
                      <div className="text-center">
                        {(filter.page - 1) * PAGE_SIZE + index + 1}
                      </div>
                    </td>
                    <td>
                      <div>{item.code}</div>
                    </td>
                    <td>
                      <div
                        onClick={() => {
                          handleImage(item._id);
                        }}
                      >
                        {item.name}
                      </div>
                    </td>
                    <td>
                      <div>
                        {item.category.includes("europe")
                          ? "Tour châu Âu"
                          : item.category.includes("vi")
                          ? "Tour trong nước"
                          : item.category.length > 0
                          ? "Khác"
                          : "Chưa phân loại"}
                      </div>
                    </td>
                    <td>
                      <div>
                        {item.layout.includes("home-slider") && checkMark}
                      </div>
                    </td>
                    <td>
                      <div>{item.layout.includes("vn-tours") && checkMark}</div>
                    </td>
                    <td>
                      <div>{item.layout.includes("eu-tours") && checkMark}</div>
                    </td>
                    <td>
                      <div>{item.missingitineraryImages && checkMark}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {console.log("tourComponent", tour)}
          {data && data.data.length > 0 && (
            <div className="pt-3 ps-1">
              <Pagination
                bgGreen
                current={filter.page}
                pageSize={PAGE_SIZE}
                total={data.metadata.total_count}
                onChange={(current, pageSize) => {
                  setFilter((prev) => ({ ...prev, page: current }));
                }}
              />
            </div>
          )}
          {state && !loadingTour && (
            <FormEditImage
              data={state}
              ref={submitRef}
              handleSusses={handleSusses}
            />
          )}
          {data && data.data.length === 0 && <h5>Không có tour nào</h5>}

          {error && <ErrorMessage msg={error.message} />}
        </div>
      </AdminLayout>
    </>
  );
}

export default Tours;
