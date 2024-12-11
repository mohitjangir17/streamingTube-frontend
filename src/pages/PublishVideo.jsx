import { useContext, useEffect, useState } from "react";
import Loader from "../components/Loader";
import Sidebar from "../components/SideBar";
import Cookies from "js-cookie";
import axios from "axios";
import { AuthContext } from "../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";

function PublishVideo() {
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);
    const { user } = useContext(AuthContext)
    const [formData, setFormData] = useState({
        title: "",
        videoDescription: "",
        videoFile: null,
        videoThumbnail: null,
    });
    const [isLoading, setIsLoading] = useState(true)
    const [registerError, setRegisterError] = useState(null)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, type, value, files } = e.target;

        if (type === 'file') {
            // For file inputs (avatar or cover image)
            setFormData({
                ...formData,
                [name]: files[0],  // Store the selected file
            });
        } else {
            // For text inputs
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)

        const formToSend = new FormData();
        formToSend.append('title', formData.title);
        formToSend.append('videoDescription', formData.videoDescription);
        formToSend.append('videoFile', formData.videoFile);
        formToSend.append('videoThumbnail', formData.videoThumbnail);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/videos/publish-video`, formData, {
                headers: {
                    Authorization: `${Cookies.get('authToken')}`,
                    'Content-Type': 'multipart/form-data', // Automatically handled, but this is for clarity
                },
            })
            // console.log(response.data)
            setIsLoading(false)
            setRegisterError(response.data.message)
            setFormData(prevState => ({
                ...prevState,
                title: '',
                videoDescription: ''
            }))
            if (response.data.success == true) {
                setTimeout(() => {
                    navigate(`/${user._id}/my-videos`)
                }, 2000)
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false)
            setRegisterError(error.response.data.message)
        }
    };

    return (
        <>
            {!registerError ? (
                ""
            ) : (
                <div
                    role="alert"
                    className="mb-4 absolute flex w-full p-3 text-sm text-white bg-orange-600 rounded-md"
                >
                    {registerError}
                    <button
                        className="flex items-center justify-center transition-all w-8 h-8 rounded-md text-white hover:bg-white/10 active:bg-white/10 absolute top-1.5 right-1.5"
                        type="button"
                        onClick={() => {
                            setRegisterError("");
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
                        <h2 className="text-2xl text-white font-bold mb-2">Publish Video</h2>
                    </span>
                    <hr className="border-gray-700 mb-4" />
                    <div className="flex flex-col items-center   md:h-screen lg:py-0">
                        {/* <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                            <img className="w-8 h-8 mr-2" src="" alt="logo" />
                            Stream Tube
                        </a> */}
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Publish a Video
                                </h1>
                                <form className="space-y-4 md:space-y-6" method="post" action="#" onSubmit={handleSubmit} >
                                    <div>
                                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Video Title</label>
                                        <input type="text" name="title" id="title" onChange={handleChange} value={formData.title} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title of the video" required="" />
                                    </div>
                                    <div>
                                        <label htmlFor="videoDescription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Video description</label>
                                        <input type="text" name="videoDescription" id="videoDescription" onChange={handleChange} value={formData.videoDescription} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Description of the video" required="" />
                                    </div>
                                    <div>
                                        <label htmlFor="videoThumbnail" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Video Thumbnail</label>
                                        <input type="file" name="videoThumbnail" id="videoThumbnail" accept="image/*" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required="" />
                                    </div>
                                    <div>
                                        <label htmlFor="videoFile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Video File</label>
                                        <input type="file" name="videoFile" id="videoFile" accept="video/*" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    </div>
                                    <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Publish Video</button>
                                    {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Already have an account? <a href="/login" className="font-medium  text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                                    </p> */}
                                </form>
                            </div>
                        </div>
                    </div>
                </div >
            }
        </>
    )
}

export default PublishVideo;