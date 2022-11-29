
import ArticleList from "./articleList/articleList";
import './TravelHandbook.css'
import usePageTitle from "../../hooks/usePageTitle";

function TravelHandbook() {
  usePageTitle(`Cẩm nang du lịch || Go Travel`);

  return (
    <>
      <div className="containerArticle">
        <ArticleList />
      </div>
    </>
  );
}

export default TravelHandbook;
