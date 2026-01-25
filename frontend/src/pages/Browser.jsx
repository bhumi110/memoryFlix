import { useEffect, useState } from "react";
import EmptyBrowse from "./EmptyBrowser";
import BrowseContent from "../components/Browse/BrowseContent";
import { getVideos } from "../api/video.api";
import Navbar from "../components/Navbar/Navbar";
import VideoPreviewModal from "../components/Browse/VideoPreview";

const Browser = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // later replace this with API call
  useEffect(() => {
    const fetchVideos = async () => {
      const res = await getVideos();
      console.log("API RESPONSE:", res);
      console.log("API DATA:", res.data);
      setVideos(res.data);
    };

    fetchVideos();
  }, []);

  const handleDeleted = (id) => {
    console.log("REMOVING FROM STATE:", id);

    setVideos((prev) => prev.filter((v) => v._id !== id));
    setSelectedVideo(null);
  };

  return (
    <>
      <Navbar />
      {videos.length === 0 ? (
        <EmptyBrowse />
      ) : (
        <BrowseContent videos={videos} />
      )}

      <VideoPreviewModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
        onDeleted={handleDeleted}
      />

      {/* <BrowseContent videos={videos} /> */}
    </>
  );
};

export default Browser;
