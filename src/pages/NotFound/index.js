import Layout from "../../layout/Default";
import usePageTitle from "../../hooks/usePageTitle";
import classes from "./NotFound.module.css";

function NotFound() {
  usePageTitle("Trang không tồn tại || Go Travel");
  return (
    <Layout>
      <div className={classes.notFound}>
        <h1>Page Not Found</h1>
      </div>
    </Layout>
  );
}

export default NotFound;
