import { useEffect, useState } from "react";
import EmptyBrowse from "./EmptyBrowser";
import BrowseContent from "../components/Browse/BrowseContent";

const Browse = () => {
  const [videos, setVideos] = useState([]);

  // later replace this with API call
  useEffect(() => {
    // const res = await getUserVideos();
    // setVideos(res.data);

    setVideos([]); //empty = EmptyBrowse
  }, []);

  return (
    <>
      {videos.length === 0 ? (
        <EmptyBrowse />
      ) : (
        <BrowseContent videos={videos} />
      )}
    </>
  );
};

export default Browse;
