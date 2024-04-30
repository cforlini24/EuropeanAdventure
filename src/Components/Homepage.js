import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="row m-5 mt-3">
      <div className="col-10">
        <h2>Maps</h2>
        <div className="row row-cols-4 g-3">
          <div className="col "  data-aos="fade-up"  data-bs-duration="800" >
            <Link to={"/nuke"}>
              <div className="card" >
                <img
                  className="card-img"
                  src="https://assets.csnades.gg/nuke_poster_6564251e83.webp"
                  alt="Nuke poster"
                />
                <div className="card-img-overlay text-center">
                  <h1 className="card-title">Nuke</h1>
                </div>
              </div>
            </Link>
          </div>
          <div className="col "  data-aos="fade-up"  data-bs-duration="800" data-aos-delay="50">
            <Link to={"/anubis"}>
              <div className="card">
                <img
                  className="card-img"
                  src="https://assets.csnades.gg/anubis_poster_70252beb41.webp"
                  alt="Anubis poster"
                />
                <div className="card-img-overlay text-center">
                  <h1 className="card-title">Anubis</h1>
                </div>
              </div>
            </Link>
          </div>
          <div className="col "  data-aos="fade-up"  data-bs-duration="800" data-aos-delay="100">
            <Link to={"/mirage"}>
              <div className="card">
                <img
                  className="card-img"
                  src="https://assets.csnades.gg/mirage_poster_a0e8dff716.webp"
                  alt="Mirage poster"
                />
                <div className="card-img-overlay text-center">
                  <h1 className="card-title">Mirage</h1>
                </div>
              </div>
            </Link>
          </div>
          <div className="col "  data-aos="fade-up"  data-bs-duration="800" data-aos-delay="150">
            <Link to={"/ancient"}>
              <div className="card">
                <img
                  className="card-img"
                  src="https://assets.csnades.gg/ancient_poster_6d7fc66b2a.webp"
                  alt="Ancient poster"
                />
                <div className="card-img-overlay text-center">
                  <h1 className="card-title">Ancient</h1>
                </div>
              </div>
            </Link>
          </div>
          <div className="col "  data-aos="fade-up"  data-bs-duration="800" data-aos-delay="200">
            <Link to={"/inferno"}>
              <div className="card">
                <img
                  className="card-img"
                  src="https://assets.csnades.gg/inferno_poster_a627839fc2.webp"
                  alt="Inferno poster"
                />
                <div className="card-img-overlay text-center">
                  <h1 className="card-title">Inferno</h1>
                </div>
              </div>
            </Link>
          </div>
          <div className="col "  data-aos="fade-up"  data-bs-duration="800" data-aos-delay="250">
            <Link to={"/overpass"}>
              <div className="card">
                <img
                  className="card-img"
                  src="https://assets.csnades.gg/overpass_poster_99828cd53e.webp"
                  alt="Overpass poster"
                />
                <div className="card-img-overlay text-center">
                  <h1 className="card-title">Overpass</h1>
                </div>
              </div>
            </Link>
          </div>
          <div className="col "  data-aos="fade-up"  data-bs-duration="800" data-aos-delay="300">
            <Link to={"/vertigo"}>
              <div className="card">
                <img
                  className="card-img"
                  src="https://assets.csnades.gg/vertigo_poster_63b445c1dd.webp"
                  alt="Vertigo poster"
                />
                <div className="card-img-overlay text-center">
                  <h1 className="card-title">Vertigo</h1>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="col-2" data-aos="fade-left">
        <h2>About</h2>
        <p>
          Welcome to Lini's Lineups, the best place to learn Counter-Strike 2
          grenade lineups.
        </p>
        <p>
          Find guides and all the best nades: smokes, molotovs, flashbangs, and
          HE grenades.
        </p>
        <Link to={"/upload"}>
          <button className="btn btn-success p-3 ">
            <i className="bi bi-file-arrow-up mx-2"></i>
            Add your own lineup
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
