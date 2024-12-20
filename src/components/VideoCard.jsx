/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";


const VideoCard = ({ video }) => {
  return (
    <div className="w-full max-w-sm bg-white border  rounded-lg shadow dark:bg-gray-800 ">
      <Link to={`/videos/${video._id}`}>
        <div className="relative">
          <img
            className="pb-4 rounded-t-lg"
            src={video.videoThumbnail}
            alt={video.title}
          />
          <span className="absolute bottom-5 right-2 font-bold bg-black text-white text-xs px-2 py-1 rounded">
            {(Math.floor(video.duration / 60)).toFixed()} :{Math.floor(video.duration % 60) < 10 ?
              `0${Math.floor(video.duration % 60)}` :
              `${Math.floor(video.duration % 60)}`}
          </span>
        </div>
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
