import RcPagination from "rc-pagination";
import "./Pagination.css";

function Pagination(props) {
  return (
    <div className="travel__pagination">
      <RcPagination {...props} prevIcon="<" nextIcon=">" />
    </div>
  );
}

export default Pagination;
