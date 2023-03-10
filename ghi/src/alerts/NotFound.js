import { Link } from "react-router-dom";
import { useGetTokenQuery } from "../store/pawsitiveApi";
import "./NotFound.css";

export default function NotFound() {
  const { data: token } = useGetTokenQuery();

  return (
    <div className="text-center p-5" id="not-found-page">
      <img
        src={require("../images/dog-pooping.png")}
        alt="/"
        id="dog-pooping-image"
      ></img>
      <h1>Oops! You seem to be lost.</h1>
      <p className="fs-2">Here are some helpful links:</p>
      {!token && (
        <Link to="/Login" className="p-3 fs-2 custom-hover">
          Login
        </Link>
      )}
      {token && (
        <>
          <Link to="/dogs" className="p-3 fs-2 custom-hover">
            Dogs
          </Link>
          <Link to="/adoptions" className="p-3 fs-2 custom-hover">
            Adoptions
          </Link>
        </>
      )}
    </div>
  );
}
