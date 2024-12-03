import { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import axios from "axios";
import Loader from "../components/Loader";
import Sidebar from '../components/SideBar'

function Home() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/videos/`)
      .then((res) => {
        const data = res.data.data.docs;
        setVideos(data);
        setIsLoading(false);
      })
      .catch((error) => console.error(error))
  }, []);

  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64">{isLoading ? <Loader /> :
        <div>
          <div className="hidden lg:flex items-center flex-grow max-w-xl mx-4">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-900 text-white py-2 px-4 rounded-l-full focus:outline-none focus:ring-2 focus:ring-gray-700"
            />
            <button className="bg-gray-700 px-4 py-2 rounded-r-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"
                />
              </svg>
            </button>
          </div>
          <div className="flex justify-center">
            {videos.length == 0 ? <h1 className="m-4 text-3xl">No videos uploaded yet</h1> :
              <div className="mx-6 max-w-screen-xl my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 content-center ">
                {videos.map((video) => (
                  <VideoCard key={video._id} video={video} />
                ))}
              </div>
            }
          </div>
        </div>}
      </div>
    </>
  );
}

export default Home;
