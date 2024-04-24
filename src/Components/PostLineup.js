import { useState } from "react";
import {  useNavigate } from "react-router-dom";

const PostLineup = (props) => {
  const { fetchLineups } = props;
  const naviagte = useNavigate();

  const reader = new FileReader();
  const [aimLoaded, setAimLoaded] = useState(false);
  const [posLoaded, setPosLoaded] = useState(false);
  const [aimPreview, setAimPreview] = useState();
  const [posPreview, setPosPreview] = useState();
  const [counterTerror, setCounterTerror] = useState(true);
  const [map, setMap] = useState("Mirage");
  const [desc, setDesc] = useState("");

  function previewAim(e) {
    const file = e.target.files[0];
    reader.onload = () => {
      setAimPreview(reader.result);
      setAimLoaded(true);
    };

    reader.readAsDataURL(file);
  }
  function previewPos(e) {
    const file = e.target.files[0];
    reader.onload = () => {
      setPosPreview(reader.result);
      setPosLoaded(true);
    };

    reader.readAsDataURL(file);
  }

  async function postLineup() {
    console.log(
      JSON.stringify({
        map,
        ct: counterTerror,
        aimImage64: aimPreview,
        positionImage64: posPreview,
        desc,
      })
    );
    const response = await fetch("http://localhost:3001/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        map,
        ct: counterTerror,
        aimImage64: aimPreview,
        posImage64: posPreview,
        desc,
      }),
    });
    fetchLineups();
    naviagte("/");
  }

  return (
    <div>
      <div className="container mx-auto m-5 w-50">
        <label for="standSpot" className="mb-1 col-12">
          Position to stand
        </label>
        <input
          type="file"
          onChange={(e) => previewPos(e)}
          className="form-control col-12"
          id="standSpot"
          name="standSpot"
        />
        {posLoaded ? (
          <img src={posPreview} className="img-thumbnail col-12 img-fluid mb-1" alt="Uploaded position image preview"/>
        ) : (
          ""
        )}
        <label for="aimSpot" className="mb-1 col-12">
          Position to aim
        </label>
        <input
          type="file"
          onChange={(e) => previewAim(e)}
          className="form-control col-12"
          name="aimSpot"
          id="aimSpot"
        />
        {aimLoaded ? (
          <img src={aimPreview} className="img-thumbnail img-fluid mb-1 col-12" alt="Uploaded aim image preview"/>
        ) : (
          ""
        )}
        <div className="row mt-2 mb-2">
          <div className="col-6">
            <select
              onChange={(e) => setMap(e.target.value)}
              className="form-select "
            >
              <option selected>Select map...</option>
              <option value="Mirage">Mirage</option>
              <option value="Inferno">Inferno</option>
              <option value="Nuke">Nuke</option>
              <option value="Vertigo">Vertigo</option>
              <option value="Ancient">Ancient</option>
              <option value="Overpass">Overpass</option>
              <option value="Anubis">Anubis</option>
            </select>
          </div>
          <div className="col-6">
            <select
              onChange={(e) => {
                if(e.target.value == "CT") {
                  setCounterTerror(true);
                }else if(e.target.value == "T") {
                  setCounterTerror(false);
                }else {
                  setCounterTerror();
                }
              }}
              className="form-select"
            >
              <option selected>Select side...</option>
              <option value="CT">Counter-Terrorist</option>
              <option value="T">Terrorist</option>
            </select>
          </div>
        </div>
        <textarea
          placeholder="Lineup description..."
          onChange={(e) => setDesc(e.target.value)}
          className="form-control mb-2 col-12"
        ></textarea>
        <button onClick={postLineup} className="btn btn-primary">
          Submit
        </button>
      </div>
    </div>
  );
};

export default PostLineup;
