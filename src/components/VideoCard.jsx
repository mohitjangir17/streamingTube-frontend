/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";


const VideoCard = ({ video }) => {
  return (
    <div className="w-full max-w-sm bg-white border  rounded-lg shadow dark:bg-gray-800 ">
      <Link to={`/videos/${video._id}`}>
        <img
          className="pb-8 rounded-t-lg"
          src={video.videoThumbnail}
          alt={video.title}
        />
        <div className="px-5 pb-5">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {video.title || `Title`}
          </h5>
          <div className="flex items-center justify-between">
            <div className="text-l  text-gray-900 dark:text-white">
              {!video.views ? "No views yet" : `${video.views} views `}
            </div>
          </div>
          <div className="text-l  text-gray-900 dark:text-white">
            {`On ${new Date(video.createdAt).toLocaleDateString()} `}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;