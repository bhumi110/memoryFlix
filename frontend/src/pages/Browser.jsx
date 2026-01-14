import Navbar from "../components/Navbar/Navbar";
import Row from "../components/Row/Row";

const Browse = () => {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />

      <div className="pt-20">
        <Row title="All Videos" />
      </div>
    </div>
  );
};

export default Browse;
