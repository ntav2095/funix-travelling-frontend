import { Link } from "react-router-dom";
import "./AdminLayout.css";

function AdminLayout({ children }) {
  return (
    <>
      <header className="adminLayout__header">
        <h1>Admin page</h1>
      </header>

      <main className="adminLayout__main">
        <div className="adminLayout__sidebar">
          <ul>
            <li>
              <Link to="/admin">Dashboard</Link>
            </li>
            <li>
              <Link to="/admin/new-tour">New Tour</Link>
            </li>
          </ul>
        </div>

        <div className="adminLayout__content">{children}</div>
      </main>
    </>
  );
}

export default AdminLayout;
