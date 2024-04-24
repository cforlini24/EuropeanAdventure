import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md bg-secondary p-2">
      <div className="container-fluid">
        <Link to={"/"} className="navbar-brand">
          Lini's Lineups
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ">
          <li className="nav-item">
            <Link to={"/upload"} className="nav-link">
              Upload
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/nuke"} className="nav-link">
              Nuke
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/anubis"} className="nav-link">
              Anubis
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/mirage"} className="nav-link">
              Mirage
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/ancient"} className="nav-link">
              Ancient
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/inferno"} className="nav-link">
              Inferno
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/overpass"} className="nav-link">
              Overpass
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/vertigo"} className="nav-link">
              Vertigo
            </Link>
          </li>
        </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
