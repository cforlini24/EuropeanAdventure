import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md bg-dark-subtle p-2 sticky-top z-1  " data-bs-theme="dark">
      <div className="container-fluid">
        <Link to={"/"} className="navbar-brand h1 mb-0 ">
          Chase's Adventure
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
