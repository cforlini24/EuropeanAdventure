import moment from "moment";
import { Link } from "react-router-dom";

const Homepage = ({ posts }) => {



  return (
    <div className="text-center col">
      {posts ? posts.map((post, i) => {
        return (
          <div className="row" key={i}>
            <h3>{post.title}</h3>
            <p>{moment(post.date).format("dd MM/DD hh:mm")}</p>
            {
              post.photos.map((photo, j) => {
                return (
                  <img className="img-fluid img rounded m-2" src={photo} key={i + " : " + j} />
                )
              })
            }
            <p>{post.body}</p>
          </div>
        )
      }) : "Nothing to see yet."}
    </div>
  );
};

export default Homepage;
