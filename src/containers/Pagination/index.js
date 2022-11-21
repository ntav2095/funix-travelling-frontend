import RcPagination from "rc-pagination";
import "./Pagination.css";

function Pagination({ bgGreen, ...props }) {
  let classes = "";
  if (bgGreen) {
    classes += "bg-active-green";
  }
  return (
    <div className="travel__pagination">
      <RcPagination {...props} prevIcon="<" nextIcon=">" className={classes} />
    </div>
  );
}

export default Pagination;
