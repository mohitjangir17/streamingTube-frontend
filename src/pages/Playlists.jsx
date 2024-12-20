import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Sidebar from "../components/SideBar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
// import { AuthContext } from "../context/AuthContextProvider";

function Playlist() {
    const [isLoading, setIsLoading] = useState(true);
    const [errorBox, setErrorBox] = useState('')
    // useEffect(() => {
    //     setTimeout(() => {
    //         setIsLoading(false);
    //     }, 2000);
    // }, []);
    const { id } = useParams()
    const [myPlaylists, setMyPlaylists] = useState([])
    const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);
    const [triggerFetch, setTriggerFetch] = useState(false);
    const [newPlaylist, setNewPlaylist] = useState({
        name: '',
        description: ''
    })
    const [isCreatePlaylistViewVisible, setIsCreatePlaylistViewVisible] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/playlist/${id}/all`, {
            headers:
            {
                Authorization: `${Cookies.get('authToken')}`
            }
        })
            .then((response) => {
                // console.log(response.data)
                setMyPlaylists(response.data.data)
                setIsLoading(false)
            })
            .catch((error) => console.error(error.response.data)
            )
    }, [id, triggerFetch]);

    const createPlaylist = (e) => {
        e.preventDefault()
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/playlist/new-playlist`, newPlaylist, {
            headers:
            {
                Authorization: `${Cookies.get('authToken')}`
            }
        })
            .then(() => {
                // console.log(response.data)
                setIsCreatePlaylistViewVisible(false)
                setNewPlaylist({
                    name: '',
                    description: ''
                })
                setTriggerFetch((prev) => !prev);
            })
            .catch((error) => {
                setErrorBox(error.response.data.message)
                setIsCreatePlaylistViewVisible(false)
                // console.error(error)
            }
            )
    }

    const handleChange = (e) => {
        setNewPlaylist({ ...newPlaylist, [e.target.name]: e.target.value });
    }

    const toggleDropdown = (id) => {
        setActiveDropdownIndex(activeDropdownIndex === id ? null : id);
    };

    const deletePlaylist = (playlistid) => {
        axios.delete(`${import.meta.env.VITE_API_BASE_URL}/playlist/${playlistid}/delete-playlist`, {
            headers:
            {
                Authorization: `${Cookies.get('authToken')}`
            }
        }, {})
            .then(() => {
                setTriggerFetch((prev) => !prev);
            })
            .catch((error) => {
                console.log(error.response.data);

            })
    }
    const navigate = useNavigate()
    return (
        <>
            {!errorBox ? (
                ""
            ) : (
                <div
                    role="alert"
                    className="mb-4 absolute flex w-full p-3 text-sm text-white bg-orange-600 rounded-md"
                >
                    {errorBox}
                    <button
                        className="flex items-center justify-center transition-all w-8 h-8 rounded-md text-white hover:bg-white/10 active:bg-white/10 absolute top-1.5 right-1.5"
                        type="button"
                        onClick={() => {
                            setErrorBox("");
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="h-5 w-5"
                        // stroke-width="2"
                        >
                            <path
                                // stroke-linecap="round"
                                // stroke-linejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        </svg>
                    </button>
                </div>
            )}
            {isLoading ?
                <Loader /> :
                <div className="p-4 sm:ml-64  max-w-screen-xl ">
                    <Sidebar />
                    <span className="flex justify-between">
                        <h2 className="text-2xl text-white font-bold mb-2">My Playlists</h2>
                        <button
                            onClick={() => setIsCreatePlaylistViewVisible(!isCreatePlaylistViewVisible)}
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
                            <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {myPlaylists.map((playlist, index) => (
                                    <div key={index} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                                        <img
                                            src={playlist.thumbnail || `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLxGmXcf9_fmYooOzU_3IQtGdZ4R62xvDP8w&s`}
                                            alt={playlist.name}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-4">
                                            <h3 className="text-xl font-semibold mb-2">{playlist.name}</h3>
                                            <p className="text-sm">{playlist.description}</p>
                                            <p className="text-sm">Videos: {playlist.playlistVideos.length}</p>
                                        </div>


                                        <div className="w-full justify-between items-center inline-flex">
                                            <div className="px-4 py-2">
                                                <a href={`/${id}/my-playlists/${playlist._id}`}> View full playlist</a>
                                            </div>
                                            <div className="w-6 h-6 relative z-9">
                                                <div className="w-full h-fit flex">
                                                    <div className="relative w-full z-10">
                                                        {/* <div className=" absolute left-0 top-0 py-2.5 px-4 text-gray-300"></div> */}
                                                        <button id="dropdown-button" data-target="dropdown-1"
                                                            className="w-full justify-center dropdown-toggle flex-shrink-0 z-10 flex items-center text-base font-medium text-center text-gray-900 bg-transparent  absolute right-0 top-0"
                                                            type="button"
                                                            onClick={() => toggleDropdown(playlist._id)}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                                viewBox="0 0 24 24" fill="none">
                                                                <path
                                                                    d="M12.0161 16.9893V17.0393M12.0161 11.9756V12.0256M12.0161 6.96191V7.01191"
                                                                    stroke="white" strokeWidth="3.5"
                                                                    strokeLinecap="round" />
                                                            </svg>
                                                        </button>

                                                        {activeDropdownIndex === playlist._id && (
                                                            <div id="dropdown-1"
                                                                className="absolute bottom-2 right-2 right-0 z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 open overflow-visible">
                                                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                                                    aria-labelledby="dropdown-button">
                                                                    <li>
                                                                        <span
                                                                            // onClick={() => { toggleIsVisibleUpdateIndividualComment(commentItem._id), setActiveDropdownIndex(null) }}
                                                                            className="block hover:cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</span>
                                                                    </li>
                                                                    <li>
                                                                        <span
                                                                            onClick={() => deletePlaylist(playlist._id)}
                                                                            className="block hover:cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        )}

                                                    </div>
                                                </div>
                                            </div>
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

            {!isCreatePlaylistViewVisible ?
                '' :
                <div id="popup-modal" tabIndex="-1" className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden ">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button onClick={() => setIsCreatePlaylistViewVisible(false)} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-4 md:p-5 text-center">
                                <form onSubmit={createPlaylist} action="#" method="post">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="title">Title</label>
                                    <input onChange={handleChange} className="px-2 py-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="name" name="name" type="text" value={newPlaylist.name} />
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="description">Description</label>
                                    <input onChange={handleChange} className=" px-2 py-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="description" name="description" type="text" value={newPlaylist.description} />
                                    <button data-modal-hide="popup-modal" type="submit" className=" mt-3 text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                        Create Playlist
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
export default Playlist;