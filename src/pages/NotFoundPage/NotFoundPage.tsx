import { Link } from "react-router-dom";
import "./NotFoundPage.css";

export default function NotFoundPage() {
  return (
    <main className="not-found">
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/" className="btn btn-primary">
        Back to Landing
      </Link>
    </main>
  );
}
