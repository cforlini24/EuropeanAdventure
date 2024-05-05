import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostLineup = (props) => {
  //props
  const { editSent, setEditSent } = props;

  //new instances
  const naviagte = useNavigate();
  const reader = new FileReader();

  //loading states
  const [aimLoaded, setAimLoaded] = useState(false);
  const [posLoaded, setPosLoaded] = useState(false);
  //input states
  const [aimPreview, setAimPreview] = useState();
  const [posPreview, setPosPreview] = useState();
  const [counterTerror, setCounterTerror] = useState();
  const [map, setMap] = useState();
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  //output state
  const [errorMessage, setErrorMessage] = useState();
  const [postLoading, setPostLoading] = useState(false)

  //load preview images
  function previewAim(e) {
    const file = e.target.files[0];
    if (file) {
      reader.onload = () => {
        setAimPreview(reader.result);
        setAimLoaded(true);
      };
      reader.readAsDataURL(file);
    }

  }
  function previewPos(e) {
    const file = e.target.files[0];
    if (file) {
      reader.onload = () => {
        setPosPreview(reader.result);
        setPosLoaded(true);
      };
      reader.readAsDataURL(file);
    }
  }

  //post function
  async function postLineup() {
    if (!title) {
      setErrorMessage("Please enter a title.");
    } else if (!posPreview) {
      setErrorMessage("Please provide a position image.");
    } else if (!aimPreview) {
      setErrorMessage("Please provide an aim image.");
    } else if (!map) {
      setErrorMessage("Please select a map.");
    } else if (!type) {
      setErrorMessage("Please select a type.");
    } else if (counterTerror == null) {
      setErrorMessage("Please select a side.")
    } else if (!desc) {
      setErrorMessage("Please provide a description.");
    } else {
      console.log("Posting...")
      setPostLoading(true);
      const response = await fetch("https://linislineups.onrender.com/", {
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
          type,
          title
        }),
      });
      if (response.status === 200) {
        setPostLoading(false);
        setEditSent(editSent + 1);
        naviagte(`/${map}`);
      } else {
        setErrorMessage("Error, please see console.");
      }
    }
  }

  return (
    <div data-aos="zoom-in">
      <div className="container-lg mx-auto m-5">
        <label for="title">Title</label>
        <input type="text" className="mb-1 form-control " id="title" placeholder="Landing location from throwing location - e.g. Top mid from spawn" onChange={(e) => setTitle(e.target.value)} />
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
          <img src={posPreview} className="img-thumbnail col-12 img-fluid mb-1" alt="Uploaded position preview" />
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
          <img src={aimPreview} className="img-thumbnail img-fluid mb-1 col-12" alt="Uploaded aim preview" />
        ) : (
          ""
        )}
        <div className="row mt-2 mb-2">
          <div className="col-4">
            <select
              onChange={(e) => setMap(e.target.value)}
              className="form-select "
            >
              <option selected>Select map...</option>
              <option value="Ancient">Ancient</option>
              <option value="Anubis">Anubis</option>
              <option value="Inferno">Inferno</option>
              <option value="Mirage">Mirage</option>
              <option value="Nuke">Nuke</option>
              <option value="Overpass">Overpass</option>
              <option value="Vertigo">Vertigo</option>
            </select>
          </div>
          <div className="col-4">
            <select
              onChange={(e) => setType(e.target.value)}
              className="form-select "
            >
              <option selected>Select type...</option>
              <option value="Flash">Flash</option>
              <option value="HE">High-Explosive</option>
              <option value="Molotov">Molotov</option>
              <option value="Smoke">Smoke</option>
            </select>
          </div>
          <div className="col-4">
            <select
              onChange={(e) => {
                if (e.target.value === "CT") {
                  setCounterTerror(true);
                } else if (e.target.value === "T") {
                  setCounterTerror(false);
                } else {
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
        <label for="desc">Description</label>
        <textarea
          placeholder={`Type of throw and any details \ne.g. Left click jump throw while standing still`}
          id="desc"
          onChange={(e) => setDesc(e.target.value)}
          className="form-control mb-2 col-12"
        ></textarea>
        {
          errorMessage ? <p className="error-message">{errorMessage}</p> : ""
        }
        {
          postLoading ? <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div> : <button onClick={postLineup} className="btn btn-primary">
            Submit
          </button>
        }

      </div>
    </div>
  );
};

export default PostLineup;
