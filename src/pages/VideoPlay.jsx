import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Loader from "../components/Loader";
import { Pagination } from "../components/Pagination";
import { AuthContext } from "../context/AuthContextProvider";
// import Sidebar from "../components/SideBar";

function VideoPlay() {
    useEffect(() => {
        // Simulate a network request or some async operation
        setTimeout(() => {
            setIsLoading(false);
        }, 2000); // Adjust the timeout as needed
    }, []);

    const { user } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams()
    const [video, setVideo] = useState([])
    const [userComment, setUserComment] = useState([])
    const [newComment, setNewComment] = useState('')
    const [updateComment, setUpdateComment] = useState('')
    const [userSubs, setUserSubs] = useState({ subscribers: '', subscribedTo: '', isSubscribed: '' })
    const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);
    const [updateIndividualComment, setUpdateIndividualComment] = useState(null)

    // Pagination
    const [totalNumberPages, setTotalNumberPages] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [currentLimit] = useState(10)
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/videos/${id}`)
            .then((response) => {
                setVideo(response.data.data.docs[0])
                // setIsLoading(false)
                // console.log(response.data)
            })
            .catch((error) => { console.log(error) })
    }, [id])

    useEffect(() => {
        axios.patch(`${import.meta.env.VITE_API_BASE_URL}/videos/${user._id}/${id}/addVideoToUserHistory`,
            { _id: id },
            {
                headers: {
                    Authorization: `${Cookies.get('authToken')}`
                }

            })
            .then((response) => console.log(response)
            )
            .catch((error) => console.error(error)
            )
    }, [user._id, id])

    useEffect(() => {
        let timer = setTimeout(() => {
            axios.patch(`${import.meta.env.VITE_API_BASE_URL}/videos/${id}/countIncment`, {}, {
                headers: {
                    Authorization: `${Cookies.get('authToken')}`
                }
            })
                .then(response => {
                    console.log('View count updated:', response.data);
                })
                .catch(error => { console.log(error); });
        }, 15000);

        return () => {
            clearTimeout(timer)
        }
    }, [])


    useEffect(() => {
        if (video?.owner?.[0]?.username) {  // Safely checking if the owner and username exist
            axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/c/${video.owner[0].username}`, {
                headers: { Authorization: `${Cookies.get('authToken')}` }
            })
                .then((response) => {
                    // console.log(response.data);
                    setUserSubs({
                        subscribedTo: response.data.data.channelsSubscribedToCount,
                        subscribers: response.data.data.subscribersCount,
                        isSubscribed: response.data.data.isSubscribed
                    });
                })
                .catch((error) => {
                    console.error("Error fetching user subscription data:", error);
                });
        }
    }, [video]);

    useEffect(() => {
        if (video._id) { getVideoComments() }
    }, [video._id, currentLimit, currentPage])

    const subscribeChannel = (channelId) => {
        // console.log(channelId);
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/subscription/${channelId}/subscribe`, {}, {
            headers:
            {
                Authorization: `${Cookies.get('authToken')}`
            }
        })
            .then((response) => {
                if (response.data.data.isChannelSubscribed) {
                    setUserSubs(prevState => ({
                        ...prevState, isSubscribed: !userSubs.isSubscribed,
                    }))
                }
            })
    }

    const deleteIndividualComment = (commentId) => {
        axios.delete(`${import.meta.env.VITE_API_BASE_URL}/comment/${video._id}/delete-comment/${commentId}`, {}, {
            headers:
            {
                Authorization: `${Cookies.get('authToken')}`
            }
        })
            .then((res) => {
                // console.log((res.data))
                if (res.data.success) {
                    getVideoComments()
                }
            }
            )
            .catch((error) => console.log(error)
            )
    }

    const getVideoComments = () => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/comment/${video._id}/get-comments?page=${currentPage || 1}&limit=${currentLimit || 10}`)
            .then((res) => {
                // console.log(res.data.data)
                setUserComment(res.data.data.docs)
                setTotalNumberPages(res.data.data.totalPages)
            }
            )
            .catch((error) => console.log(error)
            )
    }

    const commentOnVideo = (videoId) => {
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/comment/${videoId}/add-comment`, { comment: newComment }, {
            headers:
            {
                Authorization: `${Cookies.get('authToken')}`
            }
        })
            .then((response) => {
                // console.log(response.data.data) 
                if (response.data.success) {
                    setNewComment('')
                    getVideoComments()
                }
            })
            .catch((error) => console.log(error)
            )
    }

    const commentUpdate = (videoId, commentId) => {
        // console.log("video:", videoId);
        // console.log("comment:", commentId);
        axios.patch(`${import.meta.env.VITE_API_BASE_URL}/comment/${videoId}/update-comment/${commentId}`,
            { comment: updateComment }, {
            headers:
            {
                Authorization: `${Cookies.get('authToken')}`
            }
        })
            .then((res) => {
                if (res.data.success) {
                    getVideoComments()
                    setNewComment('')
                    setUpdateIndividualComment(null)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const toggleDropdown = (id) => {
        setActiveDropdownIndex(activeDropdownIndex === id ? null : id);
    };

    const toggleIsVisibleUpdateIndividualComment = (id) => {
        setUpdateIndividualComment(updateIndividualComment === id ? null : id);
    };

    if (isLoading) {
        return <Loader />
    }

    return (
        <main>
            {/* <Sidebar /> */}
            <section className="flex justify-center   ">
                <div className="p-4 w-full max-w-full lg:max-w-screen-xl" >
                    <div className="rounded">
                        <video className="rounded-lg" width="100%" controls>
                            <source src={video?.videoFile} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <section className=" p-6 bg-white   rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex justify-between items-center">
                            <span>
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{video.views} views</h5>
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{video.title}</h5>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{video.videoDescription}</p>
                            </span>
                            <span className="flex gap-4">
                                <span className="flex gap-2">
                                    <img className="w-12 h-12 rounded-full object-cover" src={video?.owner[0]?.avatar || ""} alt={video.owner[0]?.fullName || ""} />
                                    <span>
                                        <h4>{video?.owner?.[0]?.fullName}</h4>
                                        <h4>{userSubs?.subscribers || "0"} Subscribers</h4>
                                    </span>
                                </span>

                                {userSubs.isSubscribed ?
                                    <a href="#" onClick={() => subscribeChannel(video?.owner?.[0]?._id)} className={`inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800`}>
                                        Subscribed
                                    </a> :
                                    <a href="#" onClick={() => subscribeChannel(video?.owner?.[0]?._id)} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Subscribe
                                    </a>
                                }
                            </span>
                        </div>
                    </section>

                    <section className="py-24 relative">
                        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
                            <div className="w-full flex-col justify-start items-start lg:gap-10 gap-6 inline-flex">
                                <h2 className="text-gray-900 text-3xl font-bold font-manrope leading-normal">{userComment.length} Comments</h2>
                                <div className="w-full flex-col justify-start items-start lg:gap-9 gap-6 flex">
                                    <div className="w-full relative flex justify-between gap-2">
                                        <input type="text"
                                            className="w-full py-3 px-5 rounded-lg border border-gray-300 bg-white shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed"
                                            placeholder="Write comments here...."
                                            onChange={(e) => setNewComment(e.target.value)}
                                            value={newComment}
                                        />
                                        <button onClick={() => { commentOnVideo(video._id) }} className="absolute right-6 top-[18px]">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                                fill="none">
                                                <path
                                                    d="M11.3011 8.69906L8.17808 11.8221M8.62402 12.5909L8.79264 12.8821C10.3882 15.638 11.1859 17.016 12.2575 16.9068C13.3291 16.7977 13.8326 15.2871 14.8397 12.2661L16.2842 7.93238C17.2041 5.17273 17.6641 3.79291 16.9357 3.06455C16.2073 2.33619 14.8275 2.79613 12.0679 3.71601L7.73416 5.16058C4.71311 6.16759 3.20259 6.6711 3.09342 7.7427C2.98425 8.81431 4.36221 9.61207 7.11813 11.2076L7.40938 11.3762C7.79182 11.5976 7.98303 11.7083 8.13747 11.8628C8.29191 12.0172 8.40261 12.2084 8.62402 12.5909Z"
                                                    stroke="#111827" strokeWidth="1.6" strokeLinecap="round" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="w-full flex-col justify-start items-start gap-8 flex">

                                        {userComment.map((commentItem, index) => (
                                            < div key={index} className="w-full flex-col justify-start items-end gap-5 flex" >
                                                <div
                                                    className="w-full p-6 bg-white rounded-2xl border border-gray-200 flex-col justify-start items-start gap-8 flex">

                                                    <div className="w-full flex-col justify-center items-start gap-3.5 flex">
                                                        <div className="w-full justify-between items-center inline-flex">
                                                            <div className="justify-start items-center gap-2.5 flex">
                                                                <div
                                                                    className="w-10 h-10 bg-gray-300  rounded-full justify-start items-start gap-2.5 flex">
                                                                    <img className="rounded-full w-10 h-10 object-cover " src={commentItem.avatar}
                                                                        alt={commentItem.ownerName} />
                                                                </div>
                                                                <div className="flex-col justify-start items-start gap-1 inline-flex">
                                                                    <h5 className="text-gray-900 text-sm font-semibold leading-snug"> {commentItem.ownerName}</h5>
                                                                    <h6 className="text-gray-500 text-xs font-normal leading-5">At : {new Date(commentItem.updatedAt).toLocaleString()}</h6>
                                                                </div>
                                                            </div>


                                                            {commentItem.userId !== user._id && user._id !== video.owner[0]._id ?
                                                                ""
                                                                :
                                                                <div className="w-6 h-6 relative">
                                                                    <div className="w-full h-fit flex">
                                                                        <div className="relative w-full">
                                                                            <div className=" absolute left-0 top-0 py-2.5 px-4 text-gray-300"></div>
                                                                            <button id="dropdown-button" data-target="dropdown-1"
                                                                                className="w-full justify-center dropdown-toggle flex-shrink-0 z-10 flex items-center text-base font-medium text-center text-gray-900 bg-transparent  absolute right-0 top-0"
                                                                                type="button"
                                                                                onClick={() => toggleDropdown(commentItem._id)}
                                                                            >
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                                                    viewBox="0 0 24 24" fill="none">
                                                                                    <path
                                                                                        d="M12.0161 16.9893V17.0393M12.0161 11.9756V12.0256M12.0161 6.96191V7.01191"
                                                                                        stroke="black" strokeWidth="2.5"
                                                                                        strokeLinecap="round" />
                                                                                </svg>
                                                                            </button>

                                                                            {activeDropdownIndex === commentItem._id && (
                                                                                <div id="dropdown-1"
                                                                                    className="absolute top-8 right-0 z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 open ">
                                                                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                                                                        aria-labelledby="dropdown-button">
                                                                                        {commentItem.userId === user._id ?
                                                                                            <li>
                                                                                                <span
                                                                                                    onClick={() => { toggleIsVisibleUpdateIndividualComment(commentItem._id), setActiveDropdownIndex(null) }}
                                                                                                    className="block hover:cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</span>
                                                                                            </li>
                                                                                            : ""
                                                                                        }

                                                                                        {(user._id === video.owner[0]._id) || (commentItem.userId === user._id) ?
                                                                                            <li>
                                                                                                <span
                                                                                                    onClick={() => deleteIndividualComment(commentItem._id)}
                                                                                                    className="block hover:cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</span>
                                                                                            </li>
                                                                                            : ''
                                                                                        }

                                                                                    </ul>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            }

                                                        </div>

                                                        {updateIndividualComment === commentItem._id ?
                                                            <div className="w-full relative flex justify-between gap-2">
                                                                <input type="text"
                                                                    className="w-full py-3 px-5 rounded-lg border border-gray-300 bg-white shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed"
                                                                    placeholder="Update comment here...."
                                                                    value={updateComment}
                                                                    autoFocus={true}
                                                                    onChange={(e) => setUpdateComment(e.target.value)}
                                                                />
                                                                <div className="flex gap-3">
                                                                    <button onClick={() => { commentUpdate(video._id, commentItem._id) }} className=" ">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                                                            fill="none">
                                                                            <path
                                                                                d="M11.3011 8.69906L8.17808 11.8221M8.62402 12.5909L8.79264 12.8821C10.3882 15.638 11.1859 17.016 12.2575 16.9068C13.3291 16.7977 13.8326 15.2871 14.8397 12.2661L16.2842 7.93238C17.2041 5.17273 17.6641 3.79291 16.9357 3.06455C16.2073 2.33619 14.8275 2.79613 12.0679 3.71601L7.73416 5.16058C4.71311 6.16759 3.20259 6.6711 3.09342 7.7427C2.98425 8.81431 4.36221 9.61207 7.11813 11.2076L7.40938 11.3762C7.79182 11.5976 7.98303 11.7083 8.13747 11.8628C8.29191 12.0172 8.40261 12.2084 8.62402 12.5909Z"
                                                                                stroke="#111827" strokeWidth="1.6" strokeLinecap="round" />
                                                                        </svg>
                                                                    </button>
                                                                    <button type="button" className=" " onClick={() => { setUpdateIndividualComment(false) }} data-modal-hide="popup-modal">
                                                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                                        </svg>
                                                                        <span className="sr-only">Close modal</span>
                                                                    </button>
                                                                </div>
                                                            </div> :
                                                            <p className="text-gray-800 text-sm font-normal leading-snug">{commentItem.comment}</p>
                                                        }

                                                    </div>
                                                </div>
                                            </div>)
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <Pagination totalNumberPages={totalNumberPages} currentPage={currentPage} currentLimit={currentLimit} onpageChange={handlePageChange} />
                        </div>
                    </section>
                </div >
            </section >
        </main>
    )
}

export default VideoPlay;
