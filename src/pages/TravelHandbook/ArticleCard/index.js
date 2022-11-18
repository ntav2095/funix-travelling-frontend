import { Link } from "react-router-dom";
import styles from "./ArticleCard.module.css";

function ArticleCard({ article }) {
  return (
    <div className={styles.card}>
      <Link to={`/cam-nang-du-lich/${article._id}`}>
        <div className={styles.image}>
          <img src={article.thumb} alt={article.title} />
        </div>
        <div className={styles.textBox}>
          <h2>{article.title}</h2>
          <p>{article.lead.slice(0, 100)}...</p>
        </div>
      </Link>
    </div>
  );
}

export default ArticleCard;
