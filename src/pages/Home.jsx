import { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import axios from "axios";
import Loader from "../components/Loader";
import Sidebar from '../components/SideBar'

function Home() {
  useEffect(() => {
    // Simulate a network request or some async operation
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the timeout as needed
  }, []);

  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/videos/`).then((res) => {
      const data = res.data.data.docs;
      setVideos(data);
    }).catch((error) => console.error(error)
    )
  }, []);
  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">{isLoading ? <Loader /> :
        <div className="flex justify-center">
          {videos == '' ? <h1 className="m-4 text-3xl">No videos uploaded yet</h1> :
            <div className="mx-6 max-w-screen-xl my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 content-center ">
              {videos.map((video) => (
                <VideoCard key={video._id} video={video} />
              ))}
            </div>}
        </div>} </div>
    </>
  );
}

export default Home;
