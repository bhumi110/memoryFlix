import { useEffect, useState } from "react";
import EmptyBrowse from "./EmptyBrowser";
import BrowseContent from "../components/Browse/BrowseContent";
import {getVideos} from "../api/video.api";

const Browser = () => {
  const [videos, setVideos] = useState([]);

  // later replace this with API call
  useEffect(() => {
  const fetchVideos = async () => {
    const res = await getVideos();
    setVideos(res.data);
  };

  fetchVideos();
}, []);


  return (
    <>
      {videos.length === 0 ? (
        <EmptyBrowse />
      ) : (
        <BrowseContent videos={videos} />
      )}

      {/* <BrowseContent videos={videos} /> */}
    </>
  );
};

export default Browser;
