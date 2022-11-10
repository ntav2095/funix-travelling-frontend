import { hotTours } from "../../mock/sidebar.mock";
import ContactTable from "../ContactTable";
import ProductItem from "../../components/ProductItem";
import styles from "./Sidebar.module.css";

function Sidebar({ primary }) {
  return (
    <div className={styles.sidebar}>
      <ContactTable primary={primary} />

      <aside className={styles.tours}>
        <h2>TOUR HOT</h2>

        <ul>
          {hotTours.map((item) => (
            <li key={item.id}>
              <ProductItem
                to={`/danh-sach-tour/${item.id}`}
                image={item.image}
                text={item.title}
                oldPrice={item.oldPrice}
                curPrice={item.curPrice}
              />
            </li>
          ))}
        </ul>
      </aside>

      <aside className={styles.stories}>
        <h2>BÀI VIẾT MỚI</h2>

        <ul>
          {hotTours.map((item) => (
            <li key={item.id}>
              <ProductItem
                to={`/cam-nang-du-lich/${item.id}`}
                image={item.image}
                text={item.title}
              />
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

export default Sidebar;
