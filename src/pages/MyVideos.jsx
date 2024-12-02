import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import Sidebar from "../components/SideBar";
import { Pagination } from "../components/Pagination";

function MyVideos() {
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);
    const [isLoading, setIsLoading] = useState(true)
    const [myVideos, setMyVideos] = useState([])

    // Pagination
    const [totalNumberPages, setTotalNumberPages] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [currentLimit] = useState(10)
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/videos/${id}/my-videos?page=${currentPage || 1}&limit=${currentLimit || 10}`, {
            headers: {
                Authorization: `${Cookies.get('authToken')}`,
            }
        })
            .then((response) => {
                setMyVideos(response.data.data.docs),
                    setTotalNumberPages(response.data.data.totalPages)
                // console.log(response.data.data);
            })
            .catch((error) => console.log(error)
            )
    }, [id, currentLimit, currentPage])

    const deleteVideo = (videoId) => {
        // e.preventDefault();
        axios.delete(`${import.meta.env.VITE_API_BASE_URL}/videos/${videoId}/delete-video`, {}, {
            headers:
            {
                Authorization: `${Cookies.get('authToken')}`
            }
        })
            .then((response) => {
                if (response.data) {
                    // console.log("deleted")
                    navigate(0)
                }
            }
            )
    }

    return (
        <>
            {isLoading ?
                <Loader /> :
                <div className="p-4 sm:ml-64  max-w-screen-xl ">
                    <Sidebar />
                    <span className="flex justify-between">
                        <h2 className="text-2xl text-white font-bold mb-2">My Videos</h2>
                        <button
                            onClick={() => { navigate(`/${id}/publish-video`) }}
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
                            Publish Video
                        </button>
                    </span>
                    <hr className="border-gray-700 mb-4" />
                    <ul className="">
                        {myVideos.length < 1 ?
                            <span className="flex justify-center gap-2 my-8" >
                                <h2 className="text-2xl text-white font-bold mb-2">Start Uploading</h2>
                                <button
                                    onClick={() => { navigate(`/${id}/publish-video`) }}
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
                                    Publish Video
                                </button>
                            </span> :
                            myVideos.map((item, index) => (
                                <li
                                    key={index}
                                    className="flex p-4 bg-gray-800 text-white rounded-lg mb-4"
                                    onClick={() => window.location.href = `/videos/${item._id}`} // Manually handle the link navigation
                                >
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
                                            <div
                                                onClick={(e) => {
                                                    e.stopPropagation();  // Prevent routing on delete button click
                                                    deleteVideo(item._id);
                                                }}
                                            >
                                                <button className="text-gray-400 hover:text-white">
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
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-gray-400 text-sm">{item.views} views</p>
                                        <p className="text-gray-400 text-sm mt-1">{item.videoDescription}</p>
                                        <p className="text-gray-400 text-sm mt-1">Uploaded on: {new Date(item.createdAt).toLocaleString()}</p>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                    <hr className="border-gray-700 mb-4" />
                    <Pagination totalNumberPages={totalNumberPages} currentPage={currentPage} currentLimit={currentLimit} onpageChange={handlePageChange} />
                </div >
            }
        </>
    )
}

export default MyVideos;