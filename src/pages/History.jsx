import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/SideBar";

function History() {
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);
    const [isLoading, setIsLoading] = useState(true)
    const [videoHistory, setVideoHistory] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`/api/users/${id}/history`).then((response) => {
            // console.log('video:', response.data.data);
            setVideoHistory(response.data.data)
            // console.log("owner", response.data.data[0].watchHistory[0].owner[0]);
        })
    }, [id])
    return (
        <>
            {isLoading ?
                <Loader /> :
                <div className="p-4 sm:ml-64  max-w-screen-xl ">
                    <Sidebar />
                    <h2 className="text-2xl text-white font-bold mb-2">Watch History</h2>
                    <hr className="border-gray-700 mb-4" />
                    <ul className="">
                        {videoHistory.length < 1 ? <span className="flex justify-center gap-2 my-8" >
                            <h2 className="text-2xl text-white font-bold mb-2">No watch history yet ...</h2>
                            <button
                                onClick={() => { navigate(`/`) }}
                                type="button"
                                className="flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            >
                                <svg
                                    className="w-5 h-5 me-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M16 10l-4-4m0 0L8 10m4-4v12"
                                    >
                                    </path>
                                </svg>
                                Start Exploring
                            </button>
                        </span> :
                            videoHistory.map((item, index) => (
                                <a key={index} href={`/videos/${item._id}`}>
                                    <li className="flex  p-4 bg-gray-800 text-white rounded-lg mb-4">
                                        <div className="flex-shrink-0 w-40 h-24">
                                            <img
                                                src={item.videoThumbnail}
                                                alt={item.title}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        </div>
                                        <div className="flex-grow pl-4">
                                            <div className="flex justify-between">
                                                <h3 className="text-lg font-semibold">{item.title}</h3>
                                                {/* <button className="text-gray-400 hover:text-white">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button> */}
                                            </div>
                                            <p className="text-gray-400 text-sm">{item.views} views • {item.owner[0].fullName}</p>
                                            <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                                        </div>
                                    </li>
                                </a>
                            ))}
                    </ul>
                </div>
            }
        </>
    )
}

export default History;