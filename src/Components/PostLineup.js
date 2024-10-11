import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostLineup = (props) => {

  //new instances
  const naviagte = useNavigate();
  const reader = new FileReader();

  //loading states
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgPreview, setImgPreview] = useState()
  //input states
  const [title, setTitle] = useState();
  const [message, setMessage] = useState();
  const [photos, setPhotos] = useState([]);
  //output state
  const [errorMessage, setErrorMessage] = useState();
  const [postLoading, setPostLoading] = useState(false)
  const [photoTitles, setPhotoTitles] = useState([]);

  //load preview images
  function previewImg(e) {
    const file = e.target.files[0];
    if (file) {
      reader.onload = () => {
        setImgPreview(reader.result);
        setImgLoaded(true);
        setPhotos([...photos, reader.result]);
        setPhotoTitles([...photoTitles, file.name])
      };
      reader.readAsDataURL(file);
    }

  }


  //post function
  async function postLineup() {
    console.log("Posting...")
    setPostLoading(true);
    const response = await fetch("https://europeanadventure.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        photos,
        message
      }),
    });
    if (response.status === 200) {
      setPostLoading(false);
      naviagte(`/`);
    } else {
      setErrorMessage("Error, please see console.");
    }
  }


  return (
    <div data-aos="zoom-in">
      <div className="container-lg mx-auto m-5">
        <label for="title">Title</label>
        <input type="text" className="mb-1 form-control " id="title" placeholder="" onChange={(e) => setTitle(e.target.value)} />
        <label for="img" className="mb-1 col-12">
          Photos ({photos.length})
        </label>
        <input
          type="file"
          accept=".jpg, .png, .gif, .webp"
          onChange={(e) => previewImg(e)}
          className="form-control col-12"
          id="img"
          name="img"
        />
        {imgLoaded ? (
          <img src={imgPreview} className="img-thumbnail img img-fluid mb-1" alt="Uploaded position preview" />
        ) : (
          ""
        )}
        {
          photoTitles?.map((title) => {
            return (
              <p>{title}</p>
            )
          })
        }
        <label for="desc">Message</label>
        <textarea
          placeholder={``}
          id="desc"
          onChange={(e) => setMessage(e.target.value)}
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
