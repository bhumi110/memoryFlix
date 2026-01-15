import { useEffect, useState } from "react";
import { getAllSeries } from "../api/series.api";
import Navbar from "../components/Navbar/Navbar";

const Browser = () => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    getAllSeries().then(res => setSeries(res.data));
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ padding: "80px 40px", color: "#fff" }}>
        <h2>Series</h2>

        <div style={{ display: "flex", gap: 20 }}>
          {series.map(s => (
            <div key={s._id}>
              <img src={s.coverImage} width="200" />
              <p>{s.title}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Browser;
