import Layout from "../../layout/Default";
import classes from "./NotFound.module.css";

function NotFound() {
  return (
    <Layout>
      <div className={classes.notFound}>
        <h1>Page Not Found</h1>
      </div>
    </Layout>
  );
}

export default NotFound;
