import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Sidebar from "../components/SideBar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
// import { AuthContext } from "../context/AuthContextProvider";

function Playlist() {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);
    const { id } = useParams()
    const [myPlaylists, setMyPlaylists] = useState([])

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/playlist/${id}/all`, {
            headers:
            {
                Authorization: `${Cookies.get('authToken')}`
            }
        })
            .then((response) => {
                // console.log(response.data)
                setMyPlaylists(response.data.data)
            })
            .catch((error) => console.error(error.response.data)
            )
    }, [id]);

    const navigate = useNavigate()
    return (
        <>
            {isLoading ?
                <Loader /> :
                <div className="p-4 sm:ml-64  max-w-screen-xl ">
                    <Sidebar />
                    <span className="flex justify-between">
                        <h2 className="text-2xl text-white font-bold mb-2">My Playlists</h2>
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
                            Create Playlist
                        </button>
                    </span>
                    <hr className="border-gray-700 mb-4" />
                    <ul className="">

                        {myPlaylists.length == 0 ?
                            <span className="flex justify-center gap-2 my-8" >
                                <h2 className="text-2xl text-white font-bold mb-2">Start Creating Your Playlists ...</h2>
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
                                    Create Playlist
                                </button>
                            </span> :
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {myPlaylists.map((playlist, index) => (
                                    <div key={index} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                                        <img
                                            src={playlist.thumbnail}
                                            alt={playlist.name}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-4">
                                            <h3 className="text-xl font-semibold mb-2">{playlist.name}</h3>
                                            <p className="text-sm">{playlist.description}</p>
                                            <p className="text-sm">Videos: {playlist.playlistVideos.length}</p>
                                        </div>
                                        <div className="px-4 py-2">
                                            <a href="#"> View full playlist</a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }

                    </ul>
                    <hr className="border-gray-700 mb-4" />
                    {/* <Pagination totalNumberPages={totalNumberPages} currentPage={currentPage} currentLimit={currentLimit} onpageChange={handlePageChange} /> */}
                </div >
            }
        </>
    )
}
export default Playlist;