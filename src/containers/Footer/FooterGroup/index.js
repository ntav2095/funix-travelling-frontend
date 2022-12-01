import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function FooterGroup({ footerItem }) {
  const lang = useTranslation().i18n.language;

  return (
    <div className="mb-4">
      <h6>{footerItem.title[lang]}</h6>

      <ul>
        {footerItem.items.map((item, index) => (
          <li key={index}>
            {item.url ? (
              <a className="d-block mb-1 text-nowrap" href={item.url}>
                {item.icon} {item.label[lang]}
              </a>
            ) : item.path ? (
              <Link className="d-block mb-1 text-nowrap" to={item.path}>
                {item.icon} {item.label[lang]}
              </Link>
            ) : (
              <p className="mb-1 text-nowrap">
                {item.icon} {item.label[lang]}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FooterGroup;
