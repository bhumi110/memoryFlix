import { useNavigate } from "react-router-dom";

const SeriesDetails = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-vh-100 text-white"
      style={{
        background:
          "linear-gradient(to top, rgba(0,0,0,.9), rgba(0,0,0,.3)), url(https://picsum.photos/1600/900)",
        backgroundSize: "cover",
      }}
    >
      <div className="container py-5">
        <h1 className="fw-bold">Summer Adventures 2024</h1>
        <p className="text-secondary col-md-6">
          A private collection of unforgettable memories captured as episodes.
        </p>

        <div className="mt-4">
          <button
            className="btn-netflix me-3"
            onClick={() => navigate("/watch/1")}
          >
            ▶ Play
          </button>
          <button className="btn-outline-netflix">View Episodes</button>
        </div>

        <hr className="my-5" />

        <h4>Episodes</h4>

        {[1, 2, 3].map((ep) => (
          <div
            key={ep}
            className="d-flex align-items-center mb-3 netflix-card p-2"
          >
            <img
              src="https://picsum.photos/200/120"
              alt=""
              style={{ width: 200 }}
            />
            <div className="ms-3">
              <h6>Episode {ep}</h6>
              <p className="text-secondary small mb-0">
                Personal memory episode description.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeriesDetails;
