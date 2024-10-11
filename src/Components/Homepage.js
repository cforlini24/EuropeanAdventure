import moment from "moment";

const Homepage = ({ posts }) => {



  return (
    <div className="text-center col overflow-auto">
      {posts ? posts.map((post, i) => {
        return (
          <div className="row mt-2" key={i}>
            <h3>{post.title}</h3>
            <p>{moment(post.date).format("dd MM/DD hh:mm")}</p>
            {
              post.photos.map((photo, j) => {
                return (
                  <img className="img-fluid img rounded m-2 " style={{ maxHeight: "100vh", width: "auto" }} src={photo} key={i + " : " + j} alt={post.title} />
                )
              })
            }
            <h5>{post.body}</h5>
          </div>
        )
      }) : "Nothing to see yet."}
    </div>
  );
};

export default Homepage;
